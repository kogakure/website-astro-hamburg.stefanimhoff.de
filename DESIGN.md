---
name: Exploring Hamburg
description: Kiez Neon. A wall of tube signs for a first-person photographic atlas of Hamburg; walking a district switches its tube on.
colors:
    wall: 'oklch(95.5% 0.005 275)'
    wall-raised: 'oklch(92% 0.007 275)'
    ink: 'oklch(20% 0.02 275)'
    muted: 'oklch(45% 0.02 275)'
    glass: 'oklch(80% 0.01 275)'
    unlit: 'oklch(56% 0.015 275)'
    focus: 'oklch(52% 0.22 25)'
    tube-red: 'oklch(52% 0.22 25)'
    tube-blue: 'oklch(48% 0.16 250)'
    tube-white: 'oklch(52% 0.14 62)'
    night-wall: 'oklch(13% 0.02 275)'
    night-wall-raised: 'oklch(17% 0.02 275)'
    night-ink: 'oklch(91% 0.01 275)'
    night-muted: 'oklch(72% 0.02 275)'
    night-glass: 'oklch(34% 0.015 275)'
    night-unlit: 'oklch(58% 0.015 275)'
    night-focus: 'oklch(93% 0.07 88)'
    night-tube-red: 'oklch(66% 0.25 22)'
    night-tube-blue: 'oklch(72% 0.16 245)'
    night-tube-white: 'oklch(93% 0.07 88)'
    manifest-wall: '#06070f'
typography:
    display:
        fontFamily: 'Tilt Neon, Arial Rounded MT Bold, Helvetica Rounded, sans-serif'
        fontSize: 'clamp(4.6rem, 11.5vw, 10.5rem)'
        fontWeight: 400
        lineHeight: 0.95
        letterSpacing: '0'
    headline:
        fontFamily: 'Tilt Neon, Arial Rounded MT Bold, Helvetica Rounded, sans-serif'
        fontSize: 'clamp(3.2rem, 11vw, 9rem)'
        fontWeight: 400
        lineHeight: 1
        letterSpacing: '0'
    sign-name:
        fontFamily: 'Tilt Neon, Arial Rounded MT Bold, Helvetica Rounded, sans-serif'
        fontSize: 'clamp(2.4rem, 7vw, 5.6rem)'
        fontWeight: 400
        lineHeight: 1.1
        letterSpacing: '0'
    motto:
        fontFamily: 'Tilt Neon, Arial Rounded MT Bold, Helvetica Rounded, sans-serif'
        fontSize: 'clamp(1.4rem, 3vw, 2.4rem)'
        fontWeight: 400
        lineHeight: 1.2
        letterSpacing: '0'
    meter:
        fontFamily: 'Tilt Neon, Arial Rounded MT Bold, Helvetica Rounded, sans-serif'
        fontSize: 'clamp(2.2rem, 4vw, 3.2rem)'
        fontWeight: 400
        lineHeight: 1
        fontFeature: 'tnum'
    title:
        fontFamily: 'Schibsted Grotesk, Helvetica Neue, Arial, sans-serif'
        fontSize: 'clamp(1.25rem, 2vw, 1.5rem)'
        fontWeight: 700
        lineHeight: 1.02
        letterSpacing: '-0.02em'
    wordmark:
        fontFamily: 'Schibsted Grotesk, Helvetica Neue, Arial, sans-serif'
        fontSize: '1.05rem'
        fontWeight: 750
        letterSpacing: '-0.01em'
    body:
        fontFamily: 'Schibsted Grotesk, Helvetica Neue, Arial, sans-serif'
        fontSize: 'clamp(1rem, 0.94rem + 0.22vw, 1.125rem)'
        fontWeight: 400
        lineHeight: 1.65
    reading:
        fontFamily: 'Schibsted Grotesk, Helvetica Neue, Arial, sans-serif'
        fontSize: 'clamp(1.05rem, 1.2vw, 1.18rem)'
        fontWeight: 400
        lineHeight: 1.75
    label:
        fontFamily: 'Schibsted Grotesk, Helvetica Neue, Arial, sans-serif'
        fontSize: '0.875rem'
        fontWeight: 500
        fontFeature: 'tnum'
    caption:
        fontFamily: 'Schibsted Grotesk, Helvetica Neue, Arial, sans-serif'
        fontSize: '0.8rem'
        fontWeight: 400
