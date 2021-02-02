import { makeClosedInterval } from '../utils/makeClosedInterval';
import { FilterTypes } from './FilterQueryBuilder';

const filterFunctions = {
  [FilterTypes.IN](filterValues, featureValue) {
    return filterValues.includes(featureValue);
  },
  [FilterTypes.BETWEEN](filterValues, featureValue) {
    const checkRange = (range) => {
      const [lowerBound, upperBound] = range;
      return featureValue >= lowerBound && featureValue <= upperBound;
    };

    return makeClosedInterval(filterValues).some(checkRange);
  }
};

function passesFilter(columns, filters, feature) {
  return columns.every((column) => {
    const columnFilters = filters[column];
    const columnFilterTypes = Object.keys(columnFilters);

    if (!feature || !feature.properties[column]) {
      return false;
    }

    return columnFilterTypes.every((filter) => {
      const filterFunction = filterFunctions[filter];

      if (!filterFunction) {
        throw new Error(`"${filterFunction}" not implemented`);
      }

      return filterFunction(columnFilters[filter].values, feature.properties[column]);
    });
  });
}

export function applyFilter({ filters = {}, type = 'boolean' }) {
  if (!Object.keys(filters).length) {
    return () => (type === 'number' ? 1 : true);
  }

  return (feature) => {
    const columns = Object.keys(filters);
    const featurePassesFilter = passesFilter(columns, filters, feature);

    return type === 'number' ? Number(featurePassesFilter) : featurePassesFilter;
  };
}
