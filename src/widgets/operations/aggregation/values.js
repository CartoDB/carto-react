import { AggregationTypes } from '../../AggregationTypes';

const sum = (v, column) =>
  v.reduce(
    (a, b) => (typeof b === 'object' ? a + (b.properties[column] || 0) : a + b),
    0
  );

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (val) => val.length,
  [AggregationTypes.MIN]: (val) => val.reduce((a, b) => Math.min(a, b), Infinity),
  [AggregationTypes.MAX]: (val) => val.reduce((a, b) => Math.max(a, b), -Infinity),
  [AggregationTypes.SUM]: (val, column) => sum(val, column),
  [AggregationTypes.AVG]: (val, column) => sum(val, column) / val.length
};
