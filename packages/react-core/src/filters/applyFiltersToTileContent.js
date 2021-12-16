import { buildBinaryFeatureFilter } from './Filter';

export function applyFiltersToTileContent(tileContent, filters) {
  if (!filters || !Object.keys(filters).length || !tileContent) {
    return tileContent;
  }

  const filterFn = buildBinaryFeatureFilter({ filters });

  const applyFiltersFn = (idx, data) =>
    (!data.attributes || data.attributes.getFilterValue.value[idx]) &&
    filterFn(idx, data);

  const pointsGetFilterValue = tileContent.points.featureIds.value.map((_, idx) =>
    applyFiltersFn(idx, tileContent.points)
  );

  const polygonsGetFilterValue = applyToPolygonsLinesData(
    tileContent.polygons,
    applyFiltersFn
  );

  const linesGetFilterValue = applyToPolygonsLinesData(tileContent.lines, applyFiltersFn);

  return {
    ...tileContent,
    points: {
      ...tileContent.pois,
      attributes: {
        getFilterValue: {
          value: pointsGetFilterValue,
          size: 1
        }
      }
    },
    polygons: {
      ...tileContent.polygons,
      attributes: {
        getFilterValue: {
          value: polygonsGetFilterValue,
          size: 1
        }
      }
    },
    lines: {
      ...tileContent.lines,
      attributes: {
        getFilterValue: {
          value: linesGetFilterValue,
          size: 1
        }
      }
    }
  };
}

// Aux
function applyToPolygonsLinesData(data, applyFiltersFn) {
  const featuresGetFilterValue = new Uint16Array(data.featureIds.value.length);

  let idx = 0,
    start = null;

  const indices = data.primitivePolygonIndices || data.pathIndices;
  for (const featureIdIdx of indices.value) {
    const end = indices.value[idx + 1];
    if (start === null) {
      start = featureIdIdx;
    }

    const currentFeatureId = data.featureIds.value[featureIdIdx];
    const followingFeatureId = data.featureIds.value[end];
    // Continue if following featureId is the same as current one
    if (currentFeatureId === followingFeatureId) {
      idx++;
      continue;
    }

    const doesPass = applyFiltersFn(start, data);
    if (doesPass) featuresGetFilterValue.fill(doesPass, start, end);

    start = null;
    idx++;
  }

  return featuresGetFilterValue;
}
