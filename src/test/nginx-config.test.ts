import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const config = readFileSync(resolve(import.meta.dirname, '../../nginx.conf'), 'utf8');

describe('Nginx delivery contract', () => {
	it('serves the web manifest with its registered media type', () => {
		expect(config).toMatch(
			/location = \/manifest\.webmanifest\s*\{[\s\S]*application\/manifest\+json webmanifest;/,
		);
	});

	it('caches only Astro content-addressed assets immutably', () => {
		const generatedLocation = config.match(/location \^~ \/_astro\/[\s\S]*?\n\t\}/)?.[0];
		expect(generatedLocation).toContain(
			'add_header Cache-Control "public, max-age=31536000, immutable" always;',
		);
		expect(config).toMatch(
			/location ~ \^\/workbox-\[0-9a-f\]\+\\\.js\$[\s\S]*?Cache-Control "public, max-age=31536000, immutable"/,
		);
	});

	it('keeps unversioned public assets bounded and revalidating without dropping headers', () => {
		const assetLocation = config.match(/location ~\* \\.\(\?:avif[\s\S]*?\n\t\}/)?.[0];
		expect(assetLocation).toContain(
			'add_header Cache-Control "public, max-age=86400, must-revalidate" always;',
		);
		expect(assetLocation).not.toContain('immutable');
		for (const header of [
			'X-Frame-Options "DENY"',
			'X-Content-Type-Options "nosniff"',
			'Referrer-Policy "strict-origin-when-cross-origin"',
			'Permissions-Policy "camera=(), geolocation=(), microphone=()"',
		]) {
			expect(assetLocation).toContain(`add_header ${header} always;`);
		}
	});

	it('keeps the sitemap redirect relative and permanent', () => {
		expect(config).toContain('absolute_redirect off;');
		expect(config).toMatch(
			/location = \/sitemap\.xml\s*\{\s*return 301 \/sitemap-index\.xml;\s*\}/,
		);
	});
});
