# Exploring Hamburg Design System

## Direction

“Elbe field journal”: a photographic, editorial, and cartographic record of walking Hamburg. The site should feel like chart paper used outdoors—precise, weather-aware, and marked by a real journey—without becoming a vintage travelogue or nautical costume.

## Color

Use a restrained light/dark system built from these roles:

- **Chart paper:** neutral, low-chroma light canvas; not beige or parchment.
- **Harbor ink:** near-black blue for primary type and strong structure.
- **Tide blue:** the main interactive and orientation color.
- **Fog gray:** subdued surfaces and secondary information, with accessible contrast.
- **Oxidized buoy red:** a scarce accent for route position or important emphasis.
- **Night water:** deep blue-black dark canvas with light, non-glowing text.

Define final tokens in OKLCH and verify WCAG contrast in both themes. Color should support photographs rather than tint them.

## Typography

Retain the local Secuela regular and italic variable fonts and use their axes for contrast instead of adding a generic font pairing. Headings are assured but never larger than `6rem`, with letter spacing no tighter than `-0.04em`. Body copy is relaxed, `65–75ch` at most, and uses balanced headings and pretty-wrapped prose.

## Layout and Motifs

- Photography is dominant: a decisive homepage image, generous district media, and no placeholder illustration.
- Use an asymmetric editorial rhythm with full-bleed moments, compact metadata, and clear reading columns.
- Chart-grid hairlines, route traces, coordinates, tide-style annotations, and stamped walk statistics may organize information when they convey location or progress.
- District browsing may use a responsive index, but avoid a uniform grid of generic floating cards.
- Borders are fine and purposeful; shadows, rounded containers, and decorative layers are exceptional.

## Core Surfaces

- **Homepage:** route overview, Hamburg photography, concise project introduction, aggregate record, and complete alphabetical district index.
- **District:** photographic masthead, title and walk metrics, comfortable long-form sequence, accessible map/video embeds, and obvious alphabetical previous/next navigation.
- **Imprint and 404:** quieter versions of the same typography, navigation, themes, and field-journal structure.
- **Global shell:** skip link, compact header/footer, early theme initialization, visible focus, and production-only analytics.

## Motion and Interaction

Motion is sparse, CSS-first, and usually under 250ms. Use it for state, orientation, or a single coordinated arrival—not repeated scroll reveals. All motion respects `prefers-reduced-motion`. Interactive elements must have distinct hover, active, and focus-visible states; never nest controls.

## Responsive and Accessibility Rules

Design and review at 375px, 768px, and 1440px. Preserve media order, avoid horizontal overflow, keep controls comfortably sized, and use semantic headings and landmarks. Provide useful titles for map and YouTube iframes, meaningful image text where available, and native lazy loading for non-hero images.

## Explicit Bans

No anchors, ship wheels, rope treatments, tourist clichés, glass panels, gradient text, oversized radii, sketchy SVGs, decorative stripe/grid backgrounds, repeated tiny uppercase eyebrows, or ornamental motion. Do not copy stefanimhoff.de's Japanese Ma styling.
