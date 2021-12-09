import turfIntersects from '@turf/boolean-intersects';
import { convertCoordinates } from './helpers';

export function maskLinesBinaryDataToDFE(
  currentLinesData,
  filteringGeometry,
  { uniqueIdProperty, analysedLinesFeatures }
) {
  const res = new Uint16Array(currentLinesData.properties.length).fill(1);

  const uniqueIdsIn = new Set();
  const featureIdsIn = new Set();

  let idx = 0;
  for (let currentLine of currentLinesData.pathIndices.value.slice(0, -1)) {
    const featureId = currentLinesData.featureIds.value[currentLine];
    if (res[featureId] === 0) {
      idx++;
      continue;
    }

    const uniqueId =
      currentLinesData.numericProps[uniqueIdProperty]?.value[currentLine] || // uniqueId can be a number
      currentLinesData.properties[featureId][uniqueIdProperty]; // or a string

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // analysedPolygonsFeatures.get(uniqueId) --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || analysedLinesFeatures.get(uniqueId);
    if (!doesIntersects) {
      const nextLine = currentLinesData.pathIndices.value[idx + 1];
      const doesIntersects = turfIntersects(
        {
          type: 'LineString',
          coordinates: convertCoordinates(
            currentLinesData.positions.value.slice(currentLine * 2, nextLine * 2)
          )
        },
        filteringGeometry
      );

      if (doesIntersects) {
        uniqueIdsIn.add(uniqueId);
        featureIdsIn.add(featureId);
      }
    }

    analysedLinesFeatures.set(uniqueId, doesIntersects);

    if (doesIntersects) {
      res[featureId] = 1;
    } else {
      res[featureId] = 0;
    }

    idx++;
  }

  return currentLinesData.featureIds.value.map((id) => res[id] === 1);
}
