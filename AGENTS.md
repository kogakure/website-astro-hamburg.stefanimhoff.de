# AGENTS.md

This file provides guidance to agents working in this repository.

## Commands

```sh
pnpm install --frozen-lockfile # install the locked dependency graph
pnpm start                    # Astro development server
pnpm run build                # production static build into dist/
pnpm run preview              # serve the production build locally
pnpm run check                # Astro and TypeScript checks
pnpm run lint                 # ESLint, including Astro and Prettier rules
pnpm run format:check         # verify formatting without rewriting files
pnpm test                     # Vitest unit and content-parity tests
pnpm run test:e2e             # Playwright against the production preview
```

Playwright needs Chromium installed once:

```sh
pnpm exec playwright install chromium
```

## Architecture

**Stack**: Astro 7 static output, TypeScript, MDX content collections, Tailwind CSS 4,
Vitest, Playwright, an Astro-generated web manifest, sitemap, and service worker.

- `astro.config.mjs` configures static directory output, trailing slashes, MDX,
  sitemap filtering, the manifest, Tailwind, and Workbox-backed offline behavior.
- `src/content.config.ts` defines the typed `districts` collection.
- District content lives in `src/content/districts/*.mdx`; preserve authored prose,
  media order, public asset URLs, anchor IDs, and embed IDs.
- `src/pages/[slug].astro` generates the 20 district routes. Other pages and
  machine-readable endpoints live in `src/pages/`.
- `src/layouts/BaseLayout.astro` owns metadata and the shared document shell.
  Reusable UI is in `src/components/`, shared behavior in `src/lib/`, and site
  metadata in `src/data/site.ts`.
- `src/styles/global.css` contains global design tokens and base styles. Component
  and page styles remain scoped in their Astro files.
- Passthrough fonts, images, favicons, and verification files live in `public/`.

## Quality and deployment

- Unit tests are colocated as `src/**/*.test.ts`; content parity is asserted in
  `src/test/content-parity.test.ts`.
- Browser coverage lives in `tests/e2e/` and runs against `pnpm preview`, so run
  `pnpm build` first when invoking Playwright outside its configured web server.
- Production deployment uses the multistage `Dockerfile` and `nginx.conf`.
  Nginx owns the custom 404 response, security headers, service-worker cache policy,
  and the legacy `/sitemap.xml` redirect.
- Keep `docs/11ty-inventory.md` as the historical migration parity record; it is
  not active build documentation.
