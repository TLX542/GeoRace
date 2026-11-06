import { distance, totalDistance } from '../src/features/runs/geo';
import type { Point } from '../src/shared/types';
test('measures roughly 111m for 0.001 degree at the equator', () => {
  expect(
    distance({ lat: 0, lng: 0, t: 0 }, { lat: 0, lng: 0.001, t: 1000 }),
  ).toBeCloseTo(111.195, 2);
});
test('does not count movement made while a run was paused', () => {
  const points: Point[] = [
    { lat: 0, lng: 0, t: 0, segment: 1 },
    { lat: 0, lng: 0.001, t: 1000, segment: 1 },
    { lat: 1, lng: 1, t: 2000, segment: 2 },
    { lat: 1, lng: 1.001, t: 3000, segment: 2 },
  ];
  expect(totalDistance(points)).toBeGreaterThan(222);
  expect(totalDistance(points)).toBeLessThan(223);
});
test('empty and single-point runs have no distance', () => {
  expect(totalDistance([])).toBe(0);
  expect(totalDistance([{ lat: 48, lng: 2, t: 0 }])).toBe(0);
});
