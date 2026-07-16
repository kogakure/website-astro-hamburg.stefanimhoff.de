import { describe, expect, it } from 'vitest';

import { contentLinkAttributes } from './content-link.ts';

describe('contentLinkAttributes', () => {
	it('keeps external links in the authored default browsing context', () => {
		expect(contentLinkAttributes({ href: 'https://example.com' })).toEqual({
			target: undefined,
			rel: undefined,
			className: 'external',
		});
	});

	it('preserves authored attributes and secures explicit blank targets', () => {
		expect(
			contentLinkAttributes({
				href: 'https://example.com',
				target: '_blank',
				rel: 'nofollow',
				className: 'source',
			}),
		).toEqual({
			target: '_blank',
			rel: 'nofollow noopener noreferrer',
			className: 'source external',
		});
	});

	it('does not modify internal same-tab links', () => {
		expect(
			contentLinkAttributes({ href: '/imprint/', rel: 'author', className: 'legal' }),
		).toEqual({
			target: undefined,
			rel: 'author',
			className: 'legal',
		});
	});
});
