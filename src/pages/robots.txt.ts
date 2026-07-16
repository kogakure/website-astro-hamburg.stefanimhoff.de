import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const origin = site?.origin ?? 'https://hamburg.stefanimhoff.de';
	return new Response(
		`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap-index.xml\nHost: ${origin}\n`,
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
	);
};
