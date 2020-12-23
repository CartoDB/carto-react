const filterFunctions = {
    IN(filterValues, featureValue) {
      return filterValues.includes(featureValue);
    },
    BETWEEN(filterValues, featureValue) {
      const checkRange = function checkRange(range) {
        const [lowerBound, upperBound] = range;
        return featureValue >= lowerBound && featureValue <= upperBound;
      };

      if (Array.isArray(filterValues[0])) {
        return filterValues.every(checkRange);
      } else {
        return checkRange(filterValues);
      }
    }
};

export function filterApplicator(feature, filters) {
    const columns = Object.keys(filters);

    if (!columns) {
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
        
            return filterFunction(columnFilters[filter].values, feature.properties[column] || '');
        });
    });

    return Number(featurePassesFilter);
}

