import {aggregationFunctions} from './aggregation/values';

export function histogram(features, columnName, ticks, operation) {
  ticks = [Number.MIN_SAFE_INTEGER, ...ticks];

  const binsContainer = ticks
    .map((tick, currentIndex, arr) => ({
      bin: currentIndex,
      start: tick,
      end: arr[currentIndex + 1],
      values: []
    }));

  features.forEach(feature => {
      const featureValue = feature.properties[columnName];

      const binContainer = binsContainer.find(
        bin => bin.start < featureValue && bin.end > featureValue
      );

      if (!binContainer) {
        return;
      }

      binContainer.values.push(featureValue);
  });

  const transformedBins = binsContainer.map(binContainer => binContainer.values);

  const operations = aggregationFunctions();
  const targetOperation = operations[operation];

  if (targetOperation) {
    return transformedBins.map((val) => targetOperation(val));
  }

  return [];
}