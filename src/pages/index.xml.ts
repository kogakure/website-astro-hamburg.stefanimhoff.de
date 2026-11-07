import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import type { APIRoute } from 'astro';
import mdxRenderer from '@astrojs/mdx/server.js';

import ContentImage from '@/components/ContentImage.astro';
import ContentLink from '@/components/ContentLink.astro';
import MapEmbed from '@/components/MapEmbed.astro';
import YouTubeEmbed from '@/components/YouTubeEmbed.astro';
import { absoluteHtmlUrls, cdata, escapeXml } from '@/lib/feed.ts';

export const GET: APIRoute = async ({ site }) => {
	const base = site ?? new URL('https://hamburg.stefanimhoff.de');
	const districts = (await getCollection('districts')).sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime(),
	);
	const container = await AstroContainer.create();
	container.addServerRenderer({ renderer: mdxRenderer });
	const components = { img: ContentImage, a: ContentLink, MapEmbed, YouTubeEmbed };
	const entries = await Promise.all(
		districts.map(async (district) => {
			const url = new URL(`/${district.id}/`, base);
			const { Content } = await render(district);
			const rendered = await container.renderToString(Content, { props: { components } });
			const content = absoluteHtmlUrls(rendered, url);

			return `<entry>
	<title>${escapeXml(district.data.title)}</title>
	<link href="${escapeXml(url.href)}" rel="alternate" type="text/html" />
	<updated>${district.data.date.toISOString()}</updated>
	<id>${escapeXml(url.href)}</id>
	<author><name>${escapeXml(district.data.author)}</name></author>
	<content type="html"><![CDATA[${cdata(content)}]]></content>
</entry>`;
		}),
	);
	const feedUrl = new URL('/index.xml', base);
	const homeUrl = new URL('/', base);
	const updated = districts[0]?.data.date.toISOString() ?? new Date(0).toISOString();
	const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
	<title>Exploring Hamburg</title>
	<subtitle>Walking through the districts of Hamburg, one route at a time.</subtitle>
	<link href="${feedUrl.href}" rel="self" type="application/atom+xml" />
	<link href="${homeUrl.href}" rel="alternate" type="text/html" />
	<updated>${updated}</updated>
	<id>${homeUrl.href}</id>
	<author><name>Stefan Imhoff</name></author>
	<webfeeds:cover image="${new URL('/assets/images/branding/webfeeds-cover.jpg', base).href}" />
	<webfeeds:icon>${new URL('/assets/images/branding/webfeeds-icon.png', base).href}</webfeeds:icon>
	<webfeeds:logo>${new URL('/assets/images/branding/webfeeds-logo.svg', base).href}</webfeeds:logo>
	<webfeeds:accentColor>ff2745</webfeeds:accentColor>
	<webfeeds:related layout="card" target="browser" />
	${entries.join('\n\t')}
</feed>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
	});
};
