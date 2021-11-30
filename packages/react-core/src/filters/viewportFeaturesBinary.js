import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';
import { prepareViewport, isTileFullyVisible } from './viewportFeatures';

const GEOMETRY_TYPES = Object.freeze({
  Point: 0,
  LineString: 1,
  Polygon: 2
});

function addIntersectedFeaturesInTile({
  map,
  data,
  filterBuffer,
  viewportIntersection,
  type,
  uniqueIdProperty
}) {
  const indices = getIndices(data);
  const { positions } = data;

  for (let i = 0; i < indices.length - 1; i++) {
    if (filterBuffer !== undefined && filterBuffer.value[i] === 0) continue;

    const startIndex = indices[i];
    const endIndex = indices[i + 1];

    const tileProps = getPropertiesFromTile(data, startIndex);
    const uniquePropertyValue = getUniquePropertyValue(tileProps, uniqueIdProperty, map);

    if (uniquePropertyValue && !map.has(uniquePropertyValue)) {
      const ringCoordinates = getRingCoordinatesFor(startIndex, endIndex, positions);
      if (intersects(getFeatureByType(ringCoordinates, type), viewportIntersection)) {
        map.set(uniquePropertyValue, parseProperties(tileProps));
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
  const result = {
    properties: properties[featureId],
    numericProps: {}
  };

  for (const key in numericProps) {
    result.numericProps[key] = numericProps[key].value[startIndex];
  }

  return result;
}

function parseProperties(tileProps) {
  const { properties, numericProps } = tileProps;
  return Object.assign({}, properties, numericProps);
}

function getUniquePropertyValue(tileProps, uniqueIdProperty, map) {
  if (uniqueIdProperty) {
    return getValueFromTileProps(tileProps, uniqueIdProperty);
  }

  const artificialId = map.size + 1; // a counter, assumed as a valid new id
  return (
    getValueFromTileProps(tileProps, 'cartodb_id') ||
    getValueFromTileProps(tileProps, 'geoid') ||
    artificialId
  );
}

function getValueFromTileProps(tileProps, propertyName) {
  const { properties, numericProps } = tileProps;
  return numericProps[propertyName] || properties[propertyName];
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
  filterBuffer,
  data,
  type,
  uniqueIdProperty
}) {
  if (tileIsFullyVisible) {
    addAllFeaturesInTile({ map, data, filterBuffer, uniqueIdProperty });
  } else {
    addIntersectedFeaturesInTile({
      map,
      data,
      filterBuffer,
      viewportIntersection,
      type,
      uniqueIdProperty
    });
  }
}

function addAllFeaturesInTile({ map, data, filterBuffer, uniqueIdProperty }) {
  const indices = getIndices(data);

  for (let i = 0; i < indices.length - 1; i++) {
    if (filterBuffer !== undefined && filterBuffer.value[i] === 0) continue;

    const startIndex = indices[i];

    const tileProps = getPropertiesFromTile(data, startIndex);
    const uniquePropertyValue = getUniquePropertyValue(tileProps, uniqueIdProperty, map);

    if (uniquePropertyValue && !map.has(uniquePropertyValue)) {
      map.set(uniquePropertyValue, parseProperties(tileProps));
    }
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

export function viewportFeaturesBinary({ tiles, viewport, uniqueIdProperty }) {
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
      filterBuffer: tile.filterBuffer?.points,
      type: GEOMETRY_TYPES['Point'],
      uniqueIdProperty
    });
    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.lines,
      filterBuffer: tile.filterBuffer?.lines,
      type: GEOMETRY_TYPES['LineString'],
      uniqueIdProperty
    });
    calculateViewportFeatures({
      map,
      tileIsFullyVisible,
      viewportIntersection,
      data: tile.data.polygons,
      filterBuffer: tile.filterBuffer?.polygons,
      type: GEOMETRY_TYPES['Polygon'],
      uniqueIdProperty
    });
  }

  return Array.from(map.values());
}