rounded:
    none: '0'
    tube: '1rem'
    round: '50%'
spacing:
    gutter: 'clamp(1.125rem, 4vw, 3rem)'
    touch: '2.75rem'
    header: '4.5rem'
    section: 'clamp(3rem, 7vw, 5.5rem)'
    shell: '92rem'
    content: '72rem'
    reading: '62ch'
components:
    tube-sign:
        textColor: '{colors.tube-red}'
        typography: '{typography.display}'
    tube-sign-night:
        textColor: '{colors.night-tube-red}'
        typography: '{typography.display}'
    district-card:
        textColor: '{colors.unlit}'
        typography: '{typography.sign-name}'
        rounded: '{rounded.none}'
        padding: '0.35rem 0'
    district-card-lit:
        textColor: '{colors.tube-red}'
        typography: '{typography.sign-name}'
    district-card-lit-night:
        textColor: '{colors.night-tube-red}'
        typography: '{typography.sign-name}'
    meter:
        textColor: '{colors.tube-blue}'
        typography: '{typography.meter}'
        padding: '0.6rem 0'
    district-nav-link:
        textColor: '{colors.unlit}'
        height: '4.5rem'
    district-nav-link-lit:
        textColor: '{colors.tube-white}'
    masthead:
        textColor: '{colors.ink}'
        typography: '{typography.headline}'
        backgroundColor: '{colors.wall}'
    theme-toggle:
        backgroundColor: 'transparent'
        textColor: '{colors.ink}'
        rounded: '{rounded.round}'
        size: '2.75rem'
    theme-toggle-hover:
        textColor: '{colors.tube-white}'
    embed:
        backgroundColor: '{colors.wall-raised}'
        rounded: '{rounded.none}'
    site-header:
        textColor: '{colors.ink}'
        typography: '{typography.wordmark}'
        height: '4.5rem'
    skip-link:
        backgroundColor: '{colors.ink}'
        textColor: '{colors.wall}'
        padding: '0.75rem 1rem'
        height: '2.75rem'
---

# Design System: Exploring Hamburg

## Overview

**Creative North Star: "Kiez Neon"**

St. Pauli sign-shop neon on a wall. The archive is a wall of tube signs: every walked district is a name in bent glass, and pointing at it switches the gas on. The 89 districts not yet walked stand as dark, empty tubes, so the record visibly accumulates. Photographs carry the atmosphere; the signage carries orientation. Reading happens in a plain grotesk on the bare wall, never on top of a photograph.

The system has two states of one object. Day (light theme) is the sign by daylight: tubes off, full-chroma coloured glass on a pale blue-grey wall, no glow, nothing moves. Night (dark theme) is the same sign switched on: a near-black blue wall, each tube a pale core inside a two-layer halo. Both themes are first-class and both must pass axe.

Density is low and vertical: huge stacked names, hairline rules, generous section spacing. There are no cards, no rounded panels, and no glassmorphism. The one photograph above the fold is the harbour behind the homepage sign, veiled and fading into the wall before any small text. Depth comes from light (glow) and the photographs themselves, not from surfaces.

**Key Characteristics:**

- Exactly three tube gases: red, argon blue, warm white.
- Tilt Neon only for lettering that is a sign; Schibsted Grotesk for reading and data.
- Unlit is a real state: names sit as dim glass until pointed at, focused, or (on touch) crossing the screen centre.
- Thin glass hairlines (1px) structure everything; corners are square.
- Small text never sits on a photograph.

## Colors

A cool blue-grey wall with three gas colours; every neutral sits on hue 275, every accent is a tube.

### Primary

- **Kiez Red** (tube-red; night-tube-red): The house tube. The homepage "Exploring Hamburg" sign, the 404 sign, every third district name, imprint list markers, link hover on legal pages, text selection, wordmark hover. By day it doubles as the focus ring colour.

### Secondary

- **Argon Blue** (tube-blue; night-tube-blue): Data in light. The three homepage meter numerals (km, hours, walks) and every third district name.

### Tertiary

- **Warm White** (tube-white; night-tube-white): The motto, the imprint heading, the previous/next district signs, emphasised prose (italics) in walks, theme-toggle hover. By day the "white" tube is amber glass (hue 62); at night it is the warm cream core (hue 88) and also the focus ring.

### Neutral

