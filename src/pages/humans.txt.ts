import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
	new Response(
		`/* The Humans Responsible & Colophon */
/* humanstxt.org */

/* TEAM */
Designer:    Stefan Imhoff
Developer:   Stefan Imhoff
Site:        mail [at] stefanimhoff.de
Location:    Hamburg, Germany

/* SITE */
Language:    English
Components:  Astro, Tailwind CSS, TypeScript
Software:    Visual Studio Code, Affinity Designer, Git
`,
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
	);
