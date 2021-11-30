import turfIntersects from '@turf/boolean-intersects';
import { concatTypedArrays, convertCoordinates } from './helpers';

export function maskPolygonsBinaryData(
  currentPolygonsData,
  maskGeometry,
  { uniqueIdProperty, layerUniqueIdsIn = [] }
) {
  let newPolygonsData = createEmptyPolygonsData(currentPolygonsData);

  const uniqueIdsIn = new Set();
  const featureIdsIn = new Set();

  let idx = 0;
  for (let currentLine of currentPolygonsData.primitivePolygonIndices.value.slice(
    0,
    -1
  )) {
    const featureId = currentPolygonsData.featureIds.value[currentLine];
    const uniqueId =
      currentPolygonsData.numericProps[uniqueIdProperty]?.value[currentLine] || // uniqueId can be a number
      currentPolygonsData.properties[featureId][uniqueIdProperty]; // or a string

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // layerUniqueIdsIn.indexOf(uniqueId) !== -1 --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || layerUniqueIdsIn.indexOf(uniqueId) !== -1;
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
        maskGeometry
      );

      if (doesIntersects) {
        uniqueIdsIn.add(uniqueId);
        featureIdsIn.add(featureId);
      }
    }

    if (doesIntersects) {
      addPolygonIndiceToPolygonsData(newPolygonsData, currentPolygonsData, idx);
    }

    idx++;
  }

  if (newPolygonsData.featureIds.value.length) {
    newPolygonsData.properties = currentPolygonsData.properties;
    ['polygonIndices', 'primitivePolygonIndices'].forEach(
      (key) =>
        (newPolygonsData[key].value = concatTypedArrays(
          newPolygonsData[key].value,
          newPolygonsData[key].value.constructor.of(
            newPolygonsData.featureIds.value.length
          )
        ))
    );
  }

  return [newPolygonsData, Array.from(uniqueIdsIn)];
}

export function maskPolygonsBinaryDataToDFE(
  currentPolygonsData,
  filteringGeometry,
  { uniqueIdProperty, layerUniqueIdsIn = [] }
) {
  const res = new Uint16Array(currentPolygonsData.properties.length);

  const uniqueIdsIn = new Set();
  const featureIdsIn = new Set();

  let idx = 0;
  for (let currentLine of currentPolygonsData.primitivePolygonIndices.value.slice(
    0,
    -1
  )) {
    const featureId = currentPolygonsData.featureIds.value[currentLine];
    if (res[featureId] === -1) {
      continue;
    }

    const uniqueId =
      currentPolygonsData.numericProps[uniqueIdProperty]?.value[currentLine] || // uniqueId can be a number
      currentPolygonsData.properties[featureId][uniqueIdProperty]; // or a string

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // layerUniqueIdsIn.indexOf(uniqueId) !== -1 --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || layerUniqueIdsIn.indexOf(uniqueId) !== -1;
    if (!doesIntersects) {
      const nextLine = currentPolygonsData.primitivePolygonIndices.value[idx + 1];
      doesIntersects = turfIntersects(
        {
          type: 'Polygon',
          coordinates: [
            convertCoordinates(
              currentPolygonsData.positions.value.slice(currentLine * 2, nextLine * 2)
            )
          ]
        },
        filteringGeometry
      );

      if (doesIntersects) {
        uniqueIdsIn.add(uniqueId);
        featureIdsIn.add(featureId);
      }
    }

    if (doesIntersects) {
      res[featureId] = 1;
    } else {
      res[featureId] = -1;
    }

    idx++;
  }

  return [
    currentPolygonsData.featureIds.value.map((id) => res[id]),
    Array.from(uniqueIdsIn)
  ];
}

function addPolygonIndiceToPolygonsData(
  newPolygonsData,
  oldPolygonsData,
  polygonIndicesIdx
) {
  const currentLine = oldPolygonsData.primitivePolygonIndices.value[polygonIndicesIdx];
  const nextLine =
    oldPolygonsData.primitivePolygonIndices.value[polygonIndicesIdx + 1] ||
    oldPolygonsData.featureIds.value.length;

  newPolygonsData.triangles.value = concatTypedArrays(
    newPolygonsData.triangles.value,
    // reduce isn't faster because it has to concat typedarrays
    oldPolygonsData.triangles.value
      .filter((el) => el >= currentLine && el < nextLine)
      .map((el) => {
        return (
          el -
          (polygonIndicesIdx ? currentLine : 0) +
          newPolygonsData.featureIds.value.length
        );
      })
  );

  newPolygonsData.featureIds.value = concatTypedArrays(
    newPolygonsData.featureIds.value,
    oldPolygonsData.featureIds.value.slice(currentLine, nextLine)
  );

  newPolygonsData.globalFeatureIds.value = concatTypedArrays(
    newPolygonsData.globalFeatureIds.value,
    oldPolygonsData.globalFeatureIds.value.slice(currentLine, nextLine)
  );

  newPolygonsData.positions.value = concatTypedArrays(
    newPolygonsData.positions.value,
    oldPolygonsData.positions.value.slice(currentLine * 2, nextLine * 2)
  );

  ['polygonIndices', 'primitivePolygonIndices'].forEach((key) => {
    newPolygonsData[key].value = concatTypedArrays(
      newPolygonsData[key].value,
      oldPolygonsData[key].value.constructor.of(
        newPolygonsData.featureIds.value.length - (nextLine - currentLine)
      )
    );
  });

  for (let numericProp in oldPolygonsData.numericProps) {
    newPolygonsData.numericProps[numericProp].value = concatTypedArrays(
      newPolygonsData.numericProps[numericProp].value,
      oldPolygonsData.numericProps[numericProp].value.slice(currentLine, nextLine)
    );
  }
}

function createEmptyPolygonsData(polygonsData) {
  return {
    featureIds: {
      value: new polygonsData.featureIds.value.constructor(),
      size: polygonsData.featureIds.size
    },
    fields: [],
    globalFeatureIds: {
      value: new polygonsData.globalFeatureIds.value.constructor(),
      size: polygonsData.globalFeatureIds.size
    },
    numericProps: Object.entries(polygonsData.numericProps).reduce(
      (acc, [key, { value, size }]) => {
        acc[key] = { size, value: new value.constructor() };
        return acc;
      },
      {}
    ),
    positions: {
      value: new polygonsData.positions.value.constructor(),
      size: polygonsData.positions.size
    },
    properties: [],
    triangles: {
      value: new polygonsData.triangles.value.constructor(),
      size: polygonsData.triangles.size
    },
    polygonIndices: {
      value: new polygonsData.polygonIndices.value.constructor(0),
      size: polygonsData.polygonIndices.size
    },
    primitivePolygonIndices: {
      value: new polygonsData.primitivePolygonIndices.value.constructor(0),
      size: polygonsData.primitivePolygonIndices.size
    }
  };
}
