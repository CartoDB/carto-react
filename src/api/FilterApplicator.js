function addExtremeValues(values) {
  return values.map(val => {
    if (val[0] === undefined) {
      return [Number.MIN_SAFE_INTEGER, val[1]]
    }

    if (val[1] === undefined) {
      return [val[0], Number.MAX_SAFE_INTEGER]
    }

    return val;
  });
}

const filterFunctions = {
  IN(filterValues, featureValue) {
    return filterValues.includes(featureValue);
  },
  BETWEEN(filterValues, featureValue) {
    const checkRange = (range) => {
      const [lowerBound, upperBound] = range;
      return featureValue >= lowerBound && featureValue <= upperBound;
    };

    return addExtremeValues(filterValues).some(checkRange);
  }
};

export function filterApplicator(feature, filters) {
    if (!filters) {
      return 1;
    }

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

