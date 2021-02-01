import { AggregationTypes } from '../../AggregationTypes';

const sum = (values) => values.reduce((a, b) => a + b, 0);

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (values) => values.length,
  [AggregationTypes.MIN]: (values) => values.reduce((a, b) => Math.min(a, b), Infinity),
  [AggregationTypes.MAX]: (values) => values.reduce((a, b) => Math.max(a, b), -Infinity),
  [AggregationTypes.SUM]: (values) => sum(values),
  [AggregationTypes.AVG]: (values) => sum(values) / values.length
};
