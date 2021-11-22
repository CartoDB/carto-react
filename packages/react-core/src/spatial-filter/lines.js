import turfIntersects from "@turf/boolean-intersects";
import { concatTypedArrays, convertCoordinates } from "./helpers";

export default function maskLinesBinaryData(
  currentLinesData,
  maskGeometry,
  { uniqueIdProperty, layerUniqueIdsIn = [] }
) {
  const newLinesData = createEmptyLinesData(currentLinesData);

  const uniqueIdsIn = new Set();
  const featureIdsIn = new Set();
  let idx = 0;

  for (let currentLine of currentLinesData.pathIndices.value.slice(0, -1)) {
    const featureId = currentLinesData.featureIds.value[currentLine];
    const uniqueId =
      currentLinesData.numericProps[uniqueIdProperty]?.value[currentLine] || // uniqueId can be a number
      currentLinesData.properties[featureId][uniqueIdProperty]; // or a string

    // featureIdsIn.has(featureId) --> for multiline, if one of the lines is already IN, do not analyse any other
    // layerUniqueIdsIn.indexOf(uniqueId) !== -1 --> for splitted lines between multiple tiles
    let doesIntersects =
      featureIdsIn.has(featureId) || layerUniqueIdsIn.indexOf(uniqueId) !== -1;
    if (!doesIntersects) {
      const nextLine = currentLinesData.pathIndices.value[idx + 1];
      const doesIntersects = turfIntersects(
        {
          type: "LineString",
          coordinates: convertCoordinates(
            currentLinesData.positions.value.subarray(
              currentLine * 2,
              nextLine * 2
            )
          )
        },
        maskGeometry
      );

      if (doesIntersects) {
        uniqueIdsIn.add(uniqueId);
        featureIdsIn.add(featureId);
      }
    }

    if (doesIntersects) {
      addPathIndiceToPolygonsData(newLinesData, currentLinesData, idx);
    }
    idx++;
  }

  if (newLinesData.featureIds.value.length) {
    newLinesData.properties = currentLinesData.properties;
    newLinesData.pathIndices.value = concatTypedArrays(
      newLinesData.pathIndices.value,
      newLinesData.pathIndices.value.constructor.of(
        newLinesData.featureIds.value.length
      )
    );
  }

  return [newLinesData, Array.from(uniqueIdsIn)];
}

function addPathIndiceToPolygonsData(
  newLinesData,
  oldLinesData,
  pathIndicesIdx
) {
  const currentLine = oldLinesData.pathIndices.value[pathIndicesIdx];
  const nextLine =
    oldLinesData.pathIndices.value[pathIndicesIdx + 1] ||
    oldLinesData.featureIds.value.length;

  newLinesData.featureIds.value = concatTypedArrays(
    newLinesData.featureIds.value,
    oldLinesData.featureIds.value.slice(currentLine, nextLine)
  );

  newLinesData.globalFeatureIds.value = concatTypedArrays(
    newLinesData.globalFeatureIds.value,
    oldLinesData.globalFeatureIds.value.slice(currentLine, nextLine)
  );

  newLinesData.positions.value = concatTypedArrays(
    newLinesData.positions.value,
    oldLinesData.positions.value.slice(currentLine * 2, nextLine * 2)
  );

  newLinesData.pathIndices.value = concatTypedArrays(
    newLinesData.pathIndices.value,
    oldLinesData.pathIndices.value.constructor.of(
      newLinesData.featureIds.value.length - (nextLine - currentLine)
    )
  );

  for (let numericPropKey in oldLinesData.numericProps) {
    newLinesData.numericProps[numericPropKey].value = concatTypedArrays(
      newLinesData.numericProps[numericPropKey].value,
      oldLinesData.numericProps[numericPropKey].value.slice(
        currentLine,
        nextLine
      )
    );
  }
}

function createEmptyLinesData(linesData) {
  return {
    featureIds: {
      value: new linesData.featureIds.value.constructor(),
      size: linesData.featureIds.size
    },
    fields: [],
    globalFeatureIds: {
      value: new linesData.globalFeatureIds.value.constructor(),
      size: linesData.globalFeatureIds.size
    },
    numericProps: Object.entries(linesData.numericProps).reduce(
      (acc, [key, { value, size }]) => {
        acc[key] = { size, value: new value.constructor() };
        return acc;
      },
      {}
    ),
    positions: {
      value: new linesData.positions.value.constructor(),
      size: linesData.positions.size
    },
    properties: [],
    pathIndices: {
      value: new linesData.pathIndices.value.constructor(),
      size: linesData.pathIndices.size
    }
  };
}
