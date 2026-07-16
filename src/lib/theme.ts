export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

export function isTheme(value: string | null): value is Theme {
	return value === 'light' || value === 'dark';
}

export function resolveTheme(storedTheme: string | null, prefersDark: boolean): Theme {
	return isTheme(storedTheme) ? storedTheme : prefersDark ? 'dark' : 'light';
}
