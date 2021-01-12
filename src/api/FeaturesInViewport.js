import bboxPolygon from "@turf/bbox-polygon";
import intersects from "@turf/boolean-intersects";

const GEOMETRY_TYPES = Object.freeze([
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon'
]);

export function featuresInViewport(features, viewport) {
  const viewportBbox = bboxPolygon(viewport.getBounds());

  return features.filter(feat => {
    if (GEOMETRY_TYPES.includes(feat.geometry.type)) {
      return intersects(feat, viewportBbox);
    }
    
    return false;
  });
}
