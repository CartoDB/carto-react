import { AggregationTypes } from '../../AggregationTypes';

const isFeature = (value) => typeof value === 'object' && 'properties' in value;
const isFeatureOrValue = (value, column) =>
  isFeature(value) ? value.properties[column] || 0 : value;

const sum = (values, column) =>
  values.reduce((a, b) => (isFeature(b) ? a + (b.properties[column] || 0) : a + b), 0);

const findMinOrMaxValue = (type, values, column) => {
  const infinityWithSignus = type === AggregationTypes.MAX ? -Infinity : Infinity;
  const checkedFeatureOrValue = (v) => isFeatureOrValue(v, column);
  return values.reduce(
    (a, b) => Math[type](checkedFeatureOrValue(a), checkedFeatureOrValue(b)),
    infinityWithSignus
  );
};

export const aggregationFunctions = {
  [AggregationTypes.COUNT]: (values) => values.length,
  [AggregationTypes.MIN]: (values, column) =>
    findMinOrMaxValue(AggregationTypes.MIN, values, column),
  [AggregationTypes.MAX]: (values, column) =>
    findMinOrMaxValue(AggregationTypes.MAX, values, column),
  [AggregationTypes.SUM]: (values, column) => sum(values, column),
  [AggregationTypes.AVG]: (values, column) => sum(values, column) / values.length
};
