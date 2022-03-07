import intersect from '@turf/intersect';

export function flatGeometries(...geometries) {
  const validGeometries = geometries.filter(Boolean);
  return validGeometries.length === 2
    ? intersect(geometries[0], geometries[1])
    : geometries[0];
}

export const GEOMETRY_TYPES = Object.freeze({
  Point: 0,
  LineString: 1,
  Polygon: 2
});

export function buildGeoJson(coordinates, type) {
  switch (type) {
    case GEOMETRY_TYPES['Polygon']:
      return { type: 'Polygon', coordinates: [coordinates] };
    case GEOMETRY_TYPES['LineString']:
      return { type: 'LineString', coordinates };
    case GEOMETRY_TYPES['Point']:
      return { type: 'Point', coordinates: coordinates[0] };
    default:
      throw new Error('Invalid geometry type');
  }
}
