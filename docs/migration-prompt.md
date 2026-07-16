# SI-21 Astro Migration Execution Brief

Migrate `hamburg.stefanimhoff.de` from Eleventy to a static Astro site and refresh its design. Use `docs/11ty-inventory.md` as the parity baseline, `PRODUCT.md` for product intent, and `DESIGN.md` for the approved “Elbe field journal” direction.

## Target architecture

- Use Astro 7, TypeScript, Tailwind CSS 4, MDX, typed Content Layer collections, Vitest, Playwright, axe, sitemap, feed generation, manifest/service-worker support, and static directory output with trailing slashes.
- When a sibling personal Astro site is configured and available, use its useful configuration and deployment patterns as an optional reference. Do not require a machine-specific path, copy its Japanese Ma visual language, or install React, Pagefind, search, or unrelated integrations.
- Pin Node 22.13.1 and pnpm 11.8.0. Retain the multistage Node/Nginx deployment contract.
- Define `districts` with `glob()` and Zod fields: `title`, `author` (default Stefan Imhoff), `date`, positive `distanceKm`, and positive integer `durationMinutes`.
- Convert legacy `H:MM` duration values mechanically. The result must still contain 20 entries totaling 280 km and 3,884 minutes (displayed as 65 hours).
- Render `/hamburg-…/` pages through `src/pages/[slug].astro` with `getCollection()`, `getStaticPaths()`, imported `render(entry)`, and `entry.id`. Use current Astro Content Layer APIs only—no collection `slug`, `entry.render()`, legacy `src/content/config.ts`, obsolete collection `type`, or deprecated Markdown integration options.
- Convert district files to MDX only to replace the 20 map and two YouTube Nunjucks shortcodes with accessible components. Preserve copy, raw anchor IDs, image paths, and media order verbatim.
- Keep images as passthrough assets at their existing `/assets/images/**` URLs. Eager-load only the hero; use intrinsic dimensions where practical and native lazy loading/async decoding elsewhere.

## Public behavior and component contracts

- Preserve `/`, all 20 district routes, `/imprint/`, `/404.html`, `/index.xml`, `/robots.txt`, `/humans.txt`, `/manifest.webmanifest`, `/sw.js`, `/favicon.ico`, the Google verification file, and `/.well-known/keybase.txt`.
- Generate Astro's sitemap and configure Nginx to redirect `/sitemap.xml` permanently to `/sitemap-index.xml`. Unknown routes must serve `/404.html` with an actual 404 status.
- Keep homepage district listing and district previous/next navigation alphabetical.
- Implement typed contracts for `DistrictCard` (title, route, thumbnail), `DistrictNavigation` (nullable previous/next), `MapEmbed` (My Maps ID and title), `YouTubeEmbed` (video ID and title), and `BaseLayout` (title, description, canonical path, OG type/image, robots flags).
- Preserve `/index.xml` as a full-content Atom feed with wire-format parity: Atom namespace and elements, entry dates, rendered content, and absolute content URLs must remain compatible. `@astrojs/rss` may support generation internally, but must not change the public document to RSS 2.0. Also preserve theme persistence/system preference and production-only Umami with the existing site ID.
- Generate the service worker at `/sw.js`, register that exact URL in production, and retain useful offline/image caching. Nginx must serve `/sw.js` with `max-age=0, no-cache, no-store, must-revalidate` so clients can discover updates immediately.
- Correct the known defects: empty homepage description, global `article` OG type, `alt="#"`, nested interactive controls, sitemap URL generation, broken publish script, and Nginx's homepage fallback.

## Design direction

Create an image-led “Elbe field journal”: observant, grounded, maritime; photographic, asymmetric, and cartographic without tourist clichés. Retain Secuela and establish chart paper, harbor ink, tide blue, fog gray, oxidized buoy red, and night-water roles in accessible OKLCH tokens. Use route lines, chart hairlines, coordinates, tide-like annotations, and walk stamps only where they communicate orientation or progress.

The homepage is a route overview with decisive Hamburg photography, a concise introduction, 280 km/65 hour totals, and all districts. District pages are photographic field notes with a strong masthead, walk metrics, comfortable long-form rhythm, accessible embeds, and clear journey navigation. Utility pages are quieter extensions of the same system.

Avoid nautical icons/costume, generic travel-blog cards, glassmorphism, oversized rounding, gradient text, decorative grids/stripes, faux hand-drawn SVGs, repeated eyebrow labels, and excessive motion. Motion is sparse, CSS-first, generally under 250ms, and disabled or simplified for `prefers-reduced-motion`.

## Ordered execution

1. Scaffold and validate the Astro/TypeScript/Tailwind/test baseline before moving content.
2. Add the typed collection, mechanically convert all content/embeds, build routes and machine-readable outputs, then prove parity before deleting legacy files.
3. Apply the Elbe field-journal system across homepage, district, imprint, 404, and the global shell.
4. Run Impeccable `critique`, `adapt`, `typeset`, and `polish`, followed by the installed deterministic detector: `node .agents/skills/impeccable/scripts/detect.mjs --json src`.
5. Add CI and validate the production build and Docker/Nginx image; only then remove obsolete Eleventy and asset-pipeline code.

## Acceptance criteria

- Automated parity checks cover all public outputs and 20 slugs, metadata parsing, alphabetical navigation, 837 content image references, 20 map IDs, two YouTube IDs, totals, feed XML, and sitemap XML.
- Unit tests cover duration/date/title helpers, totals, URL generation, feed absolute URLs, and external-link classification.
- Axe covers the base layout, district index, theme toggle, navigation, embeds, and pagination. There are no critical findings; keyboard navigation, skip link, visible focus, reduced motion, and theme persistence work.
- Playwright verifies homepage totals/list, representative first/middle/last district navigation, every district's canonical/media response, utility and unknown routes, feed/robots/manifest/sitemap, and verification files. It also asserts that production registers `/sw.js`, the worker URL returns successfully, and Nginx applies the required no-cache header.
- Review light and dark screenshots for homepage, district, imprint, and 404 at 375px, 768px, and 1440px. There are no broken assets/embeds or horizontal overflow.
- `pnpm astro check`, lint/format checks, unit tests, Playwright, `pnpm build`, Impeccable detection, and Docker smoke tests all pass.

Do not rewrite prose, captions, or district alt text as part of migration; do not change public image URLs; do not add SSR, React, search, or a hosting migration.
