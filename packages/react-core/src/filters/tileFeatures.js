import { getGeometryToIntersect } from '../utils/geo';
import tileFeaturesGeometries from './tileFeaturesGeometries';
import tileFeaturesSpatialIndex from './tileFeaturesSpatialIndex';

export function tileFeatures({
  tiles,
  viewport,
  geometry,
  uniqueIdProperty,
  tileFormat,
  geoColumName,
  spatialIndex
}) {
  const geometryToIntersect = getGeometryToIntersect(viewport, geometry);

  if (!geometryToIntersect) {
    return [];
  }

  if (spatialIndex) {
    return tileFeaturesSpatialIndex({
      // TODO: Searching the error
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
    uniqueIdProperty
  });
}
