import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const districts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/districts' }),
	schema: z.object({
		title: z.string(),
		author: z.string().default('Stefan Imhoff'),
		date: z.coerce.date(),
		distanceKm: z.number().positive(),
		durationMinutes: z.number().int().positive(),
	}),
});

export const collections = { districts };
