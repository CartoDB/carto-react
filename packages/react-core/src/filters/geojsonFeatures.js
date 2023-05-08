import intersects from '@turf/boolean-intersects';
import { getGeometryToIntersect } from './tileFeatures';

export function geojsonFeatures({ geojson, viewport, geometry, uniqueIdProperty }) {
  let uniqueIdx = 0;
  // Map is used to cache multi geometries. Only a sucessfull intersect by multipolygon
  const map = new Map();
  const geometryToIntersect = getGeometryToIntersect(viewport, geometry);

  if (!geometryToIntersect) {
    return [];
  }

  for (const feature of geojson.features) {
    const uniqueId = uniqueIdProperty
      ? feature.properties[uniqueIdProperty]
      : ++uniqueIdx;
    if (!map.has(uniqueId) && intersects(geometryToIntersect, feature)) {
      map.set(uniqueId, feature.properties);
    }
  }

  return Array.from(map.values());
}
