import {aggregationFunctions} from './aggregation/values';

export function histogram(features, columnName, ticks, operation, start, end, bins) {
  let binsContainer = [];

  if (Number.isFinite(bins) && bins > 0) {
    let sortedFeatures = [];

    if (start === null || start === undefined || end === null || end === undefined) {
      sortedFeatures = features
        .map(feature => feature.properties[columnName])
        .sort((a, b) => a - b);
    }

    const startValue = start ?? sortedFeatures[0];
    const endValue = end ?? sortedFeatures[sortedFeatures.length - 1];

    const binsDistance = (endValue - startValue) / bins;

    binsContainer = Array(bins)
      .fill(bins)
      .map((_, currentIndex) => ({
        bin: currentIndex,
        start: startValue + currentIndex * binsDistance,
        end: startValue + currentIndex * binsDistance + binsDistance,
        values: []
      }));
  } else {
    binsContainer = ticks
      .map((tick, currentIndex, arr) => {
        if (Number.isFinite(arr[currentIndex + 1])) {
          return {
            bin: currentIndex,
            start: tick,
            end: arr[currentIndex + 1],
            values: []
          };
        }

        return;
      })
      .filter(Boolean);
  }

  features.forEach(feature => {
      const featureValue = feature.properties[columnName];

      const binContainer = binsContainer.find(
        bin => bin.start <= featureValue && bin.end > featureValue
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