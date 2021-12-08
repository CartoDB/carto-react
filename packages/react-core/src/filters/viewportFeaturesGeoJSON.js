import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';

export function viewportFeaturesGeoJSON({
  geojson,
  viewport,
  spatialFilterGeometry,
  uniqueIdProperty
}) {
  let uniqueIdx = 0;
  // Map is used to cache multi geometries. Only a sucessfull intersect by multipolygon
  const map = new Map();
  const bbox = bboxPolygon(viewport);

  for (const feature of geojson.features) {
    const uniqueId = uniqueIdProperty
      ? feature.properties[uniqueIdProperty]
      : ++uniqueIdx;
    if (
      !map.has(uniqueId) &&
      intersects(bbox, feature) &&
      (!spatialFilterGeometry || intersects(feature, spatialFilterGeometry))
    ) {
      map.set(uniqueId, feature.properties);
    }
  }

  return Array.from(map.values());
}
