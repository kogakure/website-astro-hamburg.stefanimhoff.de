import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import webmanifest from 'astro-webmanifest';
import { defineConfig } from 'astro/config';
import serviceWorker from 'astrojs-service-worker';

export default defineConfig({
	site: 'https://hamburg.stefanimhoff.de',
	output: 'static',
	trailingSlash: 'always',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.endsWith('/imprint/') && !page.endsWith('/404.html'),
		}),
		webmanifest({
			name: 'Exploring Hamburg',
			short_name: 'Exploring Hamburg',
			description: 'Walking through the districts of Hamburg.',
			icons: [
				{
					src: '/assets/images/branding/favicons/favicon-192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/assets/images/branding/favicons/favicon-512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
			start_url: '/',
			display: 'standalone',
			background_color: '#f2efe6',
			theme_color: '#163344',
		}),
		serviceWorker({
			registration: {
				autoRegister: false,
			},
			workbox: {
				globDirectory: 'dist/',
				globPatterns: ['**/*.{html,css,js,woff2}'],
				swDest: 'dist/sw.js',
				sourcemap: false,
				cleanupOutdatedCaches: true,
				clientsClaim: true,
				skipWaiting: true,
				runtimeCaching: [
					{
						urlPattern: /\.(?:avif|gif|jpe?g|png|svg|webp)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24 * 30,
							},
						},
					},
				],
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		css: {
			postcss: {
				plugins: [],
			},
		},
	},
	build: {
		format: 'directory',
		inlineStylesheets: 'always',
	},
});
