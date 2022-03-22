import { AggregationTypes } from './constants/AggregationTypes';

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (values) => values.length,
  [AggregationTypes.MIN]: min,
  [AggregationTypes.MAX]: max,
  [AggregationTypes.SUM]: sum,
  [AggregationTypes.AVG]: avg
};

export function aggregate(feature, keys, operation) {
  if (!keys?.length) {
    throw new Error('Cannot aggregate a feature without having keys');
  } else if (keys.length === 1) {
    return feature[keys[0]];
  }

  const aggregationFn = aggregationFunctions[operation];

  if (!aggregationFn) {
    throw new Error(`${operation} isn't a valid aggregation function`);
  }

  return aggregationFn(keys.map((column) => feature[column]));
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
