import type { Point } from '../../shared/types';
export function distance(a: Point, b: Point) {
  const rad = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * rad) / 2) ** 2 +
    Math.cos(a.lat * rad) *
      Math.cos(b.lat * rad) *
      Math.sin(((b.lng - a.lng) * rad) / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}
export function totalDistance(points: Point[]) {
  return points.reduce(
    (sum, p, i) =>
      sum +
      (i && p.segment === points[i - 1].segment
        ? distance(points[i - 1], p)
        : 0),
    0,
  );
}
