import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { getPublicImageDimensions } from './image-dimensions.ts';

const root = resolve(import.meta.dirname, '../..');
const contentDirectory = resolve(root, 'src/content/districts');
const publicRoot = resolve(root, 'public');

const referencedImages = readdirSync(contentDirectory)
	.filter((file) => file.endsWith('.mdx'))
	.flatMap((file) => {
		const source = readFileSync(resolve(contentDirectory, file), 'utf8');
		return source.match(/\/assets\/images\/[^\s)'"<]+/g) ?? [];
	});

describe('content image dimensions', () => {
	it('reads representative landscape and portrait image headers', () => {
		expect(
			getPublicImageDimensions('/assets/images/districts/altstadt-01.jpg', publicRoot),
		).toEqual({ width: 1000, height: 750 });
		expect(
			getPublicImageDimensions('/assets/images/districts/altstadt-10.jpg', publicRoot),
		).toEqual({ width: 1000, height: 1333 });
	});

	it('resolves every district content image and fails loudly for missing assets', () => {
		expect(referencedImages).toHaveLength(837);
		for (const src of referencedImages) {
			const dimensions = getPublicImageDimensions(src, publicRoot);
			expect(dimensions.width, src).toBeGreaterThan(0);
			expect(dimensions.height, src).toBeGreaterThan(0);
		}

		expect(() => getPublicImageDimensions('/assets/images/missing.jpg', publicRoot)).toThrow(
			'Could not read intrinsic dimensions',
		);
	});
});
