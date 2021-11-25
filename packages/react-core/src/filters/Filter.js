import { makeIntervalComplete } from '../utils/makeIntervalComplete';
import { FilterTypes } from './FilterQueryBuilder';

function between(filterValues, featureValue) {
  const checkRange = (range) => {
    const [lowerBound, upperBound] = range;
    return featureValue >= lowerBound && featureValue <= upperBound;
  };

  return makeIntervalComplete(filterValues).some(checkRange);
}

function closedOpen(filterValues, featureValue) {
  const checkRange = (range) => {
    const [lowerBound, upperBound] = range;
    return featureValue >= lowerBound && featureValue < upperBound;
  };

  return makeIntervalComplete(filterValues).some(checkRange);
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
  },
  [FilterTypes.CLOSED_OPEN]: closedOpen
};

function passesFilter(columns, filters, feature) {
  return columns.every((column) => {
    const columnFilters = filters[column];
    const columnFilterTypes = Object.keys(columnFilters);

    if (!feature || feature[column] === null || feature[column] === undefined) {
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

// Binary
export function buildBinaryFeatureFilter({ filters = {} }) {
  const columns = Object.keys(filters);

  if (!columns.length) {
    return () => 1;
  }

  return (featureIdIdx, binaryData) => {
    const featurePassesFilter = passesFilterUsingBinary(
      columns,
      filters,
      featureIdIdx,
      binaryData
    );

    return featurePassesFilter;
  };
}

function getValueFromNumericProps(featureIdIdx, binaryData, { column }) {
  return binaryData.numericProps[column]?.value[featureIdIdx];
}

function getValueFromProperties(featureIdIdx, binaryData, { column }) {
  const propertyIdx = binaryData.featureIds.value[featureIdIdx];
  return binaryData.properties[propertyIdx]?.[column];
}

const GET_VALUE_BY_BINARY_PROP = {
  properties: getValueFromProperties,
  numericProps: getValueFromNumericProps
};

function getBinaryPropertyByFilterValues(filterValues) {
  return typeof filterValues.flat()[0] === 'string' ? 'properties' : 'numericProps';
}

function getFeatureValue(featureIdIdx, binaryData, filter) {
  const { column, values } = filter;
  const binaryProp = getBinaryPropertyByFilterValues(values);
  const getFeatureValueFn = GET_VALUE_BY_BINARY_PROP[binaryProp];
  return getFeatureValueFn(featureIdIdx, binaryData, { column });
}

function passesFilterUsingBinary(columns, filters, featureIdIdx, binaryData) {
  return columns.every((column) => {
    const columnFilters = filters[column];

    return Object.entries(columnFilters).every(([type, { values }]) => {
      const filterFn = filterFunctions[type];
      if (!filterFn) {
        throw new Error(`"${type}" not implemented`);
      }

      const featureValue = getFeatureValue(featureIdIdx, binaryData, {
        column,
        type,
        values
      });

      return filterFn(values, featureValue);
    });
  });
}
