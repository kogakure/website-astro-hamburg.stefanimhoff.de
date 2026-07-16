import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');
const contentDirectory = join(root, 'src/content/districts');
const publicDirectory = join(root, 'public');
const entries = readdirSync(contentDirectory)
	.filter((file) => file.endsWith('.mdx'))
	.sort();
const sources = entries.map((file) => readFileSync(join(contentDirectory, file), 'utf8'));

const expectedSlugs = [
	'hamburg-altstadt',
	'hamburg-barmbek-nord',
	'hamburg-barmbek-sued',
	'hamburg-borgfelde',
	'hamburg-dulsberg',
	'hamburg-eilbek',
	'hamburg-farmsen-berne',
	'hamburg-hafencity',
	'hamburg-hamm',
	'hamburg-hammerbrook',
	'hamburg-hohenfelde',
	'hamburg-marienthal',
	'hamburg-neustadt',
	'hamburg-rothenburgsort',
	'hamburg-rotherbaum',
	'hamburg-st-georg',
	'hamburg-st-pauli',
	'hamburg-tonndorf',
	'hamburg-uhlenhorst',
	'hamburg-wandsbek',
];

function frontmatterNumber(source: string, key: string): number {
	const match = new RegExp(`^${key}: (\\d+)$`, 'm').exec(source);
	if (!match) throw new Error(`Missing numeric frontmatter field: ${key}`);
	return Number(match[1]);
}

function walk(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		return entry.isDirectory() ? walk(path) : [path];
	});
}

describe('migrated content parity', () => {
	it('keeps the exact district routes and aggregate statistics', () => {
		expect(entries.map((file) => file.replace(/\.mdx$/, ''))).toEqual(expectedSlugs);
		expect(
			sources.reduce((sum, source) => sum + frontmatterNumber(source, 'distanceKm'), 0),
		).toBe(280);
		const minutes = sources.reduce(
			(sum, source) => sum + frontmatterNumber(source, 'durationMinutes'),
			0,
		);
		expect(minutes).toBe(3884);
		expect(Math.round(minutes / 60)).toBe(65);
	});

	it('keeps every content image reference and embed', () => {
		const imageReferences = sources.flatMap(
			(source) => source.match(/\/assets\/images\/[^)"'\s]+/g) ?? [],
		);
		expect(imageReferences).toHaveLength(837);
		for (const image of imageReferences)
			expect(existsSync(join(publicDirectory, image))).toBe(true);

		expect(sources.flatMap((source) => source.match(/<MapEmbed\b/g) ?? [])).toHaveLength(20);
		expect(sources.flatMap((source) => source.match(/<YouTubeEmbed\b/g) ?? [])).toHaveLength(2);
	});

	it('keeps authored cross-district anchors', () => {
		const anchors = sources.flatMap(
			(source) => source.match(/<a id="[^"]+" href="[^"]+">/g) ?? [],
		);
		expect(anchors).toEqual([
			'<a id="tunnel" href="/hamburg-st-georg#tunnel">',
			'<a id="tunnel" href="/hamburg-hammerbrook#tunnel">',
		]);
	});

	it('keeps the complete public asset inventory', () => {
		const files = walk(publicDirectory);
		const imageExtensions = new Set([
			'.jpg',
			'.jpeg',
			'.png',
			'.svg',
			'.webp',
			'.gif',
			'.avif',
		]);
		expect(
			files.filter((file) => imageExtensions.has(extname(file).toLowerCase())),
		).toHaveLength(917);
		expect(files.filter((file) => /\.woff2?$/.test(file))).toHaveLength(4);
		for (const file of [
			'favicon.ico',
			'googleeac4fc886a6f9f8d.html',
			'.well-known/keybase.txt',
		]) {
			expect(existsSync(join(publicDirectory, file))).toBe(true);
		}
	});
});
