import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline } from 'react-native-svg';
import type { Point } from '../../shared/types';
import { colors, s } from '../../shared/ui';
export function RouteTrace({ points }: { points: Point[] }) {
  const valid = points.filter(
    p =>
      !!p &&
      Number.isFinite(p.lat) &&
      Number.isFinite(p.lng) &&
      Math.abs(p.lat) <= 90 &&
      Math.abs(p.lng) <= 180,
  );
  const lngs = valid.map(p => p.lng),
    lats = valid.map(p => p.lat);
  const minX = Math.min(...lngs),
    maxX = Math.max(...lngs),
    minY = Math.min(...lats),
    maxY = Math.max(...lats);
  const cos = Math.cos(((valid[0]?.lat || 0) * Math.PI) / 180);
  const span = Math.max((maxX - minX) * cos, maxY - minY, 0.0001);
  const project = (p: Point) => [
    30 + (((p.lng - minX) * cos) / span) * 240,
    210 - ((p.lat - minY) / span) * 180,
  ];
  const groups: Point[][] = [];
  valid.forEach((p, i) => {
    if (!i || p.segment !== valid[i - 1].segment) {
      groups.push([]);
    }
    groups[groups.length - 1].push(p);
  });
  const last = valid.length ? project(valid[valid.length - 1]) : null;
  return (
    <View style={s.card}>
      <Text style={s.eyebrow}>TRACE GPS</Text>
      <Svg height={210} width="100%" viewBox="0 0 300 240">
        {[60, 120, 180, 240].map(x => (
          <Line key={x} x1={x} y1={0} x2={x} y2={240} stroke={colors.line} />
        ))}
        {[60, 120, 180].map(y => (
          <Line key={y} x1={0} y1={y} x2={300} y2={y} stroke={colors.line} />
        ))}
        {groups.map((group, i) => (
          <Polyline
            key={i}
            points={group.map(p => project(p).join(',')).join(' ')}
            fill="none"
            stroke={colors.accent}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {last && (
          <Circle cx={last[0]} cy={last[1]} r={6} fill={colors.accent} />
        )}
      </Svg>
      <Text style={s.muted}>
        {valid.length
          ? valid.length +
            ' positions enregistrées · tracé relatif, sans fond de carte'
          : 'Le parcours apparaîtra dès la réception du GPS.'}
      </Text>
    </View>
  );
}
