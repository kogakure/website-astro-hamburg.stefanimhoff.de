import { describe, expect, it } from 'vitest';

import { isTheme, resolveTheme, THEME_STORAGE_KEY } from './theme';

describe('theme preferences', () => {
	it('uses a valid stored preference ahead of the system preference', () => {
		expect(resolveTheme('light', true)).toBe('light');
		expect(resolveTheme('dark', false)).toBe('dark');
	});

	it('falls back to the system preference for missing or invalid storage', () => {
		expect(resolveTheme(null, true)).toBe('dark');
		expect(resolveTheme('sepia', false)).toBe('light');
	});

	it('only recognizes supported themes and exposes a stable storage key', () => {
		expect(isTheme('light')).toBe(true);
		expect(isTheme('dark')).toBe(true);
		expect(isTheme('auto')).toBe(false);
		expect(THEME_STORAGE_KEY).toBe('theme');
	});
});
