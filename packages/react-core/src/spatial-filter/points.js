import turfIntersects from '@turf/boolean-intersects';

let doesIntersects, uniqueId;

export function maskPointsBinaryDataToDFE(
  currentPointsData,
  maskGeometry,
  { uniqueIdProperty, analysedPointFeatures }
) {
  return currentPointsData.featureIds.value.map((featureIdx) => {
    uniqueId =
      currentPointsData.numericProps[uniqueIdProperty]?.value[featureIdx] || // uniqueId can be a number
      currentPointsData.properties[featureIdx][uniqueIdProperty]; // or a string

    if (analysedPointFeatures.has(uniqueId)) {
      return analysedPointFeatures.get(uniqueId);
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

    analysedPointFeatures.set(uniqueId, doesIntersects);

    return doesIntersects;
  });
}
