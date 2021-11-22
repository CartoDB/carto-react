import turfIntersects from '@turf/boolean-intersects';
import { concatTypedArrays } from './helpers';

export default function maskPointsBinaryData(currentPointsData, maskGeometry) {
  const newPointsData = createEmptyPoinstData(currentPointsData);

  for (let featureIdx of currentPointsData.featureIds.value) {
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

    if (doesIntersects) {
      addFeatureIdxToPointsData(newPointsData, currentPointsData, featureIdx);
    }
  }

  return newPointsData;
}

function createEmptyPoinstData(pointData) {
  return {
    featureIds: {
      value: new pointData.featureIds.value.constructor(),
      size: pointData.featureIds.size
    },
    fields: [],
    globalFeatureIds: {
      value: new pointData.globalFeatureIds.value.constructor(),
      size: pointData.globalFeatureIds.size
    },
    numericProps: Object.entries(pointData.numericProps).reduce(
      (acc, [key, { value, size }]) => {
        acc[key] = { size, value: new value.constructor() };
        return acc;
      },
      {}
    ),
    positions: {
      value: new pointData.positions.value.constructor(),
      size: pointData.positions.size
    },
    properties: [],
    type: 'Point'
  };
}

function addFeatureIdxToPointsData(newPointData, oldPointData, featureIdx) {
  newPointData.featureIds.value = concatTypedArrays(
    newPointData.featureIds.value,
    oldPointData.featureIds.value.constructor.of(newPointData.featureIds.value.length)
  );

  newPointData.globalFeatureIds.value = concatTypedArrays(
    newPointData.globalFeatureIds.value,
    oldPointData.globalFeatureIds.value.constructor.of(
      oldPointData.globalFeatureIds.value[featureIdx]
    )
  );

  newPointData.positions.value = concatTypedArrays(
    newPointData.positions.value,
    oldPointData.positions.value.slice(featureIdx * 2, featureIdx * 2 + 2)
  );

  newPointData.properties.push(oldPointData.properties[featureIdx]);
  for (let numericProp in oldPointData.numericProps) {
    newPointData.numericProps[numericProp].value = concatTypedArrays(
      newPointData.numericProps[numericProp].value,
      oldPointData.numericProps[numericProp].value.constructor.of(
        oldPointData.numericProps[numericProp].value[featureIdx]
      )
    );
  }
}
