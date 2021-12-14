import { buildBinaryFeatureFilter } from './Filter';

export default function applyFiltersToTileContent(tileContent, filters) {
  if (!filters || !Object.keys(filters).length || !tileContent) {
    return tileContent;
  }

  const filterFn = buildBinaryFeatureFilter({ filters });

  const applyFiltersFn = (data) => (_, idx) =>
    (!data.attributes || data.attributes.getFilterValue.value[idx]) &&
    filterFn(idx, data);

  return {
    ...tileContent,
    ...['points', 'lines', 'polygons'].reduce((acc, key) => {
      acc[key] = {
        ...tileContent[key],
        attributes: {
          getFilterValue: {
            value: tileContent[key].featureIds.value.map(
              applyFiltersFn(tileContent[key])
            ),
            size: 1
          }
        }
      };
      return acc;
    }, {})
  };
}
