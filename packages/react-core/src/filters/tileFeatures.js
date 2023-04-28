import bboxPolygon from '@turf/bbox-polygon';
import tileFeaturesGeometries from './tileFeaturesGeometries';
import tileFeaturesSpatialIndex from './tileFeaturesSpatialIndex';

/**
 * Select the geometry to use for widget calculation and data filtering.
 * If a spatial filter (mask) is set, use the mask otherwise use the current viewport.
 * Since it's possible that no mask and no viewport is set, return null in this case.
 *
 * @typedef { import('geojson').Polygon | import('geojson').MultiPolygon } Geometry
 * @typedef { import('geojson').Feature<Geometry> } Feature
 * @typedef { import('geojson').BBox } BBox
 *
 * @param { BBox? } viewport viewport [minX, minY, maxX, maxY], if any
 * @param { Feature? } spatialFilter the active spatial filter (mask), if any
 * @returns { Geometry? } the geometry to use for filtering
 */
export function getGeometryToIntersect(viewport, spatialFilter) {
  return spatialFilter
    ? spatialFilter.geometry
    : Array.isArray(viewport) && viewport.length === 4
    ? bboxPolygon(viewport).geometry
    : null;
}

export function tileFeatures({
  tiles,
  geometryToIntersect,
  uniqueIdProperty,
  tileFormat,
  geoColumName,
  spatialIndex
}) {
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
    uniqueIdProperty
  });
}
