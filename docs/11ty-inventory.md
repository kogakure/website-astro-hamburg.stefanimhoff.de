# Current 11ty Site Inventory

This is the migration baseline for SI-21/SI-22. Counts and behavior below were verified against the pre-migration repository.

## Stack and build

- Eleventy 1.0.1 renders Nunjucks, Markdown, and 11ty.js from `src/` to `dist/`.
- Gulp 4 builds JavaScript with Browserify/Babel and CSS with PostCSS; production also writes critical CSS for inline inclusion.
- Markdown-it enables raw HTML, footnotes, external-link classes, subscript, and superscript. Only raw HTML, footnotes, and external-link behavior are visibly required by current content.
- Production enables lazy-images, HTML/CSS minification, and Workbox service-worker generation. The service worker precaches WOFF2 files and runtime-caches up to 50 images for one year.
- `pnpm start` cleans and runs asset/Eleventy watchers; `pnpm run build` cleans, builds assets and HTML, then generates `dist/sw.js`.
- The `publish` script calls a missing `deploy` script and is broken.
- Docker builds with Node 22 Alpine and serves `dist/` from Nginx. Current Nginx uses `/index.html` as a catch-all, so unknown paths do not produce a true 404 response.
- No automated test suite or CI workflow exists. ESLint targets scripts and Stylelint targets styles.

## Content and shared logic

- `src/districts/` contains 20 English Markdown entries. Filename is the public slug; collection tag/layout come from directory data.
- Frontmatter fields are `title`, `author`, `date`, `distance`, and YAML time-like `duration` values written as `H:MM`.
- Verified totals: 20 districts, 280 km, and 3,884 minutes (displayed as 65 rounded hours).
- District bodies contain 837 Markdown image references, 20 Google My Maps shortcodes, and two YouTube shortcodes. The asset tree contains 917 image files in total.
- Every district has a hero at `/assets/images/hero/hamburg-{title-slug}.jpg`, a thumbnail at `/assets/images/districts/thumbnails/hamburg-{title-slug}-450px.jpg`, and one map embed.
- District cards and previous/next navigation sort by title. Filters provide title sorting and Moment-based display/ISO dates.
- Shortcodes provide email de-obfuscation, Google My Maps iframes, and YouTube iframes. Raw anchor IDs in Markdown and the order of prose/media are public content behavior.
- Global data defines `Exploring Hamburg`, “Street by Street, District by District,” the production origin, author, Twitter handle, animation attributes, and production mode.

## Public route and output matrix

| Output | Current source/behavior | Migration requirement |
| --- | --- | --- |
| `/` | Homepage introduction, aggregate statistics, map image, and alphabetical district list | Preserve purpose and totals; redesign as the route overview |
| `/hamburg-{district}/` | 20 district Markdown pages using the district layout | Preserve every URL, copy, anchors, dates, and media sequence |
| `/imprint/` | English legal/contact page, excluded from sitemap, `noindex,follow` | Preserve URL, legal copy, email behavior, and robots intent |
| `/404.html` | Narrow Markdown page, excluded from sitemap, `noindex,follow` | Preserve URL/content intent and make unknown Nginx routes return 404 |
| `/index.xml` | Atom feed with full rendered district HTML and absolute URLs | Preserve URL, entries, dates, media/embed fallbacks, and absolute URLs |
| `/sitemap.xml` | Hand-built Eleventy URL set | Astro may generate `/sitemap-index.xml`; keep `/sitemap.xml` as a permanent compatibility redirect |
| `/robots.txt` | Allows all and advertises `/sitemap.xml` | Preserve discoverability and point to the compatible sitemap URL |
| `/humans.txt` | English team/colophon output | Preserve URL and update the stack description |
| `/manifest.webmanifest` | Standalone manifest with 192/512 icons | Preserve URL and PWA metadata |
| `/sw.js` | Workbox-generated production service worker | Preserve offline/cache behavior and serve without caching the worker itself |
| `/favicon.ico` | Static passthrough | Preserve byte asset and URL |
| `/googleeac4fc886a6f9f8d.html` | Static Google verification file | Preserve byte asset and URL |
| `/.well-known/keybase.txt` | Static Keybase verification file | Preserve byte asset and URL |

District slugs, all trailing-slash routes:

`hamburg-altstadt`, `hamburg-barmbek-nord`, `hamburg-barmbek-sued`, `hamburg-borgfelde`, `hamburg-dulsberg`, `hamburg-eilbek`, `hamburg-farmsen-berne`, `hamburg-hafencity`, `hamburg-hamm`, `hamburg-hammerbrook`, `hamburg-hohenfelde`, `hamburg-marienthal`, `hamburg-neustadt`, `hamburg-rothenburgsort`, `hamburg-rotherbaum`, `hamburg-st-georg`, `hamburg-st-pauli`, `hamburg-tonndorf`, `hamburg-uhlenhorst`, `hamburg-wandsbek`.

## Assets, presentation, and runtime behavior

- Four local Secuela variable font files (regular/italic WOFF and WOFF2) and all images are copied verbatim under `/assets/`.
- The current palette is neutral light/dark with blue links. Theme preference is initialized inline before render, follows system preference, persists to localStorage, and responds to system changes.
- Runtime JavaScript adds SAL scroll reveals, theme toggle, scroll-direction state, smooth back-to-top, spoilers, email de-obfuscation, and a console source message.
- Production alone loads Umami from `umami.kogakure.cloud` with website ID `5be9515f-dab7-45c2-8bdb-e1c2bbfbacd6` and registers the service worker.
- Current metadata emits an empty homepage description because it references a missing `site.tagline`, and emits `article` Open Graph type globally. Card thumbnails use `alt="#"`, and some control markup is nested invalidly.
- Sitemap URL construction is suspect (`meta.url` is undefined), while Nginx's catch-all masks 404s. These are defects to correct rather than preserve.

## Migration boundaries

Preserve English prose, image paths, image/media order, district URLs, feeds, verification outputs, theme choice, analytics, and useful offline behavior. Replace Eleventy, Nunjucks, Gulp, Browserify/Babel, Moment, SAL, critical-CSS generation, and Workbox CLI with the approved Astro stack. React, Pagefind/search, image conversion, a hosting-provider migration, and broader editorial rewriting are out of scope.
