import { AggregationTypes } from '../../AggregationTypes';

const sum = (values, key) => {
  const fn = key ? (a, b) => a + b[key] : (a, b) => a + b;
  return values.reduce(fn, 0);
};

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (values) => values.length,
  [AggregationTypes.MIN]: (values, key) =>
    values.reduce((a, b) => Math.min(a, b[key]), Infinity),
  [AggregationTypes.MAX]: (values, key) =>
    values.reduce((a, b) => Math.max(a, b[key]), -Infinity),
  [AggregationTypes.SUM]: (values, key) => sum(values, key),
  [AggregationTypes.AVG]: (values, key) => sum(values, key) / values.length
};
