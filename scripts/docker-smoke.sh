#!/bin/sh
set -eu

run_id=${GITHUB_RUN_ID:-local}
container="hamburg-astro-smoke-${run_id}-$$"
image="hamburg-astro-smoke:${run_id}-$$"
tmpdir=$(mktemp -d)

cleanup() {
	docker rm --force "$container" >/dev/null 2>&1 || true
	docker image rm --force "$image" >/dev/null 2>&1 || true
	rm -rf "$tmpdir"
}
trap cleanup EXIT HUP INT TERM

fail() {
	echo "Docker smoke test failed: $*" >&2
	exit 1
}

request() {
	path=$1
	curl --silent --show-error --output "$tmpdir/body" --dump-header "$tmpdir/headers" \
		--write-out '%{http_code}' "$base_url$path"
}

assert_status() {
	path=$1
	expected=$2
	actual=$(request "$path")
	[ "$actual" = "$expected" ] || fail "$path returned $actual, expected $expected"
	for header in X-Frame-Options X-Content-Type-Options Referrer-Policy Permissions-Policy; do
		grep -iq "^${header}:" "$tmpdir/headers" || fail "$path omitted $header"
	done
}

docker build --tag "$image" .
docker run --detach --name "$container" --publish 127.0.0.1::80 "$image" >/dev/null

attempt=0
while [ "$attempt" -lt 40 ]; do
	status=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$container")
	[ "$status" = healthy ] && break
	attempt=$((attempt + 1))
	sleep 1
done
[ "${status:-}" = healthy ] || fail "container did not become healthy"

published=$(docker port "$container" 80/tcp | sed -n '1p')
base_url="http://$published"

assert_status / 200
grep -q "navigator.serviceWorker.register('/sw.js')" "$tmpdir/body" || \
	fail "production HTML does not register /sw.js"

assert_status /missing-smoke-route 404
grep -q 'Error 404' "$tmpdir/body" || fail 'custom 404 body was not served'

assert_status /manifest.webmanifest 200
grep -iq '^Content-Type: application/manifest+json' "$tmpdir/headers" || \
	fail 'manifest has the wrong media type'
! grep -iq 'immutable' "$tmpdir/headers" || fail 'manifest was cached immutably'

assert_status /sitemap.xml 301
location=$(sed -n 's/^Location: \(.*\)\r$/\1/ip' "$tmpdir/headers")
[ "$location" = /sitemap-index.xml ] || fail "sitemap redirect was not relative: $location"

assert_status /sw.js 200
grep -iq '^Cache-Control:.*no-store' "$tmpdir/headers" || fail 'service worker is not no-store'

for path in /humans.txt /favicon.ico /googleeac4fc886a6f9f8d.html /.well-known/keybase.txt; do
	assert_status "$path" 200
done

hashed_file=$(find dist/_astro -type f 2>/dev/null | sed -n '1p')
if [ -z "$hashed_file" ]; then
	hashed_file=$(find dist -maxdepth 1 -type f -name 'workbox-*.js' | sed -n '1p')
fi
[ -n "$hashed_file" ] || fail 'build emitted no content-addressed generated asset'
assert_status "/${hashed_file#dist/}" 200
grep -iq '^Cache-Control:.*max-age=31536000.*immutable' "$tmpdir/headers" || \
	fail 'hashed Astro asset does not have immutable one-year caching'

assert_status /assets/images/core/homepage-hero-300.jpg 200
grep -iq '^Cache-Control:.*max-age=86400.*must-revalidate' "$tmpdir/headers" || \
	fail 'unversioned public image does not have bounded revalidating caching'
! grep -iq 'immutable' "$tmpdir/headers" || fail 'unversioned public image was cached immutably'

echo 'Docker/Nginx smoke checks passed.'
