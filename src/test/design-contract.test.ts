import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');
const source = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe('Kiez Neon interaction contracts', () => {
	it('keeps route-choice metadata visible on every district row', () => {
		const card = source('src/components/DistrictCard.astro');
		expect(card).toContain('class="district-log"');
		expect(card).not.toMatch(/\.district-log\s*\{[^}]*display:\s*none/s);
	});

	it('lights district names on hover, keyboard focus, and touch scrolling alike', () => {
		const card = source('src/components/DistrictCard.astro');
		expect(card).toContain('.district-card a:hover .district-name');
		expect(card).toContain('.district-card a:focus-visible .district-name');
		expect(card).toContain('.district-card a.is-lit .district-name');
		expect(source('src/pages/index.astro')).toContain("matchMedia('(hover: none)')");
	});

	it('limits the sign palette to three tube colours in both themes', () => {
		const css = source('src/styles/global.css');
		for (const tube of ['--tube-red', '--tube-blue', '--tube-white']) {
			expect(css.match(new RegExp(`${tube}:`, 'g'))).toHaveLength(2);
		}
		expect(css).not.toMatch(/--tube-(?!red|blue|white|glow)[a-z]+:/);
	});

	it('keeps small text off photographs so contrast never depends on the image', () => {
		const district = source('src/pages/[slug].astro');
		expect(district.indexOf('class="breadcrumbs"')).toBeLessThan(
			district.indexOf('class="district-masthead"'),
		);
		expect(district).toMatch(/\.district-title\s*\{[^}]*background:\s*linear-gradient/s);
		const home = source('src/pages/index.astro');
		const sign = home.slice(
			home.indexOf('<section class="sign"'),
			home.indexOf('<div class="ledger">'),
		);
		const ledger = home.slice(
			home.indexOf('<div class="ledger">'),
			home.indexOf('<section class="districts"'),
		);
		expect(sign).toContain('class="sign-backdrop"');
		expect(sign).not.toContain('class="intro-copy"');
		expect(ledger).not.toContain('<img');
		expect(home).toMatch(/\.sign-backdrop::after\s*\{[^}]*var\(--color-wall\)\s*\)/s);
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

	it('uses the night wall colour in install metadata', () => {
		const astroConfig = source('astro.config.mjs');
		expect(astroConfig).toContain("background_color: '#06070f'");
		expect(astroConfig).toContain("theme_color: '#06070f'");
	});

	it('self-hosts and preloads both typefaces', () => {
		const layout = source('src/layouts/BaseLayout.astro');
		expect(layout).toContain('href="/assets/fonts/schibsted-grotesk-vf.woff2"');
		expect(layout).toContain('href="/assets/fonts/tilt-neon.woff2"');
		expect(source('src/styles/global.css')).not.toContain('fonts.googleapis.com');
	});

	it('keeps long-form prose at the intentional measure', () => {
		expect(source('src/styles/global.css')).toContain('--reading-width: 62ch');
		expect(source('src/pages/[slug].astro')).toMatch(
			/\.district-content :global\(p\)\s*\{[^}]*max-width:\s*var\(--reading-width\)/s,
		);
		expect(source('src/pages/index.astro')).toContain('max-width: 54ch');
	});

	it('keeps district names whole', () => {
		const district = source('src/pages/[slug].astro');
		expect(district).toContain("titleLength >= 14 ? 'extra-long'");
		expect(district).toContain('overflow-wrap: normal');
		expect(district).not.toContain('overflow-wrap: anywhere');
	});

	it('keeps imprint acknowledgements visibly marked as a list', () => {
		const imprint = source('src/pages/imprint.astro');
		expect(imprint).toMatch(/ul\s*\{[^}]*list-style:\s*disc outside/s);
		expect(imprint).toMatch(/li::marker\s*\{[^}]*color:\s*var\(--tube-red\)/s);
	});
});
