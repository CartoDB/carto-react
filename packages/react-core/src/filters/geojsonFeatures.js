import intersects from '@turf/boolean-intersects';
import bboxPolygon from '@turf/bbox-polygon';
import { flatGeometries } from '../utils/geometryUtils';

export function geojsonFeatures({ geojson, viewport, geometry, uniqueIdProperty }) {
  let uniqueIdx = 0;
  // Map is used to cache multi geometries. Only a sucessfull intersect by multipolygon
  const map = new Map();

  const viewportPolygon = viewport && bboxPolygon(viewport);

  const geometryToIntersect = flatGeometries(viewportPolygon, geometry);

  if (!geometryToIntersect) {
    return [];
  }

  for (const feature of geojson.features) {
    const uniqueId = uniqueIdProperty
      ? feature.properties[uniqueIdProperty]
      : ++uniqueIdx;
    if (!map.has(uniqueId) && intersects(geometryToIntersect, feature.geometry)) {
      map.set(uniqueId, feature.properties);
    }
  }

  return map.values();
}
