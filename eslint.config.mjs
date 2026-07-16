import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
	js.configs.recommended,
	prettierRecommended,
	...astroPlugin.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.astro'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		ignores: [
			'.agents/',
			'.astro/',
			'.codegraph/',
			'.claude/',
			'.codex/',
			'dist/',
			'node_modules/',
			'.eleventy.js',
			'gulpfile.js',
			'plop/',
			'plopfile.js',
			'postcss.config.js',
			'src/assets/scripts/',
			'src/data/',
			'src/legacy/',
			'src/utils/',
			'workbox.config.js',
		],
	},
];
