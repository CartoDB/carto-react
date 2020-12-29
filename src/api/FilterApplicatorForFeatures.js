import { addExtremeValuesToArr } from '../utils/addExtremeValuesToArr';

class Cache {
  constructor() {
    this.cache = new Map();
  }

  clear() {
    this.cache.clear();
  }

  updateCache(id, feature) {
    if (this.cache.has(id)) {
      this.cache.delete(id);
    } else {
      this.cache.set(id, feature);
    }
  }
}

class FilterApplicatorForFeatures extends Cache {
  constructor() {
    super();
  }

  in(filterValues, features, column) {
    features.forEach(feat => {
      addExtremeValuesToArr(filterValues).forEach(filter => {
        if (filter.includes(feat.properties[column])) {
          const id = featureId(feat);

          if (!id) {
            throw new Error(`cartodb_id or feature.id is needed`);
          }

          this.updateCache(id, feat);
        }
      });
    });
  }

  between(filterValues, features, column) {
    const checkRange = (range, feature) => {
      const [lowerBound, upperBound] = range;
      const targetFeature = feature.properties[column];
      if (targetFeature >= lowerBound && targetFeature <= upperBound) {
        return feature;
      }
    };

    features.forEach(feat => {
      addExtremeValuesToArr(filterValues).forEach(filter => {
          const matchedFeature = checkRange(filter, feat);
          
          if (matchedFeature) {
            const id = featureId(feat);

            if (!id) {
              throw new Error(`cartodb_id or feature.id is needed`);
            }
            
            this.updateCache(id, matchedFeature);
          } 
      });
    });
  }

  filter(features, filters) {
    const columns = Object.keys(filters);

    if (!columns || !features) {
        return [];
    }

    this.clear();

    columns.forEach(column => {
        const columnFilters = filters[column];
        const columnFilterTypes = Object.keys(columnFilters);
    
        columnFilterTypes.forEach(filter => {
          if (!this[filter]) {
            throw new Error(`"${filter}" method not implemented`);
          }

          this[filter](columnFilters[filter].values, features, column);
        });
    });

    return [...this.cache.values()];
  }
}

function featureId(feature) {
  return feature.id || feature.properties.cartodb_id;
}

export const filterApplicatorForFeatures = new FilterApplicatorForFeatures();
