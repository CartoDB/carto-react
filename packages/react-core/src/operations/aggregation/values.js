import { AggregationTypes } from './AggregationTypes';

const sum = (values, key) => {
  const fn = key ? (a, b) => a + b[key] : (a, b) => a + b;
  return values.reduce(fn, 0);
};

const min = (values, key) => {
  const fn = key ? (a, b) => Math.min(a, b[key]) : (a, b) => Math.min(a, b);
  return values.reduce(fn, Infinity);
};

const max = (values, key) => {
  const fn = key ? (a, b) => Math.max(a, b[key]) : (a, b) => Math.max(a, b);
  return values.reduce(fn, -Infinity);
};

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (values) => values.length,
  [AggregationTypes.MIN]: (values, key) => min(values, key),
  [AggregationTypes.MAX]: (values, key) => max(values, key),
  [AggregationTypes.SUM]: (values, key) => sum(values, key),
  [AggregationTypes.AVG]: (values, key) => sum(values, key) / (values.length || 1)
};
