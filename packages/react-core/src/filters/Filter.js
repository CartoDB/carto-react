import { filterFunctions } from './FilterTypes';
import { FiltersLogicalOperators } from '../operations/constants/FiltersLogicalOperators';

function passesFilter(columns, filters, feature, filtersLogicalOperator) {
  const logicalOperatorMethods = {
    [FiltersLogicalOperators.AND]: 'every',
    [FiltersLogicalOperators.OR]: 'some'
  };
  const method = logicalOperatorMethods[filtersLogicalOperator];
  return columns[method]((column) => {
    const columnFilters = filters[column];
    const columnFilterTypes = Object.keys(columnFilters);

    if (!feature || feature[column] === null || feature[column] === undefined) {
      return false;
    }

    return columnFilterTypes.every((filter) => {
      const filterFunction = filterFunctions[filter];

      if (!filterFunction) {
        throw new Error(`"${filter}" filter is not implemented.`);
      }

      return filterFunction(
        columnFilters[filter].values,
        feature[column],
        columnFilters[filter].params
      );
    });
  });
}

export function buildFeatureFilter({
  filters = {},
  type = 'boolean',
  filtersLogicalOperator = FiltersLogicalOperators.AND
}) {
  const columns = Object.keys(filters);

  if (!columns.length) {
    return () => (type === 'number' ? 1 : true);
  }

  return (feature) => {
    const f = feature.properties || feature;
    const featurePassesFilter = passesFilter(columns, filters, f, filtersLogicalOperator);

    return type === 'number' ? Number(featurePassesFilter) : featurePassesFilter;
  };
}

// Apply certain filters to a collection of features
export function applyFilters(features, filters, filtersLogicalOperator) {
  return Object.keys(filters).length
    ? features.filter(buildFeatureFilter({ filters, filtersLogicalOperator }))
    : features;
}

// Binary
export function buildBinaryFeatureFilter({ filters = {} }) {
  const columns = Object.keys(filters);

  if (!columns.length) {
    return () => 1;
  }

  return (featureIdIdx, binaryData) =>
    passesFilterUsingBinary(columns, filters, featureIdIdx, binaryData);
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
        throw new Error(`"${type}" filter is not implemented.`);
      }

      if (!values) return 0;

      const featureValue = getFeatureValue(featureIdIdx, binaryData, {
        column,
        type,
        values
      });

      if (featureValue === undefined || featureValue === null) return 0;

      return filterFn(values, featureValue);
    });
  });
}
