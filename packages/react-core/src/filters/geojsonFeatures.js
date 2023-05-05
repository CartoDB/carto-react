import intersects from '@turf/boolean-intersects';

export function geojsonFeatures({ geojson, geometryToIntersect, uniqueIdProperty }) {
  let uniqueIdx = 0;
  // Map is used to cache multi geometries. Only a sucessfull intersect by multipolygon
  const map = new Map();

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
