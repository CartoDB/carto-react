export function getUniqueIdPropertyValue(tileContent, featureIdIdx, uniqueIdProperty) {
  const featureId = tileContent.featureIds.value[featureIdIdx];

  if (uniqueIdProperty) {
    return getPropertyValue(tileContent, featureId, featureIdIdx, uniqueIdProperty);
  }

  return (
    getPropertyValue(tileContent, featureId, featureIdIdx, 'cartodb_id') ||
    getPropertyValue(tileContent, featureId, featureIdIdx, 'geoid')
  );
}

export function getPropertyValue(tileContent, featureId, featureIdIdx, uniqueIdProperty) {
  return (
    tileContent.numericProps[uniqueIdProperty]?.value[featureIdIdx] || // uniqueIdProperty can be a number
    tileContent.properties[featureId][uniqueIdProperty] // or a string
  );
}

export function getRingCoordinatesFor(startIndex, endIndex, positions) {
  const ringCoordinates = [];

  for (let j = startIndex; j < endIndex; j++) {
    ringCoordinates.push(
      Array.from(positions.value.subarray(j * positions.size, (j + 1) * positions.size))
    );
  }

  return ringCoordinates;
}

export const GEOMETRY_TYPES = Object.freeze({
  Point: 0,
  LineString: 1,
  Polygon: 2
});

export function buildGeoJson(coordinates, type) {
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
