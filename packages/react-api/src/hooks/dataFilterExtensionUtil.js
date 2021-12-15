import { _buildFeatureFilter, _FilterTypes } from '@carto/react-core/';

// Don't change this value to maintain compatibility with builder
export const MAX_GPU_FILTERS = 4;

function getFiltersByType(filters) {
  const filtersWithoutTimeType = {};
  let timeFilter = null;

  Object.entries(filters).forEach(([column, columnData]) => {
    Object.entries(columnData).forEach(([type, typeData]) => {
      if (type !== _FilterTypes.TIME) {
        filtersWithoutTimeType[column] = { [type]: typeData };
      } else {
        timeFilter = {
          column,
          values: typeData.values,
          type
        };
      }
    });
  });
  return {
    filtersWithoutTimeType,
    timeFilter
  };
}

function getFilterRange(timeFilter) {
  const result = Array(MAX_GPU_FILTERS).fill([0, 0]);
  // According to getFilterValue all filters are resolved as 0 or 1 in the first position of the array
  // except the time filter value that is resolved with the real value of the feature in the second position of the array
  result[0] = [1, 1];
  if (timeFilter) {
    result[1] = timeFilter.values[0];
  }
  return result;
}

function getFilterValueUpdateTriggers(filtersWithoutTimeType, timeFilter) {
  const result = { ...filtersWithoutTimeType };

  // We don't want to change the layer UpdateTriggers every time that the time filter changes
  // because this filter is changed by the time series widget during its animation
  // so we remove the time filter value from the `updateTriggers`
  if (timeFilter) {
    result[timeFilter.column] = {
      ...result[timeFilter.column],
      [timeFilter.type]: {} // this allows working with other filters, without an impact on performance
    };
  }
  return JSON.stringify(result);
}

function getFilterValue(filtersWithoutTimeType, timeFilter) {
  const result = Array(MAX_GPU_FILTERS).fill(0);

  // We evaluate all filters except the time filter using _buildFeatureFilter function.
  // For the time filter, we return the value of the feature and we will change the getFilterRange result
  // every time this filter changes
  return (feature) => {
    result[0] = _buildFeatureFilter({ filters: filtersWithoutTimeType, type: 'number' })(
      feature
    );

    if (timeFilter) {
      const f = feature.properties || feature;
      result[1] = f[timeFilter.column];
    }
    return result;
  };
}

// The deck.gl DataFilterExtension accepts up to 4 values to filter.
// We're going to use the first value for all filter except the time filter
// that will be managed by the second value of the DataFilterExtension
export function getDataFilterExtensionProps(filters = {}) {
  const { filtersWithoutTimeType, timeFilter } = getFiltersByType(filters);
  return {
    filterRange: getFilterRange(timeFilter),
    filterValueUpdateTriggers: getFilterValueUpdateTriggers(
      filtersWithoutTimeType,
      timeFilter
    ),
    getFilterValue: getFilterValue(filtersWithoutTimeType, timeFilter)
  };
}
