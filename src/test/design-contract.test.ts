import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');
const source = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe('field-journal interaction contracts', () => {
	it('keeps route-choice metadata available on narrow district rows', () => {
		const card = source('src/components/DistrictCard.astro');
		expect(card).toContain('class="district-log"');
		expect(card).not.toMatch(/\.district-log\s*\{[^}]*display:\s*none/s);
	});

	it('provides long district galleries with accessible recovery links', () => {
		const district = source('src/pages/[slug].astro');
		expect(district).toContain('aria-label="Walk page shortcuts"');
		expect(district).toContain('href="#main">Back to walk summary');
		expect(district).toContain('href="/">Return to district atlas');
		expect(district).toMatch(/\.gallery-recovery a\s*\{[^}]*gap:\s*0\.35rem/s);
	});

	it('keeps map and imprint links comfortably touchable', () => {
		for (const path of ['src/components/MapEmbed.astro', 'src/components/PageFooter.astro']) {
			expect(source(path)).toContain('min-height: 2.75rem');
		}
	});

	it('limits map referrer data to the destination origin', () => {
		expect(source('src/components/MapEmbed.astro')).toContain(
			'referrerpolicy="strict-origin-when-cross-origin"',
		);
	});

	it('uses the chart-canvas and night-water colors in install metadata', () => {
		const astroConfig = source('astro.config.mjs');
		expect(astroConfig).toContain("background_color: '#f3f7fa'");
		expect(astroConfig).toContain("theme_color: '#030f18'");
	});

	it('lets semantic font weights control Secuela and preloads the critical face', () => {
		expect(source('src/styles/global.css')).not.toContain('font-variation-settings');
		expect(source('src/layouts/BaseLayout.astro')).toContain(
			'href="/assets/fonts/secuela-regular-vf.woff2"',
		);
	});

	it('keeps condensed long-form prose at the intentional measure', () => {
		expect(source('src/styles/global.css')).toContain('--reading-width: 60ch');
		expect(source('src/pages/index.astro')).toContain('max-width: 54ch');
	});

	it('aligns district mastheads to the outer shell without breaking names mid-word', () => {
		const district = source('src/pages/[slug].astro');
		expect(district).toContain('width: calc(100% + var(--page-gutter) + var(--page-gutter))');
		expect(district).toContain('margin-inline: calc(-1 * var(--page-gutter))');
		expect(district).toContain("titleLength >= 14 ? 'extra-long'");
		expect(district).toContain('overflow-wrap: normal');
		expect(district).not.toContain('overflow-wrap: anywhere');
	});

	it('aligns the district reading column with the masthead divider', () => {
		const district = source('src/pages/[slug].astro');
		expect(district).toContain('--district-columns: minmax(22rem, 0.9fr) minmax(0, 1.7fr)');
		expect(district).toMatch(/\.district-masthead\s*\{[^}]*var\(--district-columns\)/s);
		expect(district).toMatch(/\.district-reading-grid\s*\{[^}]*var\(--district-columns\)/s);
		expect(district).toMatch(/\.district-reading-column\s*\{[^}]*grid-column:\s*2/s);
		expect(district).toMatch(/\.district-reading-column\s*\{[^}]*width:\s*100%/s);
		expect(district).toMatch(
			/\.district-content :global\(p\)\s*\{[^}]*max-width:\s*var\(--reading-width\)/s,
		);
	});

	it('centers wide district media against the outer grid container', () => {
		const district = source('src/pages/[slug].astro');
		expect(district).toMatch(/\.district-reading-grid\s*\{[^}]*container-type:\s*inline-size/s);
		expect(district).toContain('left: calc(50cqw - max(22rem, 34.615cqw))');
	});

	it('keeps imprint acknowledgements visibly marked as a list', () => {
		const imprint = source('src/pages/imprint.astro');
		expect(imprint).toMatch(/ul\s*\{[^}]*list-style:\s*disc outside/s);
		expect(imprint).toMatch(/li::marker\s*\{[^}]*color:\s*var\(--color-buoy\)/s);
	});
});
