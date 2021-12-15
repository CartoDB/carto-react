import turfIntersects from '@turf/boolean-intersects';

export function applySpatialFilterToPoints(
  currentPointsData,
  maskGeometry,
  { uniqueIdProperty, analysedPointsFeatures = new Map() }
) {
  return currentPointsData.featureIds.value.map((featureIdx) => {
    const uniqueId = getUniqueId(currentPointsData, featureIdx, uniqueIdProperty);

    if (analysedPointsFeatures.has(uniqueId)) {
      return analysedPointsFeatures.get(uniqueId);
    }

    const doesIntersects = turfIntersects(
      {
        type: 'Point',
        coordinates: currentPointsData.positions.value.subarray(
          featureIdx * 2,
          featureIdx * 2 + 2
        )
      },
      maskGeometry
    );

    analysedPointsFeatures.set(uniqueId, doesIntersects);

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
    const uniqueId = getUniqueId(currentLinesData, currentLine, uniqueIdProperty);
    if (res[featureId] !== NULL_VALUE) {
      idx++;
      if (res[featureId] === 1) {
        featureIdsIn.add(featureId);
        analysedLinesFeatures.set(uniqueId, true);
      }
      continue;
    }

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // analysedPolygonsFeatures.get(uniqueId) --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || analysedLinesFeatures.has(uniqueId);
    if (!doesIntersects) {
      const nextLine = currentLinesData.pathIndices.value[idx + 1];
      const doesIntersects = turfIntersects(
        {
          type: 'LineString',
          coordinates: convertCoordinates(
            currentLinesData.positions.value.subarray(currentLine * 2, nextLine * 2)
          )
        },
        filteringGeometry
      );

      if (doesIntersects) {
        featureIdsIn.add(featureId);
        analysedLinesFeatures.set(uniqueId, doesIntersects);
      }
    }

    analysedLinesFeatures.set(uniqueId, doesIntersects);

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
    const uniqueId = getUniqueId(currentPolygonsData, currentLine, uniqueIdProperty);
    if (res[featureId] !== NULL_VALUE) {
      idx++;
      if (res[featureId] === 1) {
        featureIdsIn.add(featureId);
        analysedPolygonsFeatures.set(uniqueId, true);
      }
      continue;
    }

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // analysedPolygonsFeatures.get(uniqueId) --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || analysedPolygonsFeatures.has(uniqueId);
    if (!doesIntersects) {
      const nextLine = currentPolygonsData.primitivePolygonIndices.value[idx + 1];
      doesIntersects = turfIntersects(
        {
          type: 'Polygon',
          coordinates: [
            convertCoordinates(
              currentPolygonsData.positions.value.subarray(currentLine * 2, nextLine * 2)
            )
          ]
        },
        filteringGeometry
      );

      if (doesIntersects) {
        featureIdsIn.add(featureId);
        analysedPolygonsFeatures.set(uniqueId, doesIntersects);
      }
    }

    res[featureId] = doesIntersects;

    idx++;
  }

  return currentPolygonsData.featureIds.value.map((id) => res[id] === 1);
}

// Aux
function getUniqueId(data, featureIdx, uniqueIdProperty) {
  return (
    data.numericProps[uniqueIdProperty]?.value[featureIdx] || // uniqueId can be a number
    data.properties[featureIdx][uniqueIdProperty] // or a string
  );
}

function convertCoordinates(originalCoordinates) {
  const cp = [...originalCoordinates];
  const newArr = [];
  while (cp.length) newArr.push(cp.splice(0, 2));

  return newArr;
}
