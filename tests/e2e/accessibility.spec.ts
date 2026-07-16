import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const representativeRoutes = [
	{ name: 'homepage', path: '/' },
	{ name: 'district', path: '/hamburg-altstadt/' },
	{ name: 'imprint', path: '/imprint/' },
	{ name: 'not found', path: '/404.html' },
] as const;

for (const theme of ['light', 'dark'] as const) {
	test(`representative pages have no detectable accessibility violations in ${theme} mode`, async ({
		page,
	}) => {
		await page.addInitScript((selectedTheme) => {
			window.localStorage.setItem('theme', selectedTheme);
		}, theme);

		for (const route of representativeRoutes) {
			await test.step(route.name, async () => {
				await page.goto(route.path);
				await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

				const results = await new AxeBuilder({ page }).analyze();
				expect(
					results.violations,
					`${route.path} has accessibility violations in ${theme} mode`,
				).toEqual([]);
			});
		}
	});
}

test('keyboard users can skip navigation, toggle the theme, and enter the district atlas', async ({
	page,
}) => {
	await page.goto('/');

	await page.keyboard.press('Tab');
	const skipLink = page.getByRole('link', { name: 'Skip to content' });
	await expect(skipLink).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(/#main$/);

	await page.goto('/');
	await page.keyboard.press('Tab');
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: /Exploring Hamburg/ })).toBeFocused();

	await page.keyboard.press('Tab');
	const themeToggle = page.getByRole('button', { name: /Switch to (?:light|dark) theme/ });
	await expect(themeToggle).toBeFocused();
	const initialTheme = await page.locator('html').getAttribute('data-theme');
	await page.keyboard.press('Space');
	await expect(page.locator('html')).not.toHaveAttribute('data-theme', initialTheme ?? '');

	await page.keyboard.press('Tab');
	await expect(page.locator('.district-card > a').first()).toBeFocused();
	await expect(page.locator('.district-card a button, .district-card button a')).toHaveCount(0);
});

test('theme selection follows the system, remains accessible, and persists across reloads', async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('/');

	const themeToggle = page.locator('[data-theme-toggle]');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');

	await page.emulateMedia({ colorScheme: 'dark' });
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(themeToggle).toHaveAttribute('aria-pressed', 'true');

	await themeToggle.click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(themeToggle).toHaveAttribute('aria-label', 'Switch to dark theme');
	await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');
	expect(await page.evaluate(() => window.localStorage.getItem('theme'))).toBe('light');

	await page.emulateMedia({ colorScheme: 'light' });
	await page.emulateMedia({ colorScheme: 'dark' });
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');

	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toHaveAttribute(
		'aria-pressed',
		'false',
	);
});

test('reduced-motion preference minimizes animation and transition durations', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');

	const durations = await page.evaluate(() => {
		const readDurations = (value: string) =>
			value.split(',').map((duration) => {
				const trimmed = duration.trim();
				return trimmed.endsWith('ms')
					? Number.parseFloat(trimmed) / 1000
					: Number.parseFloat(trimmed);
			});
		const elements = [
			document.querySelector('main'),
			document.querySelector('[data-theme-toggle]'),
		];

		return elements.flatMap((element) => {
			if (!element) return [];
			const style = getComputedStyle(element);
			return [
				...readDurations(style.animationDuration),
				...readDurations(style.transitionDuration),
			];
		});
	});

	expect(Math.max(...durations)).toBeLessThanOrEqual(0.001);
});

test('interactive targets and embedded content expose usable browser semantics', async ({
	page,
}) => {
	await page.goto('/hamburg-hafencity/');

	const frames = page.locator('.embed iframe');
	await expect(frames).toHaveCount(3);
	for (const frame of await frames.all()) {
		await expect(frame).toHaveAttribute('title', /\S+/);
	}
	await expect(page.locator('.embed figcaption a')).toHaveCount(3);

	for (const target of await page.locator('[data-theme-toggle], .district-navigation a').all()) {
		const box = await target.boundingBox();
		expect(box).not.toBeNull();
		expect(box?.width).toBeGreaterThanOrEqual(24);
		expect(box?.height).toBeGreaterThanOrEqual(24);
	}
});

test('representative pages do not overflow supported viewport widths', async ({ page }) => {
	for (const width of [375, 768, 1440]) {
		await test.step(`${width}px`, async () => {
			await page.setViewportSize({ width, height: 900 });
			for (const path of ['/', '/hamburg-altstadt/', '/imprint/', '/404.html']) {
				await page.goto(path);
				const dimensions = await page.evaluate(() => ({
					clientWidth: document.documentElement.clientWidth,
					scrollWidth: document.documentElement.scrollWidth,
				}));
				expect(
					dimensions.scrollWidth,
					`${path} overflows at ${width}px`,
				).toBeLessThanOrEqual(dimensions.clientWidth);
			}
		});
	}
});
