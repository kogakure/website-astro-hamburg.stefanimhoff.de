export interface ContentLinkOptions {
	href?: string | URL | null;
	target?: string | null;
	rel?: string | null;
	className?: string | null;
}

export function contentLinkAttributes({ href, target, rel, className }: ContentLinkOptions) {
	const external = href != null && /^https?:\/\//i.test(href.toString());
	const relTokens = new Set(rel?.split(/\s+/).filter(Boolean));

	if (target === '_blank') {
		relTokens.add('noopener');
		relTokens.add('noreferrer');
	}

	return {
		target: target ?? undefined,
		rel: relTokens.size > 0 ? [...relTokens].join(' ') : undefined,
		className:
			[className, external ? 'external' : undefined].filter(Boolean).join(' ') || undefined,
	};
}
