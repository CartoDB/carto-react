import { AggregationTypes } from './constants/AggregationTypes';

const applyAggregationFunction = (aggFn, ...args) => {
  const [values, keys, operation] = args;
  const normalizedKeys = normalizeKeys(keys);
  const elements =
    (normalizedKeys?.length || 0) <= 1
      ? filterFalsyElements(values, normalizedKeys)
      : values;
  return aggFn(elements, keys, operation);
};

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (values) => values.length,
  [AggregationTypes.MIN]: (...args) => applyAggregationFunction(min, ...args),
  [AggregationTypes.MAX]: (...args) => applyAggregationFunction(max, ...args),
  [AggregationTypes.SUM]: (...args) => applyAggregationFunction(sum, ...args),
  [AggregationTypes.AVG]: (...args) => applyAggregationFunction(avg, ...args)
};

export function aggregate(feature, keys, operation) {
  // Forced casting to Number in this method allows to work-around some specific situations, where a big numeric field is transformed into a string when generating the tileset (eg. PG)
  if (!keys?.length) {
    throw new Error('Cannot aggregate a feature without having keys');
  } else if (keys.length === 1) {
    return Number(feature[keys[0]]);
  }

  const aggregationFn = aggregationFunctions[operation];

  if (!aggregationFn) {
    throw new Error(`${operation} isn't a valid aggregation function`);
  }

  return aggregationFn(keys.map((column) => Number(feature[column])));
}

function filterFalsyElements(values, keys) {
  const filterFn = (value) => value !== null && value !== undefined;

  if (!keys?.length) {
    return values.filter(filterFn);
  }

  return values.filter((v) => filterFn(v[keys[0]]));
}

// Aggregation functions
function avg(values, ...args) {
  return sum(values, ...args) / (values.length || 1);
}

function sum(values, keys, joinOperation) {
  const normalizedKeys = normalizeKeys(keys);

  let sumFn = (a, b) => a + b;
  if (normalizedKeys) {
    sumFn = (a, b) => a + aggregate(b, normalizedKeys, joinOperation);
  }

  return values.reduce(sumFn, 0);
}

function min(values, keys, joinOperation) {
  const normalizedKeys = normalizeKeys(keys);
  if (normalizedKeys) {
    return values.reduce(
      (a, b) => Math.min(a, aggregate(b, normalizedKeys, joinOperation)),
      Infinity
    );
  } else {
    return Math.min(...values);
  }
}

function max(values, keys, joinOperation) {
  const normalizedKeys = normalizeKeys(keys);
  if (normalizedKeys) {
    return values.reduce(
      (a, b) => Math.max(a, aggregate(b, normalizedKeys, joinOperation)),
      -Infinity
    );
  } else {
    return Math.max(...values);
  }
}

// Aux

// Keys can come as a string (one column) or a strings array (multiple column)
// Use always an array to make the code easier
function normalizeKeys(keys) {
  return Array.isArray(keys) ? keys : typeof keys === 'string' ? [keys] : undefined;
}
