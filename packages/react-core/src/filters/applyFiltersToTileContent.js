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
  for (const featureId of data.featureIds.value) {
    if (start === null) {
      start = idx;
    }

    // Continue if featureId is the same as current one
    if (featureId === data.featureIds.value[idx + 1]) {
      idx++;
      continue;
    }

    const doesPass = applyFiltersFn(idx, data);
    if (doesPass) featuresGetFilterValue.fill(doesPass, start, idx + 1);

    start = null;
    idx++;
  }

  return featuresGetFilterValue;
}
