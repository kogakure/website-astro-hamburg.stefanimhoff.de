import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { imageSize } from 'image-size';

export interface ImageDimensions {
	width: number;
	height: number;
}

export function getPublicImageDimensions(
	src: string,
	publicRoot = resolve(process.cwd(), 'public'),
): ImageDimensions {
	const pathname = decodeURIComponent(src.split(/[?#]/, 1)[0] ?? '');
	if (!pathname.startsWith('/')) {
		throw new Error(`Content image must use an absolute public path: ${src}`);
	}

	const filePath = resolve(publicRoot, `.${pathname}`);
	const rootPrefix = publicRoot.endsWith(sep) ? publicRoot : `${publicRoot}${sep}`;
	if (!filePath.startsWith(rootPrefix)) {
		throw new Error(`Content image escapes the public directory: ${src}`);
	}

	let dimensions: ReturnType<typeof imageSize>;
	try {
		dimensions = imageSize(readFileSync(filePath));
	} catch (error) {
		throw new Error(`Could not read intrinsic dimensions for ${src} (${filePath})`, {
			cause: error,
		});
	}

	if (!dimensions.width || !dimensions.height) {
		throw new Error(`Unsupported image or missing dimensions: ${src}`);
	}

	return { width: dimensions.width, height: dimensions.height };
}
