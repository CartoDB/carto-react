import { TILE_FORMATS } from '@deck.gl/carto/typed';
import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';
import booleanWithin from '@turf/boolean-within';
import intersect from '@turf/intersect';
import transformToTileCoords from '../utils/transformToTileCoords';

const GEOMETRY_TYPES = Object.freeze({
  Point: 0,
  LineString: 1,
  Polygon: 2
});

function addIntersectedFeaturesInTile({
  map,
  data,
  geometryIntersection,
  type,
  uniqueIdProperty
}) {
  const indices = getIndices(data);
  const { positions } = data;

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];

    const tileProps = getPropertiesFromTile(data, startIndex);
    const uniquePropertyValue = getUniquePropertyValue(tileProps, uniqueIdProperty, map);

    if (uniquePropertyValue && !map.has(uniquePropertyValue)) {
      const ringCoordinates = getRingCoordinatesFor(startIndex, endIndex, positions);
      if (intersects(getFeatureByType(ringCoordinates, type), geometryIntersection)) {
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
  const { properties, numericProps, fields } = data;
  const result = {
    uniqueId: fields?.[featureId]?.id,
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

  if (tileProps.uniqueId) {
    return tileProps.uniqueId;
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

function calculateFeatures({
  map,
  tileIsFullyVisible,
  geometryIntersection,
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
      geometryIntersection,
      type,
      uniqueIdProperty
    });
  }
}

function addAllFeaturesInTile({ map, data, uniqueIdProperty }) {
  const indices = getIndices(data);

  for (let i = 0; i < indices.length - 1; i++) {
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

export function getGeometryToIntersect(viewport, geometry) {
  return geometry ? intersect(bboxPolygon(viewport), geometry) : bboxPolygon(viewport);
}

export default function tileFeaturesGeometries({
  tiles,
  tileFormat,
  geometryToIntersect,
  uniqueIdProperty
}) {
  const map = new Map();

  for (const tile of tiles) {
    // Discard if it's not a visible tile (only check false value, not undefined)
    // or tile has not data
    if (tile.isVisible === false || !tile.data) {
      continue;
    }

    const { bbox } = tile;
    const bboxToGeom = bboxPolygon([bbox.west, bbox.south, bbox.east, bbox.north]);
    const tileIsFullyVisible = booleanWithin(bboxToGeom, geometryToIntersect);
    // Clip the geometry to intersect with the tile
    const clippedGeometryToIntersect = intersect(bboxToGeom, geometryToIntersect);

    if (!clippedGeometryToIntersect) {
      continue;
    }
    // We assume that MVT tileFormat uses local coordinates so we transform the geometry to intersect to tile coordinates [0..1],
    // while in the case of 'geojson' or binary, the geometries are already in WGS84
    const transformedGeomtryToIntersect = {
      type: 'Feature',
      geometry:
        tileFormat === TILE_FORMATS.MVT
          ? transformToTileCoords(clippedGeometryToIntersect.geometry, bbox)
          : clippedGeometryToIntersect.geometry
    };

    createIndicesForPoints(tile.data.points);

    calculateFeatures({
      map,
      tileIsFullyVisible,
      geometryIntersection: transformedGeomtryToIntersect,
      data: tile.data.points,
      type: GEOMETRY_TYPES['Point'],
      uniqueIdProperty
    });
    calculateFeatures({
      map,
      tileIsFullyVisible,
      geometryIntersection: transformedGeomtryToIntersect,
      data: tile.data.lines,
      type: GEOMETRY_TYPES['LineString'],
      uniqueIdProperty
    });
    calculateFeatures({
      map,
      tileIsFullyVisible,
      geometryIntersection: transformedGeomtryToIntersect,
      data: tile.data.polygons,
      type: GEOMETRY_TYPES['Polygon'],
      uniqueIdProperty
    });
  }
  return Array.from(map.values());
}
