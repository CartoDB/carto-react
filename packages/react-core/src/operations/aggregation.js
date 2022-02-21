import { AggregationTypes } from './constants/AggregationTypes';

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (values) => values.length,
  [AggregationTypes.MIN]: min,
  [AggregationTypes.MAX]: max,
  [AggregationTypes.SUM]: sum,
  [AggregationTypes.AVG]: avg
};

// Aggregation functions
function avg(values, ...args) {
  return sum(values, ...args) / (values.length || 1);
}

function sum(values, keys, joinOperation) {
  const normalizedKeys = normalizeKeys(keys);

  let sumFn = (a, b) => a + b;
  if (normalizedKeys) {
    const calcTempValue = getCalcTempValueFn(normalizedKeys, joinOperation);
    sumFn = (a, b) => a + calcTempValue(b);
  }

  return values.reduce(sumFn, 0);
}

function min(values, keys, joinOperation) {
  const normalizedKeys = normalizeKeys(keys);
  if (normalizedKeys) {
    const calcTempValue = getCalcTempValueFn(normalizedKeys, joinOperation);
    return values.reduce((a, b) => Math.min(a, calcTempValue(b)), Infinity);
  } else {
    return Math.min(...values);
  }
}

function max(values, keys, joinOperation) {
  const normalizedKeys = normalizeKeys(keys);
  if (normalizedKeys) {
    const calcTempValue = getCalcTempValueFn(normalizedKeys, joinOperation);
    return values.reduce((a, b) => Math.max(a, calcTempValue(b)), -Infinity);
  } else {
    return Math.max(...values);
  }
}

// Aux

// Keys can come as a string (one column) or a string array (multiple column)
// Use always an array to make the code easier
function normalizeKeys(keys) {
  return keys?.length ? [keys].flat() : undefined;
}

function getCalcTempValueFn(keys, joinOperation) {
  const joinFn = aggregationFunctions[joinOperation] || (([value]) => value);
  return (feature) => joinFn(keys.map((column) => feature[column]));
}
