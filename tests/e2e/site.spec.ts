import { expect, test } from '@playwright/test';

const slugs = [
	'hamburg-altstadt',
	'hamburg-barmbek-nord',
	'hamburg-barmbek-sued',
	'hamburg-borgfelde',
	'hamburg-dulsberg',
	'hamburg-eilbek',
	'hamburg-farmsen-berne',
	'hamburg-hafencity',
	'hamburg-hamm',
	'hamburg-hammerbrook',
	'hamburg-hohenfelde',
	'hamburg-marienthal',
	'hamburg-neustadt',
	'hamburg-rothenburgsort',
	'hamburg-rotherbaum',
	'hamburg-st-georg',
	'hamburg-st-pauli',
	'hamburg-tonndorf',
	'hamburg-uhlenhorst',
	'hamburg-wandsbek',
];

test('homepage shows the totals and alphabetically sorted district cards', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1, name: 'Exploring Hamburg' })).toBeVisible();
	await expect(page.getByText('280', { exact: true })).toBeVisible();
	await expect(page.getByText('65', { exact: true })).toBeVisible();
	await expect(
		page.getByRole('region', { name: 'Walk record' }).getByText('20', { exact: true }),
	).toBeVisible();

	const hrefs = await page
		.locator('.district-card > a')
		.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
	expect(hrefs).toEqual(slugs.map((slug) => `/${slug}/`));
});

test('all district routes respond with canonical article metadata', async ({ request }) => {
	for (const slug of slugs) {
		const response = await request.get(`/${slug}/`);
		expect(response.ok(), slug).toBe(true);
		const html = await response.text();
		expect(html).toContain(
			`<link rel="canonical" href="https://hamburg.stefanimhoff.de/${slug}/">`,
		);
		expect(html).toContain('<meta property="og:type" content="article">');
		expect(html).toContain(
			`<meta property="og:url" content="https://hamburg.stefanimhoff.de/${slug}/">`,
		);
	}
});

test('district navigation and embeds preserve the migrated content flow', async ({ page }) => {
	await page.goto('/hamburg-altstadt/');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://hamburg.stefanimhoff.de/hamburg-altstadt/',
	);
	await expect(page.locator('a[rel="prev"]')).toHaveCount(0);
	await expect(page.locator('a[rel="next"]')).toHaveAttribute('href', '/hamburg-barmbek-nord/');
	await expect(page.locator('.embed-map iframe')).toHaveCount(1);

	await page.goto('/hamburg-hafencity/');
	await expect(page.locator('a[rel="prev"]')).toHaveAttribute('href', '/hamburg-farmsen-berne/');
	await expect(page.locator('a[rel="next"]')).toHaveAttribute('href', '/hamburg-hamm/');
	await expect(page.locator('.embed-video iframe')).toHaveCount(2);
	await expect(page.locator('.embed-map iframe')).toHaveCount(1);

	await page.goto('/hamburg-wandsbek/');
	await expect(page.locator('a[rel="prev"]')).toHaveAttribute('href', '/hamburg-uhlenhorst/');
	await expect(page.locator('a[rel="next"]')).toHaveCount(0);
});

test('utility pages and machine-readable outputs are published correctly', async ({
	page,
	request,
}) => {
	await page.goto('/imprint/');
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://hamburg.stefanimhoff.de/imprint/',
	);
	await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
		'content',
		'https://hamburg.stefanimhoff.de/imprint/',
	);

	const notFound = await request.get('/404.html');
	expect(notFound.status()).toBe(200);
	const notFoundBody = await notFound.text();
	expect(notFoundBody).toContain('<h1');
	expect(notFoundBody).toContain('Error 404');
	expect(notFoundBody).not.toContain('rel="canonical"');

	const feed = await request.get('/index.xml');
	expect(feed.headers()['content-type']).toMatch(/(?:application\/atom\+xml|text\/xml)/);
	expect(await feed.text()).toContain('<entry>');

	const robots = await request.get('/robots.txt');
	expect(await robots.text()).toContain(
		'Sitemap: https://hamburg.stefanimhoff.de/sitemap-index.xml',
	);

	const manifest = await request.get('/manifest.webmanifest');
	expect(manifest.ok()).toBe(true);
	expect((await manifest.json()).name).toBe('Exploring Hamburg');

	const sitemapIndex = await request.get('/sitemap-index.xml');
	expect(sitemapIndex.ok()).toBe(true);
	const sitemap = await request.get('/sitemap-0.xml');
	const sitemapBody = await sitemap.text();
	expect(sitemapBody).not.toContain('/imprint/');
	expect(sitemapBody).not.toContain('/404.html');

	const serviceWorker = await request.get('/sw.js');
	expect(serviceWorker.ok()).toBe(true);
});
