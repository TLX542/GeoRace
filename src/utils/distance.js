const R = 6378137;

export function toRad(value) {
  return (value * Math.PI) / 180;
}

export function distanceMeters(a, b) {
  if (!a || !b) return 0;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sin1 = Math.sin(dLat / 2);
  const sin2 = Math.sin(dLon / 2);
  const h = sin1 * sin1 + Math.cos(lat1) * Math.cos(lat2) * sin2 * sin2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function offsetLatLng(origin, dxMeters, dyMeters) {
  const dLat = (dyMeters / R) * (180 / Math.PI);
  const dLng = (dxMeters / (R * Math.cos(toRad(origin.lat)))) * (180 / Math.PI);
  return {
    lat: origin.lat + dLat,
    lng: origin.lng + dLng,
  };
}
