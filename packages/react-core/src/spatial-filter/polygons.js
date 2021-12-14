import turfIntersects from '@turf/boolean-intersects';
import { convertCoordinates } from './helpers';

export function maskPolygonsBinaryDataToDFE(
  currentPolygonsData,
  filteringGeometry,
  { uniqueIdProperty, analysedPolygonsFeatures }
) {
  const res = new Uint16Array(currentPolygonsData.properties.length).fill(1);

  const uniqueIdsIn = new Set();
  const featureIdsIn = new Set();

  let idx = 0;
  for (let currentLine of currentPolygonsData.primitivePolygonIndices.value.slice(
    0,
    -1
  )) {
    const featureId = currentPolygonsData.featureIds.value[currentLine];
    if (res[featureId] === 0) {
      idx++;
      continue;
    }

    const uniqueId =
      currentPolygonsData.numericProps[uniqueIdProperty]?.value[currentLine] || // uniqueId can be a number
      currentPolygonsData.properties[featureId][uniqueIdProperty]; // or a string

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
        uniqueIdsIn.add(uniqueId);
        featureIdsIn.add(featureId);
        analysedPolygonsFeatures.set(uniqueId, doesIntersects);
      }
    }

    res[featureId] = doesIntersects;

    idx++;
  }

  return currentPolygonsData.featureIds.value.map((id) => res[id] === 1);
}
