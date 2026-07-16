import type { CollectionEntry } from 'astro:content';

export type District = CollectionEntry<'districts'>;

export function durationToMinutes(duration: string): number {
	const match = /^(\d+):(\d{2})$/.exec(duration);
	if (!match) throw new Error(`Invalid duration: ${duration}`);
	const hours = Number(match[1]);
	const minutes = Number(match[2]);
	if (minutes > 59) throw new Error(`Invalid duration: ${duration}`);
	return hours * 60 + minutes;
}

export function formatDuration(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	const parts: string[] = [];

	if (hours > 0) parts.push(`${hours} hr`);
	if (remainingMinutes > 0) parts.push(`${remainingMinutes} min`);

	return parts.join(' ') || '0 min';
}

export function sortDistricts(districts: District[]): District[] {
	return [...districts].sort((a, b) =>
		a.data.title.localeCompare(b.data.title, 'en', { sensitivity: 'base' }),
	);
}

export function districtTotals(districts: District[]) {
	const minutes = districts.reduce((total, district) => total + district.data.durationMinutes, 0);

	return {
		count: districts.length,
		distanceKm: districts.reduce((total, district) => total + district.data.distanceKm, 0),
		durationMinutes: minutes,
		durationHours: Math.round(minutes / 60),
	};
}

export function districtNavigation(districts: District[], id: string) {
	const sorted = sortDistricts(districts);
	const index = sorted.findIndex((district) => district.id === id);

	return {
		previous: index > 0 ? sorted[index - 1] : null,
		next: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
	};
}

export function districtThumbnail(district: District): string {
	return `/assets/images/districts/thumbnails/${district.id}-450px.jpg`;
}

export function districtHero(district: District): string {
	return `/assets/images/hero/${district.id}.jpg`;
}
