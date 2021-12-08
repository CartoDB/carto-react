import turfIntersects from '@turf/boolean-intersects';

let doesIntersects, uniqueId;

export function maskPointsBinaryDataToDFE(
  currentPointsData,
  maskGeometry,
  { uniqueIdProperty, analysedPointsFeatures }
) {
  return currentPointsData.featureIds.value.map((featureIdx) => {
    uniqueId =
      currentPointsData.numericProps[uniqueIdProperty]?.value[featureIdx] || // uniqueId can be a number
      currentPointsData.properties[featureIdx][uniqueIdProperty]; // or a string

    if (analysedPointsFeatures.has(uniqueId)) {
      return analysedPointsFeatures.get(uniqueId);
    }

    doesIntersects = turfIntersects(
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
