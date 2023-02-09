import bboxPolygon from '@turf/bbox-polygon';
import intersect from '@turf/intersect';
import tileFeaturesGeometries from './tileFeaturesGeometries';
import tileFeaturesSpatialIndex from './tileFeaturesSpatialIndex';

export function getGeometryToIntersect(viewport, geometry) {
  return geometry ? intersect(bboxPolygon(viewport), geometry) : bboxPolygon(viewport);
}

export function tileFeatures({
  tiles,
  viewport,
  geometry,
  uniqueIdProperty,
  tileFormat,
  geoColumName,
  spatialIndex,
  resultFormat
}) {
  const geometryToIntersect = getGeometryToIntersect(viewport, geometry);

  if (!geometryToIntersect) {
    return [];
  }

  if (spatialIndex) {
    return tileFeaturesSpatialIndex({
      tiles,
      geometryToIntersect,
      geoColumName,
      spatialIndex
    });
  }
  return tileFeaturesGeometries({
    tiles,
    tileFormat,
    geometryToIntersect,
    uniqueIdProperty,
    resultFormat
  });
}
