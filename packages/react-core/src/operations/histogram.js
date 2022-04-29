import { aggregate, aggregationFunctions } from './aggregation';
import { AggregationTypes } from './constants/AggregationTypes';

export function histogram({
  data,
  valuesColumns,
  joinOperation,
  bins = 15,
  ticks = [],
  operation
}) {
  if (Array.isArray(data) && data.length === 0) {
    return {};
  }
  const useBins = !ticks.length && bins;

  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  if (useBins) {
    min = aggregationFunctions[AggregationTypes.MIN](data, valuesColumns, joinOperation);
    max = aggregationFunctions[AggregationTypes.MAX](data, valuesColumns, joinOperation);

    if (!isFinite(min) || !isFinite(max)) {
      throw new Error('Cannot calculate histogram without valid data');
    }

    for (let i = 1; i < bins; i += 1) {
      ticks.push(min + (max - min) * (i / bins));
    }
  }

  const binsContainer = [Number.MIN_SAFE_INTEGER, ...ticks].map((tick, index, arr) => ({
    bin: index,
    start: tick,
    end: index === arr.length - 1 ? Number.MAX_SAFE_INTEGER : arr[index + 1],
    values: []
  }));

  data.forEach((feature) => {
    const featureValue = aggregate(feature, valuesColumns, joinOperation);

    const isValid = featureValue !== null && featureValue !== undefined;

    if (!isValid) {
      return;
    }

    if (!useBins) {
      if (featureValue < min) {
        min = featureValue;
      } else if (featureValue > max) {
        max = featureValue;
      }
    }

    const binContainer = binsContainer.find(
      (bin) => bin.start <= featureValue && bin.end > featureValue
    );

    if (!binContainer) {
      return;
    }

    binContainer.values.push(featureValue);
  });

  const targetOperation = aggregationFunctions[operation];

  if (targetOperation) {
    const transformedBins = binsContainer.map((binContainer) => binContainer.values);
    return {
      min,
      max,
      ticks,
      data: transformedBins.map((values) => (values.length ? targetOperation(values) : 0))
    };
  }

  return {};
}
