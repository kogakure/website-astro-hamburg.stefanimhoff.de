import type { District } from './districts.ts';
import {
	districtNavigation,
	districtTotals,
	durationToMinutes,
	formatDuration,
	sortDistricts,
} from './districts.ts';
import { describe, expect, it } from 'vitest';

function district(
	id: string,
	title: string,
	distanceKm: number,
	durationMinutes: number,
): District {
	return {
		id,
		collection: 'districts',
		data: {
			title,
			author: 'Stefan Imhoff',
			date: new Date('2015-01-01T00:00:00Z'),
			distanceKm,
			durationMinutes,
		},
	} as District;
}

describe('district utilities', () => {
	it('converts legacy H:MM durations to explicit minutes', () => {
		expect(durationToMinutes('5:17')).toBe(317);
		expect(durationToMinutes('1:04')).toBe(64);
		expect(() => durationToMinutes('2:75')).toThrow('Invalid duration');
	});

	it('formats exact durations and omits zero-value units', () => {
		expect(formatDuration(90)).toBe('1 hr 30 min');
		expect(formatDuration(244)).toBe('4 hr 4 min');
		expect(formatDuration(60)).toBe('1 hr');
		expect(formatDuration(45)).toBe('45 min');
		expect(formatDuration(0)).toBe('0 min');
	});

	it('sorts titles alphabetically without mutating the input', () => {
		const input = [district('z', 'Wandsbek', 1, 1), district('a', 'Altstadt', 1, 1)];
		expect(sortDistricts(input).map(({ id }) => id)).toEqual(['a', 'z']);
		expect(input.map(({ id }) => id)).toEqual(['z', 'a']);
	});

	it('computes count, distance, minute, and rounded-hour totals', () => {
		const totals = districtTotals([
			district('a', 'Altstadt', 18, 317),
			district('b', 'Borgfelde', 6, 83),
		]);
		expect(totals).toEqual({
			count: 2,
			distanceKm: 24,
			durationMinutes: 400,
			durationHours: 7,
		});
	});

	it('returns null at the alphabetical navigation boundaries', () => {
		const districts = [
			district('c', 'C', 1, 1),
			district('a', 'A', 1, 1),
			district('b', 'B', 1, 1),
		];
		expect(districtNavigation(districts, 'a')).toMatchObject({
			previous: null,
			next: { id: 'b' },
		});
		expect(districtNavigation(districts, 'b')).toMatchObject({
			previous: { id: 'a' },
			next: { id: 'c' },
		});
		expect(districtNavigation(districts, 'c')).toMatchObject({
			previous: { id: 'b' },
			next: null,
		});
	});
});
