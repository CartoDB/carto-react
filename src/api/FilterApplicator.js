import { addExtremeValuesToArr } from '../utils/addExtremeValuesToArr';

const filterFunctions = {
  IN(filterValues, featureValue) {
    return filterValues.includes(featureValue);
  },
  BETWEEN(filterValues, featureValue) {
    const checkRange = (range) => {
      const [lowerBound, upperBound] = range;
      return featureValue >= lowerBound && featureValue <= upperBound;
    };

    return addExtremeValuesToArr(filterValues).some(checkRange);
  }
};

export function filterApplicator(feature, filters) {
    const columns = Object.keys(filters);

    if (!columns || !filters) {
        return 1;
    }

    const featurePassesFilter = columns.every(column => {
        const columnFilters = filters[column];
        const columnFilterTypes = Object.keys(columnFilters);
    
        if (!feature || !feature.properties[column]) {
            return false;
        }
    
        return columnFilterTypes.every(filter => {
            const filterFunction = filterFunctions[filter.toUpperCase()];
        
            if (!filterFunction) {
                throw new Error(`"${filterFunction}" not implemented`);
            }
        
            return filterFunction(columnFilters[filter].values, feature.properties[column]);
        });
    });

    return Number(featurePassesFilter);
}