- **Wall** (wall; night-wall): Page background in each theme. The manifest and browser chrome use the night wall in sRGB (manifest-wall).
- **Raised Wall** (wall-raised; night-wall-raised): Placeholder fill behind loading photographs and embeds. Not a panel colour.
- **Ink** (ink; night-ink): Primary text, wordmark, meter values outside the tube, footer title.
- **Muted** (muted; night-muted): Labels, captions, breadcrumbs, route-log terms, footer, hints.
- **Glass** (glass; night-glass): The hairline. Section rules, meter rows, footer top rule, embed frames, toggle ring, scrollbar thumb. District rows use it at 60% mix.
- **Unlit** (unlit; night-unlit): Dead glass. Unlit district names and nav signs (computed per tube as its own hue at the unlit lightness and chroma 0.03), the 89 dark tube pills, the burnt-out 404 digit.

### Named Rules

**The Three Gases Rule.** There are exactly three tube colours: red, blue, warm white. Never add a fourth tube colour, a gradient tube, or a tint outside them. New signs choose one of the three via the tube variable.

**The Glass By Day, Gas By Night Rule.** By day a lit tube shows its glass colour flat, with no shadow. At night a lit tube's letters are lifted (lightness +0.2, chroma halved) and wrapped in the glow. Never add glow in the day theme.

**The Rotation Rule.** District names cycle red, blue, white in alphabetical order (index mod 3); a district page's heading uses its walk's position in the same cycle, so a district keeps one colour across the atlas, the photo window, and its own page.

## Typography

**Display Font:** Tilt Neon (with Arial Rounded MT Bold, Helvetica Rounded, sans-serif)
**Body Font:** Schibsted Grotesk variable, 400 to 900, roman and italic (with Helvetica Neue, Arial, sans-serif)

**Character:** Tilt Neon is a single-stroke rounded face that reads as bent tubing; it is only ever the lettering of a sign. Schibsted Grotesk is a sturdy newspaper grotesk for reading and numbers, so the signs stay special.

### Hierarchy

- **Display** (Tilt Neon 400, clamp(4.6rem, 11.5vw, 10.5rem), 0.95): The homepage sign only. Words wrap as stacked slabs with a 0.26em gap.
- **Headline** (Tilt Neon 400, clamp(3.2rem, 11vw, 9rem), 1): District page names. Long names step down to clamp(2.9rem, 9vw, 7.5rem) and extra-long to clamp(2.6rem, 7.5vw, 6.5rem); hyphenation manual, no forced breaks. Imprint and 404 signs use clamp(3.5rem, 10 to 13vw, 6 to 8.5rem).
- **Sign Name** (Tilt Neon 400, clamp(2.4rem, 7vw, 5.6rem), 1.1): Atlas district names; clamp(2rem, 9vw, 3.4rem) on touch and narrow screens. Prev/next signs use clamp(1.8rem, 4.5vw, 3.4rem).
- **Motto** (Tilt Neon 400, clamp(1.4rem, 3vw, 2.4rem), 1.2): "Street by Street, District by District." in warm white; also the atlas window caption at clamp(1.6rem, 2.6vw, 2.4rem).
- **Meter** (Tilt Neon 400, clamp(2.2rem, 4vw, 3.2rem), 1, tabular numerals): Lit statistic numerals.
- **Title** (Schibsted 700, clamp(1.25rem, 2vw, 1.5rem), 1.02, -0.02em): Section headings in grotesk. All h1 to h3 share 700, 1.02, -0.02em and balanced wrapping unless they are a tube.
- **Body** (Schibsted 400, clamp(1rem, 0.94rem + 0.22vw, 1.125rem), 1.65): Interface and intro prose; intro capped at 54ch.
- **Reading** (Schibsted 400, clamp(1.05rem, 1.2vw, 1.18rem), 1.75): Walk prose, capped at 62ch inside a 72rem column. Imprint uses 1.72, and at night 1.78 with 0.01em tracking to offset halation.
- **Label** (Schibsted 500, 0.875rem, tabular numerals): Route-log terms, district log lines, walk position, breadcrumbs, captions. Secondary text is 0.9rem; caption is 0.8rem (header tagline only).

### Named Rules

**The Lettering Is A Sign Rule.** Tilt Neon appears only on elements that are a tube (sign, district names, motto, meters, prev/next, window caption). Never set paragraphs, labels, or buttons in it, and never set a sign in Schibsted.

