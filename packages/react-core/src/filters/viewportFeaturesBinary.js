import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';
import {
  buildGeoJson,
  GEOMETRY_TYPES,
  getRingCoordinatesFor,
  getUniqueIdPropertyValue
} from '../utils/binaryDataUtils';
import { prepareViewport, isTileFullyVisible } from './viewportFeatures';

function addIntersectedFeaturesInTile({
  map,
  data,
  viewportIntersection,
  type,
  uniqueIdProperty
}) {
  const indices = getIndices(data);

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];

    const uniqueIdPropertyValue = getUniqueIdPropertyValueWrapper(
      data,
      startIndex,
      uniqueIdProperty,
      map
    );

    if (uniqueIdPropertyValue && !map.has(uniqueIdPropertyValue)) {
      const ringCoordinates = getRingCoordinatesFor(startIndex, endIndex, data.positions);
      if (intersects(buildGeoJson(ringCoordinates, type), viewportIntersection)) {
        map.set(uniqueIdPropertyValue, getFeatureProperties(data, startIndex));
      }
    }
  }
}

function addAllFeaturesInTile({ map, data, uniqueIdProperty }) {
  const indices = getIndices(data);

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];

    const uniqueIdPropertyValue = getUniqueIdPropertyValueWrapper(
      data,
      startIndex,
      uniqueIdProperty,
      map
    );

    if (uniqueIdPropertyValue && !map.has(uniqueIdPropertyValue)) {
      map.set(uniqueIdPropertyValue, getFeatureProperties(data, startIndex));
    }
  }
}

function calculateViewportFeatures({
  map,
  tileIsFullyVisible,
  viewportIntersection,
  data,
  type,
  uniqueIdProperty
}) {
  if (!data?.properties.length) {
    return;
  }

  if (tileIsFullyVisible) {
    addAllFeaturesInTile({ map, data, uniqueIdProperty });
  } else {
    addIntersectedFeaturesInTile({
      map,
      data,
      viewportIntersection,
      type,
      uniqueIdProperty
    });
  }
}

export function viewportFeaturesBinary({ tiles, viewport, uniqueIdProperty }) {
  const map = new Map();

  for (const tile of tiles) {
    // Discard if it's not a visible tile (only check false value, not undefined)
    // or tile has not data
    if (tile.isVisible === false || !tile.data) {
      continue;
    }

    const tileIsFullyVisible = isTileFullyVisible(tile.bbox, viewport);
    const viewportIntersection = bboxPolygon(prepareViewport(tile.bbox, viewport));

    // We might already have it from old analyses due to reference update
    if (!tile.data.points.pointIndices) {
      createIndicesForPoints(tile.data.points);
    }

    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.points,
      type: GEOMETRY_TYPES['Point'],
      uniqueIdProperty
    });
    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.lines,
      type: GEOMETRY_TYPES['LineString'],
      uniqueIdProperty
    });
    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.polygons,
      type: GEOMETRY_TYPES['Polygon'],
      uniqueIdProperty
    });
  }

  return Array.from(map.values());
}

// Aux
function getIndices(data) {
  // Polygon | Lines | Points
  return (data.primitivePolygonIndices || data.pathIndices || data.pointIndices).value;
}

// Due to we use the same code for lines, polygons and points
// We have to normalise points indices because it differs from others indices
function createIndicesForPoints(data) {
  const featureIdsArray = data.featureIds.value;

  data.pointIndices = {
    value: featureIdsArray.constructor.of(...featureIdsArray, featureIdsArray.length + 1),
    size: 1
  };
}

function getUniqueIdPropertyValueWrapper(data, featureIdIdx, uniqueIdProperty, map) {
  return (
    getUniqueIdPropertyValue(data, featureIdIdx, uniqueIdProperty) || map.size + 1 // a counter, assumed as a valid new id
  );
}

function getFeatureProperties(data, featureIdIdx) {
  const featureId = data.featureIds.value[featureIdIdx];
  const properties = Object.assign({}, data.properties[featureId]);

  for (const key in data.numericProps) {
    properties[key] = data.numericProps[key].value[featureIdIdx];
  }

  return properties;
}
