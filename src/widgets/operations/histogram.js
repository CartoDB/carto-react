import { aggregationFunctions } from './aggregation/values';

export function histogram(features, columnName, ticks, operation) {
  if (Array.isArray(features) && features.length === 0) {
    return [];
  }

  ticks = [Number.MIN_SAFE_INTEGER, ...ticks, Number.MAX_SAFE_INTEGER];

  const binsContainer = ticks.map((tick, idx, arr) => ({
    bin: idx,
    start: tick,
    end: arr[idx + 1],
    values: []
  }));

  features.forEach((feature) => {
    const featureValue = feature.properties[columnName];

    if (!featureValue) {
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

    return transformedBins.map((val) => {
      const processedValues = targetOperation(val);
      return Number.isFinite(processedValues) ? processedValues : 0;
    });
  }

  return [];
}
