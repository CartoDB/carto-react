import { buildGeoJson, GEOMETRY_TYPES } from '../utils/geometryUtils';

export function processTiles({ tiles, uniqueIdProperty }) {
  const map = new Map();

  for (let tile of tiles) {
    // Discard if it's not a visible tile (only check false value, not undefined) or tile has not data
    if (tile.isVisible === false || !tile.data) continue;

    let processedFeatures = [];

    if (hasData(tile.data.points)) {
      if (!tile.data.pointIndices) createIndicesForPoints(tile.data.points);

      processedFeatures = processedFeatures.concat(
        processTileFeatures({
          map,
          data: tile.data.points,
          type: GEOMETRY_TYPES['Point'],
          uniqueIdProperty
        })
      );
    }

    if (hasData(tile.data.lines)) {
      processedFeatures = processedFeatures.concat(
        processTileFeatures({
          map,
          data: tile.data.lines,
          type: GEOMETRY_TYPES['LineString'],
          uniqueIdProperty
        })
      );
    }

    if (hasData(tile.data.polygons)) {
      processedFeatures = processedFeatures.concat(
        processTileFeatures({
          map,
          data: tile.data.polygons,
          type: GEOMETRY_TYPES['Polygon'],
          uniqueIdProperty
        })
      );
    }

    tile.data = processedFeatures;
  }

  return tiles;
}

function processTileFeatures({ map, data, type, uniqueIdProperty }) {
  const indices = getIndices(data);

  const processedFeatures = [];

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];

    const uniqueIdPropertyValue =
      getUniqueIdPropertyValue(data, startIndex, uniqueIdProperty) ?? map.size + 1; // a counter, assumed as a valid new id

    if (uniqueIdPropertyValue && !map.has(uniqueIdPropertyValue)) {
      map.set(uniqueIdPropertyValue, null);
      const feature = {};
      Object.defineProperty(feature, 'geometry', {
        get: () => {
          if (!feature._geometry) {
            feature._geometry = buildGeoJson(
              getRingCoordinatesFor(startIndex, endIndex, data.positions),
              type
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
    getPropertyValue(tileContent, featureId, featureIdIdx, 'cartodb_id') ||
    getPropertyValue(tileContent, featureId, featureIdIdx, 'geoid')
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
