---
version: 1
slug: 'src-pages-index-astro'
primary_target: 'src/pages/index.astro'
related_targets: ['src/pages/[slug].astro']
---

# Homepage and district pages

Scope: homepage (`src/pages/index.astro`) and district pages (`src/pages/[slug].astro`), with imprint and 404 inheriting the world. Visitor mode: Experience (homepage), Read inside the Experience world (district pages).

Audience and job: Hamburg residents, visitors and urban walkers choose a district and follow a street-level photo walk. Content, order, URLs, anchors and embeds stay exactly as they are; only the visual world is replaced. Reference prototype: `src/pages/prototypes/neon/` on branch `redesign-protos`.

## Direction contract

THESIS: St. Pauli sign-shop neon on a dark wall: the archive is a wall of tube signs, and walking a district switches its tube on. It refuses the category default of a hero photo above a card grid.

OWN-WORLD: Near-black blue wall (oklch 13% 0.02 275), unlit glass (oklch 34%), exactly three tubes: red (66% 0.25 22), argon blue (72% 0.16 245) and warm white (93% 0.07 88), each lit as a pale core plus a two-layer glow. Tilt Neon only for lit signage; Schibsted Grotesk for reading and data. Thin glass hairlines; no cards, no rounded panels.

STORY: The visitor sees the project's name ignite, learns that 20 of 109 districts are walked, points at district names to light them and preview their photos, then reads a walk in full colour on the dark wall and moves to the next sign.

FIRST VIEWPORT: The full-width red "Exploring Hamburg" sign at up to 10.5rem fills the upper two-thirds and stutters on once; the warm-white motto sits below; intro text on the lower left; three blue tube meters (km, hours, 20/109) on the lower right. "Walks" in the top bar jumps to the index.

FORM: Kiez Neon, my grounded list position 4 of 7 after a re-roll; seed key ac221fae. Raises: the record accumulates (coil tower): 89 dark tubes stand for unwalked districts; strict palette count (PC-98): three tube colours only; slab type structure (wood type): names set as large stacked slabs; calibrated meters (oscilloscope): stats in tabular numerals on hairline scales. Signature interaction: pointing at an unlit name lights it and floods the background with that district's photo; on touch, the name at the centre of the screen lights up.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisions recorded in the build

- Theme: the toggle stays. Day (light) is the sign by daylight: tubes off, full-chroma glass colour on a pale wall, no glow. Night (dark) is the same sign lit. Both must pass axe.
- Atlas: the full-screen hover flood became a sticky photo window beside the names on pointer screens (≥56rem); small text never sits on arbitrary photographs. The window takes the lit tube's glow at night.
- Ignite flickers only the glow, never text opacity.
- Header keeps wordmark + toggle only (keyboard order wordmark → toggle → first district is pinned by e2e); the homepage hides the header tagline because the sign repeats it.
- Imprint: white tube heading, red list markers. 404: "Error 404" sign with one burnt-out tube.
- User decision after review: the historical map is dropped; the harbour (lightship) photo sits behind the homepage sign, veiled, and fades into the wall before the intro and meters, which stay on the bare wall in the first viewport.

## Unresolved

- Calibrated scales on the meters (oscilloscope raise) are reduced to hairline rows for now.
