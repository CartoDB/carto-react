import { makeClosedInterval } from '../utils/makeClosedInterval';
import { FilterTypes } from './FilterQueryBuilder';

function between(filterValues, featureValue) {
  const checkRange = (range) => {
    const [lowerBound, upperBound] = range;
    return featureValue >= lowerBound && featureValue <= upperBound;
  };

  return makeClosedInterval(filterValues).some(checkRange);
}

const filterFunctions = {
  [FilterTypes.IN](filterValues, featureValue) {
    return filterValues.includes(featureValue);
  },
  [FilterTypes.BETWEEN]: between,
  [FilterTypes.TIME](filterValues, featureValue) {
    const featureValueAsTimestamp = new Date(featureValue).getTime();
    if (isFinite(featureValueAsTimestamp)) {
      return between(filterValues, featureValueAsTimestamp);
    } else {
      throw new Error(`Column used to filter by time isn't well formatted.`);
    }
  }
};

function passesFilter(columns, filters, feature) {
  return columns.every((column) => {
    const columnFilters = filters[column];
    const columnFilterTypes = Object.keys(columnFilters);

    if (!feature || !feature[column]) {
      return false;
    }

    return columnFilterTypes.every((filter) => {
      const filterFunction = filterFunctions[filter];

      if (!filterFunction) {
        throw new Error(`"${filter}" not implemented`);
      }

      return filterFunction(columnFilters[filter].values, feature[column]);
    });
  });
}

export function buildFeatureFilter({ filters = {}, type = 'boolean' }) {
  if (!Object.keys(filters).length) {
    return () => (type === 'number' ? 1 : true);
  }

  return (feature) => {
    const columns = Object.keys(filters);
    const f = feature.properties || feature;
    const featurePassesFilter = passesFilter(columns, filters, f);

    return type === 'number' ? Number(featurePassesFilter) : featurePassesFilter;
  };
}
