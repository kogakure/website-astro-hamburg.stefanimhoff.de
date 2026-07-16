import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { imageSize } from 'image-size';

const root = resolve(import.meta.dirname, '..');
const contentDirectory = resolve(root, 'src/content/districts');
const distDirectory = resolve(root, 'dist');
const publicDirectory = resolve(root, 'public');

const contentImages = new Set(
	readdirSync(contentDirectory)
		.filter((file) => file.endsWith('.mdx'))
		.flatMap((file) => {
			const source = readFileSync(resolve(contentDirectory, file), 'utf8');
			return source.match(/\/assets\/images\/[^\s)'"<]+/g) ?? [];
		}),
);

if (contentImages.size !== 837) {
	throw new Error(`Expected 837 unique district content images, found ${contentImages.size}`);
}

const builtImageTags = readdirSync(distDirectory, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name.startsWith('hamburg-'))
	.flatMap((entry) => {
		const html = readFileSync(resolve(distDirectory, entry.name, 'index.html'), 'utf8');
		return html.match(/<img\b[^>]*>/g) ?? [];
	});

const attribute = (tag, name) => tag.match(new RegExp(`\\s${name}=["']([^"']+)["']`, 'i'))?.[1];

const rendered = new Set();
for (const tag of builtImageTags) {
	const src = attribute(tag, 'src');
	if (!src || !contentImages.has(src)) continue;

	const actual = imageSize(readFileSync(resolve(publicDirectory, `.${src}`)));
	const width = Number(attribute(tag, 'width'));
	const height = Number(attribute(tag, 'height'));
	if (width !== actual.width || height !== actual.height) {
		throw new Error(
			`${src} rendered ${width}x${height}; expected ${actual.width}x${actual.height}`,
		);
	}
	rendered.add(src);
}

const missing = [...contentImages].filter((src) => !rendered.has(src));
if (missing.length > 0) {
	throw new Error(
		`Built HTML omitted intrinsic dimensions for: ${missing.slice(0, 10).join(', ')}`,
	);
}

console.log(`Verified intrinsic dimensions for ${rendered.size} built district images.`);