**The Tabular Record Rule.** Every number that belongs to the walk record (km, hours, minutes, counts, walk position) uses tabular numerals.

## Layout

A single centred shell (92rem) with a fluid gutter (clamp(1.125rem, 4vw, 3rem)). The header is a 4.5rem bar: wordmark left, theme toggle right. Sections are separated by full-shell 1px glass rules with clamp(3rem, 7vw, 5.5rem) of space above.

- **Homepage first viewport:** fills 100svh minus the header. A two-row grid: the sign spans full width, the motto beneath, then intro (1.4fr) and walk record (1fr) side by side, collapsing to one column at 56rem.
- **Homepage opening:** one viewport tall. The sign (bottom-aligned) sits on the full-bleed harbour photo (the red lightship), which runs up under the header and fades into the wall at the sign's foot. Intro and meters follow in a 1.4fr/1fr ledger on the bare wall. The historical map is no longer shown.
- **Atlas:** a 1.5fr/1fr grid on pointer screens of at least 56.0625rem: names on the left, a sticky photo window (top 2rem, 4:5) on the right. On touch or narrow screens the window disappears and each row carries its own 5.5rem 4:3 thumbnail.
- **District page:** a full-bleed masthead (min of 100svh minus 8.5rem and 60rem), then a 72rem content column with prose capped at 62ch and photographs at full column width with clamp(2rem, 5vw, 4rem) vertical margin. Embeds take clamp(3rem, 7vw, 6rem).
- **Touch targets:** every standalone link and control is at least 2.75rem tall; footnote references at least 1.5rem square.
- **Anchors:** targets and focused elements scroll with a 5rem top margin.

## Elevation & Depth

Flat surfaces; depth is light. There are no shadows in the day theme. At night, depth comes from tube glow and from a single soft drop beneath photographs that lifts them off the dark wall.

### Shadow Vocabulary

- **Tube glow** (`text-shadow: 0 0 0.04em var(--tube), 0 0 0.18em var(--tube), 0 0 0.6em oklch(from var(--tube) l c h / 0.55), 0 0 1.4em oklch(from var(--tube) l c h / 0.35)`): Every lit sign and lit district name at night.
- **Soft tube glow** (`text-shadow: 0 0 0.18em var(--tube), 0 0 0.6em oklch(from var(--tube) l c h / 0.5)`): Lit prev/next signs at night, with letters lifted only +0.05.
- **Window glow** (`box-shadow: 0 0 0 1px oklch(from var(--tube) l c h / 0.6), 0 0 3rem oklch(from var(--tube) l c h / 0.28), 0 30px 60px -30px oklch(0% 0 0 / 0.85)`): The atlas photo window at night, tinted by the lit tube.
- **Photo drop** (`box-shadow: 0 30px 60px -30px oklch(0% 0 0 / 0.85)`): Walk photographs at night.
- **Toggle halo** (`box-shadow: 0 0 0.9rem oklch(from var(--tube-white) l c h / 0.35)`): Theme toggle hover at night.

### Named Rules

**The Light Is The Only Lift Rule.** Never raise a surface with a panel shadow, blur, or backdrop filter. If something needs emphasis, it is lit.

## Shapes

Square corners everywhere: photographs, embeds, rows, rules. The only curves are physical ones: the theme toggle is a 2.75rem circle with a 1px glass ring, and each dark tube in the unwalked row is a 2.6rem by 0.55rem pill (1rem radius) with a 1.5px unlit stroke. Borders are 1px glass hairlines. The district masthead photo fades out downward through a mask gradient into the wall.

## Components

### District Atlas Row (district card)

A wall of names, not a card grid.

- **Structure:** a list row with a 60% glass hairline beneath; name left, log line (date, km, time in label type, muted, tabular) right; padding 0.35rem block (0.75rem on touch).
- **Rest:** name in unlit glass of its own tube hue.
- **Lit:** on hover, keyboard focus, or (touch) when the row crosses the screen centre, the name takes its tube colour; at night it gains the tube glow. Colour and glow switch with a 120ms two-step, so it snaps on like gas, not a fade. The log line turns ink.
- **Photo window:** on pointer screens, lighting a name decodes that district's photo into the sticky 4:5 window, updates its Tilt Neon caption in the same tube, and tints the window glow at night. The window is decorative (aria-hidden).
- **Unwalked tubes:** below the list, one empty pill per unwalked district under a muted "still dark" line.

