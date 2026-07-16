const XML_ENTITIES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&apos;',
};

export function escapeXml(value: string): string {
	return value.replace(/[&<>"']/g, (character) => XML_ENTITIES[character]);
}

export function absoluteHtmlUrls(html: string, pageUrl: URL): string {
	return html.replace(
		/\b(href|src)=(['"])([^'"#][^'"]*)\2/gi,
		(_match, attribute: string, quote: string, value: string) => {
			if (/^(?:data:|mailto:|tel:|javascript:)/i.test(value)) return _match;
			return `${attribute}=${quote}${new URL(value, pageUrl).href}${quote}`;
		},
	);
}

export function cdata(value: string): string {
	return value.replaceAll(']]>', ']]]]><![CDATA[>');
}
