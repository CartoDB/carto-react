import { addExtremeValuesToArr } from '../utils/addExtremeValuesToArr';
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

    return addExtremeValuesToArr(filterValues).some(checkRange);
  }
};

export function applyFilter({ filters = {}, returnedType = 'boolean' }) {
  if (!Object.keys(filters).length) {
    return () => returnedType === 'number' ? 1 : true;
  }

  return object => {
    const columns = Object.keys(filters);

    const featurePassesFilter = columns.every(column => {
      const columnFilters = filters[column];
      const columnFilterTypes = Object.keys(columnFilters);
    
      if (!object || !object.properties[column]) {
        return false;
      }
    
      return columnFilterTypes.every(filter => {
        const filterFunction = filterFunctions[filter];
        
        if (!filterFunction) {
          throw new Error(`"${filterFunction}" not implemented`);
        }
        
        return filterFunction(columnFilters[filter].values, object.properties[column]);
      });
    });

    return returnedType === 'number' ? Number(featurePassesFilter) : featurePassesFilter;
  }
}

