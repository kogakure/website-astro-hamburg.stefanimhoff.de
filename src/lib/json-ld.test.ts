import { describe, expect, it } from 'vitest';

import { serializeJsonLd } from './json-ld.ts';

describe('serializeJsonLd', () => {
	it('serializes valid JSON while escaping script-sensitive characters', () => {
		const serialized = serializeJsonLd({
			value: '</script><script>alert("xss")</script>&\u2028\u2029',
		});

		expect(serialized).not.toContain('</script>');
		expect(serialized).not.toContain('<');
		expect(serialized).not.toContain('>');
		expect(serialized).not.toContain('&');
		expect(serialized).not.toContain('\u2028');
		expect(serialized).not.toContain('\u2029');
		expect(JSON.parse(serialized)).toEqual({
			value: '</script><script>alert("xss")</script>&\u2028\u2029',
		});
	});
});
