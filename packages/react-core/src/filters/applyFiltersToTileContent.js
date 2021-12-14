import { buildBinaryFeatureFilter } from './Filter';

export default function applyFiltersToTileContent(tileContent, filters) {
  if (!filters) {
    return tileContent;
  }

  const filterFn = buildBinaryFeatureFilter({ filters });

  return {
    ...tileContent,
    ...['points', 'lines', 'polygons'].reduce((acc, key) => {
      acc[key] = {
        ...tileContent[key],
        attributes: {
          getFilterValue: {
            value: tileContent[key].featureIds.value.map(
              (_, idx) =>
                (!tileContent[key].attributes ||
                  tileContent[key].attributes.getFilterValue.value[idx]) &&
                filterFn(idx, tileContent[key])
            ),
            size: 1
          }
        }
      };
      return acc;
    }, {})
  };
}
