import turfIntersects from '@turf/boolean-intersects';
import {
  buildGeoJson,
  GEOMETRY_TYPES,
  getRingCoordinatesFor,
  getUniqueIdPropertyValue
} from '../utils/binaryDataUtils';

export function applySpatialFilterToPoints(
  currentPointsData,
  maskGeometry,
  { uniqueIdProperty, analysedPointsFeatures = new Map() }
) {
  return currentPointsData.featureIds.value.map((featureIdx) => {
    const uniqueIdValue = getUniqueIdPropertyValue(
      currentPointsData,
      featureIdx,
      uniqueIdProperty
    );

    if (analysedPointsFeatures.has(uniqueIdValue)) {
      return analysedPointsFeatures.get(uniqueIdValue);
    }

    const doesIntersects = turfIntersects(
      buildGeoJson(
        [currentPointsData.positions.value.subarray(featureIdx * 2, featureIdx * 2 + 2)],
        GEOMETRY_TYPES['Point']
      ),
      maskGeometry
    );

    analysedPointsFeatures.set(uniqueIdValue, doesIntersects);

    return doesIntersects;
  });
}

const NULL_VALUE = 2;

export function applySpatialFilterToLines(
  currentLinesData,
  filteringGeometry,
  { uniqueIdProperty, analysedLinesFeatures = new Map() }
) {
  const res = new Uint16Array(currentLinesData.properties.length).fill(NULL_VALUE);

  const featureIdsIn = new Set();

  let idx = 0;
  for (let currentLine of currentLinesData.pathIndices.value.slice(0, -1)) {
    const featureId = currentLinesData.featureIds.value[currentLine];
    const uniqueIdValue = getUniqueIdPropertyValue(
      currentLinesData,
      currentLine,
      uniqueIdProperty
    );
    if (res[featureId] !== NULL_VALUE) {
      idx++;
      if (res[featureId] === 1) {
        featureIdsIn.add(featureId);
        analysedLinesFeatures.set(uniqueIdValue, true);
      }
      continue;
    }

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // analysedPolygonsFeatures.get(uniqueId) --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || analysedLinesFeatures.has(uniqueIdValue);
    if (!doesIntersects) {
      const nextLine = currentLinesData.pathIndices.value[idx + 1];
      const doesIntersects = turfIntersects(
        buildGeoJson(
          getRingCoordinatesFor(
            currentLine * 2,
            nextLine * 2,
            currentLinesData.positions
          ),
          GEOMETRY_TYPES['LineString']
        ),
        filteringGeometry
      );

      if (doesIntersects) {
        featureIdsIn.add(featureId);
        analysedLinesFeatures.set(uniqueIdValue, doesIntersects);
      }
    }

    analysedLinesFeatures.set(uniqueIdValue, doesIntersects);

    res[featureId] = doesIntersects;

    idx++;
  }

  return currentLinesData.featureIds.value.map((id) => res[id] === 1);
}

export function applySpatialFilterToPolygons(
  currentPolygonsData,
  filteringGeometry,
  { uniqueIdProperty, analysedPolygonsFeatures = new Map() }
) {
  const res = new Uint16Array(currentPolygonsData.properties.length).fill(NULL_VALUE);

  const featureIdsIn = new Set();

  let idx = 0;
  for (let currentLine of currentPolygonsData.primitivePolygonIndices.value.slice(
    0,
    -1
  )) {
    const featureId = currentPolygonsData.featureIds.value[currentLine];
    const uniqueIdValue = getUniqueIdPropertyValue(
      currentPolygonsData,
      currentLine,
      uniqueIdProperty
    );
    if (res[featureId] !== NULL_VALUE) {
      idx++;
      if (res[featureId] === 1) {
        featureIdsIn.add(featureId);
        analysedPolygonsFeatures.set(uniqueIdValue, true);
      }
      continue;
    }

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // analysedPolygonsFeatures.get(uniqueId) --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || analysedPolygonsFeatures.has(uniqueIdValue);
    if (!doesIntersects) {
      const nextLine = currentPolygonsData.primitivePolygonIndices.value[idx + 1];
      doesIntersects = turfIntersects(
        buildGeoJson(
          getRingCoordinatesFor(
            currentLine * 2,
            nextLine * 2,
            currentPolygonsData.positions
          ),
          GEOMETRY_TYPES['Polygon']
        ),
        filteringGeometry
      );

      if (doesIntersects) {
        featureIdsIn.add(featureId);
        analysedPolygonsFeatures.set(uniqueIdValue, doesIntersects);
      }
    }

    res[featureId] = doesIntersects;

    idx++;
  }

  return currentPolygonsData.featureIds.value.map((id) => res[id] === 1);
}