### Tube Sign

- **Variants:** red (default), blue, white, set by one tube variable.
- **Day:** glass colour, no shadow. **Night:** lifted core plus tube glow.
- **Ignite:** sign headings (homepage, district, imprint, 404) stutter on once on arrival: a 1.3s stepped animation after 150ms that toggles only the glow (off, on at 14%, off at 19%, on at 32%, off at 36%, steady from 46%). Letters keep full colour and contrast throughout. By day there is no glow, so nothing moves. Reduced motion collapses it.
- **Burnt-out tube:** the 404 sign renders one digit in unlit glass with no glow.

### Meters

Three blue tube numerals (km, hours, walks out of districts) in a definition list; each row is a hairline-ruled flex row, term muted 500 on the left, numeral plus muted unit on the right. Calibrated scales are not yet built; rows are hairlines only.

### Masthead (district page)

The walk's hero photograph spans the viewport, darkened at night (brightness 0.5, saturate 0.9) and masked to fade at its lower half. The title block rises from a gradient into the wall (transparent to 88% wall at 10rem to solid wall), so only the large lit name overlaps the photo; breadcrumbs sit above on the wall, and walk position and route log (1.25rem 700 tabular values over muted terms) sit below on solid wall, closed by a glass rule.

### Navigation

- **Header:** wordmark (Schibsted 750) plus a muted caption tagline, theme toggle at right. Wordmark hover turns tube red. The tagline hides on the homepage (the sign repeats it) and under 34rem. Keyboard order is wordmark, toggle, first district.
- **Prev/next:** two columns (one under 34rem), each a 4.5rem-min link with a muted label over a warm-white Tilt Neon sign that rests unlit and lights on hover or focus with the soft tube glow.
- **Walk shortcuts:** a hairline-bordered (top and bottom) flex row of muted links that turn ink on hover.
- **Footer:** glass top rule, muted 0.9rem text, bold ink title, right-aligned meta links; single column under 35rem.
- **Theme toggle:** 2.75rem circle, transparent, glass ring, half-filled circle SVG that rotates 180 degrees at night; hover turns ring and icon warm white (plus halo at night); press scales to 0.96.

### Embeds

Maps and YouTube (no-cookie) iframes at full column width, 16:9, 1px glass frame, raised-wall placeholder; maps at least min(34rem, 72vh). Each carries a muted label caption linking to the external fallback at touch height. Hidden in print.

### Links

Inherit colour; underline at 45% currentColor, 0.075em thick, 0.2em offset, going solid on hover (160ms ease-out). External links in walk prose carry a small masked arrow drawn in currentColor.

## Do's and Don'ts

### Do:

- **Do** pick every accent from the three tubes and set it through the tube variable so day, night, glow, and unlit derive automatically.
- **Do** keep small text (labels, captions, body, meta) on the bare wall; only display-size tube lettering may overlap a photograph, and only behind a veil or masthead gradient. The header's wordmark and toggle sit over the strongest part of the homepage veil (85% wall by day, 80% at night).
- **Do** flicker only the glow (text-shadow) when a sign ignites, once, in steps; letters stay at full contrast.
- **Do** keep both themes legible and axe-clean; at night the focus ring is warm white, by day tube red (0.1875rem solid, 0.25rem offset).
- **Do** give every standalone link and control at least 2.75rem of height and honour reduced motion by collapsing animation and transition.
- **Do** separate sections and rows with 1px glass hairlines and keep corners square.
- **Do** use tabular numerals for every walk-record number.

### Don't:

- **Don't** add a fourth tube colour, a gradient tube, or a decorative accent outside red, argon blue, and warm white.
- **Don't** put small text over photographs, and don't replace the sticky atlas window with a full-screen photo flood.
- **Don't** animate text opacity or colour to fake flicker; no looping or repeating flicker.
- **Don't** add glow, shadow, or motion to the day theme.
- **Don't** use Tilt Neon for reading text, labels, or controls, or set a sign in the grotesk.
- **Don't** introduce cards, rounded panels, glassmorphism, backdrop blur, or an interchangeable card grid.
- **Don't** let the homepage harbour photo reach the intro or meters, or add navigation links to the header beyond wordmark and toggle.
- **Don't** add kickers or eyebrow labels above headings, glyph or emoji icons, or nautical costume (anchors, ship wheels, rope borders, faux-vintage decoration).
