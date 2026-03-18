// routing.openstreetmap.de/routed-foot runs a pedestrian OSRM extract -
// unlike the router.project-osrm.org demo which only supports car routing.
const OSRM_FOOT_BASE = 'https://routing.openstreetmap.de/routed-foot';
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Fetches a pedestrian road-following route between waypoints using the
 * OSRM foot-routing server (no API key required).
 *
 * Returns an array of {lat, lng} points snapped to actual roads,
 * or null if the network request fails or times out.
 *
 * @param {Array<{lat: number, lng: number}>} waypoints - ordered list of waypoints
 * @returns {Promise<Array<{lat: number, lng: number}>|null>}
 */
export async function fetchRoutePoints(waypoints) {
  if (!waypoints || waypoints.length < 2) return null;

  const coords = waypoints.map((wp) => `${wp.lng},${wp.lat}`).join(';');
  const url = `${OSRM_FOOT_BASE}/route/v1/foot/${coords}?overview=full&geometries=geojson`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.[0]?.geometry?.coordinates) return null;

    // GeoJSON coordinates are [lng, lat] - convert to {lat, lng}
    return data.routes[0].geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
  } catch {
    return null;
  }
}
