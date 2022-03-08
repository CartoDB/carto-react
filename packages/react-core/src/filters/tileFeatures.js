import bboxPolygon from '@turf/bbox-polygon';
import booleanWithin from '@turf/boolean-within';
import intersect from '@turf/intersect';
import { buildGeoJson, flatGeometries, GEOMETRY_TYPES } from '../utils/geometryUtils';
import { TILE_FORMATS } from '@deck.gl/carto';
import { geojsonFeatures } from './geojsonFeatures';
import transformToTileCoords from '../utils/transformToTileCoords';

let map;

export function tileFeatures({ tiles, uniqueIdProperty }) {
  map = new Map();

  for (let tile of tiles) {
    // Discard if it's not a visible tile (only check false value, not undefined) or tile has not data
    if (tile.isVisible === false || !tile.data) continue;

    const processedFeatures = [];

    if (hasData(tile.data.points)) {
      createIndicesForPoints(tile.data.points);

      Array.prototype.push.apply(
        processedFeatures,
        processTileFeatures({
          data: tile.data.points,
          uniqueIdProperty,
          geometryType: GEOMETRY_TYPES['Point']
        })
      );
    }

    if (hasData(tile.data.lines)) {
      Array.prototype.push.apply(
        processedFeatures,
        processTileFeatures({
          data: tile.data.lines,
          uniqueIdProperty,
          geometryType: GEOMETRY_TYPES['LineString']
        })
      );
    }

    if (hasData(tile.data.polygons)) {
      Array.prototype.push.apply(
        processedFeatures,
        processTileFeatures({
          data: tile.data.polygons,
          uniqueIdProperty,
          geometryType: GEOMETRY_TYPES['Polygon']
        })
      );
    }

    tile.data = processedFeatures;
  }

  return tiles;
}

export function filterProcessedTilesSpatially({ tiles, viewport, geometry, tileFormat }) {
  const viewportPolygon = bboxPolygon(viewport);
  const geometryToIntersect = flatGeometries(viewportPolygon, geometry);
  const currentFeatures = [];

  for (let tile of tiles) {
    const { bbox } = tile;
    const bboxAsGeom = bboxPolygon([bbox.west, bbox.south, bbox.east, bbox.north]);
    const tileIsFullyVisible = booleanWithin(bboxAsGeom, geometryToIntersect);

    let foundFeatures = [];
    if (tileIsFullyVisible) {
      for (let feature of tile.data) currentFeatures.push(feature.properties);
    } else {
      // Clip the geometry to intersect with the tile
      const clippedGeometryToIntersect = intersect(bboxAsGeom, geometryToIntersect);

      if (!clippedGeometryToIntersect) {
        continue;
      }

      // We assume that MVT tileFormat uses local coordinates so we transform the geometry to intersect to tile coordinates [0..1],
      // while in the case of 'geojson' or binary, the geometries are already in WGS84
      const transformedGeometryToIntersect =
        tileFormat === TILE_FORMATS.MVT
          ? transformToTileCoords(clippedGeometryToIntersect.geometry, bbox)
          : clippedGeometryToIntersect.geometry;

      foundFeatures = geojsonFeatures({
        geojson: { features: tile.data },
        geometry: transformedGeometryToIntersect
      });

      Array.prototype.push.apply(currentFeatures, foundFeatures);
    }
  }

  return currentFeatures;
}

function processTileFeatures({ data, geometryType, uniqueIdProperty }) {
  const indices = getIndices(data);

  const processedFeatures = [];

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];

    const uniqueIdPropertyValue =
      getUniqueIdPropertyValue(data, startIndex, uniqueIdProperty) ?? map.size + 1; // a counter, assumed as a valid new id

    if (!map.has(uniqueIdPropertyValue)) {
      map.set(uniqueIdPropertyValue, null);

      const feature = {};
      Object.defineProperty(feature, 'geometry', {
        get: () => {
          if (!feature._geometry) {
            feature._geometry = buildGeoJson(
              getRingCoordinatesFor(startIndex, endIndex, data.positions),
              geometryType
            );
          }
          return feature._geometry;
        }
      });
      Object.defineProperty(feature, 'properties', {
        get: () => {
          if (!feature._properties) {
            feature._properties = getFeatureProperties(data, startIndex);
          }
          return feature._properties;
        }
      });
      processedFeatures.push(feature);
    }
  }

  return processedFeatures;
}

// Aux
function hasData(data) {
  return !!data?.properties.length;
}

function getIndices(data) {
  // Polygon | Lines | Points
  return (data.primitivePolygonIndices || data.pathIndices || data.pointIndices).value;
}

// Due to we use the same code for lines, polygons and points
// We have to normalise points indices because it differs from others indices
function createIndicesForPoints(data) {
  const featureIds = data.featureIds.value;
  const lastFeatureId = featureIds[featureIds.length - 1];

  data.pointIndices = {
    value: new featureIds.constructor(featureIds.length + 1),
    size: 1
  };
  data.pointIndices.value.set(featureIds);
  data.pointIndices.value.set([lastFeatureId + 1], featureIds.length);
}

function getFeatureProperties(data, featureIdIdx) {
  const featureId = data.featureIds.value[featureIdIdx];
  const properties = Object.assign({}, data.properties[featureId]);

  for (const key in data.numericProps) {
    properties[key] = data.numericProps[key].value[featureIdIdx];
  }

  return properties;
}

function getUniqueIdPropertyValue(tileContent, featureIdIdx, uniqueIdProperty) {
  const featureId = tileContent.featureIds.value[featureIdIdx];

  if (uniqueIdProperty) {
    return getPropertyValue(tileContent, featureId, featureIdIdx, uniqueIdProperty);
  }

  return (
    getPropertyValue(tileContent, featureId, featureIdIdx, 'geoid') ||
    getPropertyValue(tileContent, featureId, featureIdIdx, 'cartodb_id')
  );
}

function getPropertyValue(tileContent, featureId, featureIdIdx, uniqueIdProperty) {
  return (
    tileContent.numericProps[uniqueIdProperty]?.value[featureIdIdx] || // uniqueIdProperty can be a number
    tileContent.properties[featureId][uniqueIdProperty] // or a string
  );
}

function getRingCoordinatesFor(startIndex, endIndex, positions) {
  const ringCoordinates = Array(endIndex - startIndex);

  for (let j = startIndex; j < endIndex; j++) {
    ringCoordinates[j - startIndex] = positions.value.subarray(
      j * positions.size,
      (j + 1) * positions.size
    );
  }

  return ringCoordinates;
}
