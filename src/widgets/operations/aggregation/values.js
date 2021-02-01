import { AggregationTypes } from '../../AggregationTypes';

const isFeature = (val) => typeof val === 'object';

const sum = (v, column) =>
  v.reduce((a, b) => (isFeature(b) ? a + (b.properties[column] || 0) : a + b), 0);

const findMinOrMaxValue = (type, val, column) => {
  const infinityWithSignus = type === AggregationTypes.MAX ? -Infinity : Infinity;

  // features
  if (isFeature(val[0]) && column) {
    return Math[type](...val.map((v) => v.properties[column] || 0), infinityWithSignus);
  }

  // values
  return val.reduce((a, b) => Math[type](a, b), infinityWithSignus);
};

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (val) => val.length,
  [AggregationTypes.MIN]: (val, column) =>
    findMinOrMaxValue(AggregationTypes.MIN, val, column),
  [AggregationTypes.MAX]: (val, column) =>
    findMinOrMaxValue(AggregationTypes.MAX, val, column),
  [AggregationTypes.SUM]: (val, column) => sum(val, column),
  [AggregationTypes.AVG]: (val, column) => sum(val, column) / val.length
};
