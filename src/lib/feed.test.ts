import { absoluteHtmlUrls, cdata, escapeXml } from './feed.ts';
import { describe, expect, it } from 'vitest';

describe('Atom feed utilities', () => {
	it('escapes XML attributes and text', () => {
		expect(escapeXml(`Hamburg & <Elbe> "walk"`)).toBe(
			'Hamburg &amp; &lt;Elbe&gt; &quot;walk&quot;',
		);
	});

	it('makes local content URLs absolute while preserving special schemes and fragments', () => {
		const html =
			'<img src="/assets/photo.jpg"><a href="next/">Next</a><a href="#map">Map</a><a href="mailto:a@example.com">Mail</a>';
		expect(absoluteHtmlUrls(html, new URL('https://example.com/hamburg-altstadt/'))).toBe(
			'<img src="https://example.com/assets/photo.jpg"><a href="https://example.com/hamburg-altstadt/next/">Next</a><a href="#map">Map</a><a href="mailto:a@example.com">Mail</a>',
		);
	});

	it('safely splits a CDATA terminator', () => {
		expect(cdata('one]]>two')).toBe('one]]]]><![CDATA[>two');
	});
});
