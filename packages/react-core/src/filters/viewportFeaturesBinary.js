import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';
import { prepareViewport, isTileFullyVisible } from './viewportFeatures';

const GEOMETRY_TYPES = Object.freeze({
  Point: 0,
  LineString: 1,
  Polygon: 2
});

function addIntersectedFeaturesInTile({ map, data, viewportIntersection, type }) {
  const indices = getIndices(data);
  const { positions } = data;

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];
    const featureId = getFeatureId(data, startIndex);

    if (!map.has(featureId)) {
      const ringCoordinates = getRingCoordinatesFor(startIndex, endIndex, positions);

      if (intersects(getFeatureByType(ringCoordinates, type), viewportIntersection)) {
        map.set(featureId, getPropertiesFromTile(data, startIndex));
      }
    }
  }
}

function getIndices(data) {
  const indices = data.primitivePolygonIndices || data.pathIndices || data.pointIndices;
  return indices.value;
}

function getFeatureId(data, startIndex) {
  return data.featureIds.value[startIndex];
}

function getPropertiesFromTile(data, startIndex) {
  const featureId = getFeatureId(data, startIndex);
  const { properties, numericProps } = data;
  const propertiesCloned = Object.assign(properties[featureId]);

  for (const key in numericProps) {
    propertiesCloned[key] = numericProps[key].value[startIndex];
  }

  return propertiesCloned;
}

function getFeatureByType(coordinates, type) {
  switch (type) {
    case GEOMETRY_TYPES['Polygon']:
      return { type: 'Polygon', coordinates: [coordinates] };
    case GEOMETRY_TYPES['LineString']:
      return { type: 'LineString', coordinates };
    case GEOMETRY_TYPES['Point']:
      return { type: 'Point', coordinates: coordinates[0] };
    default:
      throw new Error('Invalid geometry type');
  }
}

function getRingCoordinatesFor(startIndex, endIndex, positions) {
  const ringCoordinates = [];

  for (let j = startIndex; j < endIndex; j++) {
    ringCoordinates.push(
      Array.from(positions.value.subarray(j * positions.size, (j + 1) * positions.size))
    );
  }

  return ringCoordinates;
}

function calculateViewportFeatures({
  map,
  tileIsFullyVisible,
  viewportIntersection,
  data,
  type
}) {
  if (tileIsFullyVisible) {
    // All the features of the tile are visible
    const indices = getIndices(data);

    for (let i = 0; i < indices.length - 1; i++) {
      const startIndex = indices[i];
      const featureId = getFeatureId(data, startIndex);

      if (!map.has(featureId)) {
        map.set(featureId, getPropertiesFromTile(data, startIndex));
      }
    }
  } else {
    addIntersectedFeaturesInTile({ map, data, viewportIntersection, type });
  }
}

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

export function viewportFeatures({ tiles, viewport }) {
  const map = new Map();

  for (const tile of tiles) {
    // Discard if it's not a visible tile or tile has not data
    if (!tile.isVisible || !tile.data) {
      continue;
    }

    const { bbox } = tile;
    const tileIsFullyVisible = isTileFullyVisible(bbox, viewport);
    const viewportIntersection = bboxPolygon(prepareViewport(tile.bbox, viewport));

    createIndicesForPoints(tile.data.points);
    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.points,
      type: GEOMETRY_TYPES['Point']
    });
    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.lines,
      type: GEOMETRY_TYPES['LineString']
    });
    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.polygons,
      type: GEOMETRY_TYPES['Polygon']
    });
  }

  return Array.from(map.values());
}
