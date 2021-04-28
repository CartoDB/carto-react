import { aggregationFunctions } from './aggregation/values';

export function histogram(features, columnName, ticks, operation) {
  if (Array.isArray(features) && features.length === 0) {
    return [];
  }

  ticks = [Number.MIN_SAFE_INTEGER, ...ticks];

  const binsContainer = ticks.map((tick, index, arr) => ({
    bin: index,
    start: tick,
    end: index === arr.length - 1 ? Number.MAX_SAFE_INTEGER : arr[index + 1],
    values: []
  }));

  features.forEach((feature) => {
    const featureValue = feature[columnName];

    const isValid = featureValue !== null && featureValue !== undefined;

    if (!isValid) {
      return;
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
    return transformedBins.map((values) => (values.length ? targetOperation(values) : 0));
  }

  return [];
}
