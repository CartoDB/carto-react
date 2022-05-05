import { aggregate, aggregationFunctions } from './aggregation';

export function histogram({ data, valuesColumns, joinOperation, ticks, operation }) {
  if (Array.isArray(data) && data.length === 0) {
    return [];
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
