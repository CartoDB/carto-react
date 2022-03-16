import { AggregationTypes } from './constants/AggregationTypes';
import { aggregationFunctions, aggregate } from './aggregation';

export function groupValuesByColumn({
  data,
  valuesColumns,
  joinOperation,
  keysColumn,
  operation
}) {
  if (Array.isArray(data) && data.length === 0) {
    return null;
  }

  const groups = data.reduce((accumulator, item) => {
    const group = item[keysColumn];

    accumulator[group] = accumulator[group] || [];

    const aggregatedValue = aggregate(item, valuesColumns, joinOperation);

    const isValid =
      (operation === AggregationTypes.COUNT ? true : aggregatedValue !== null) &&
      aggregatedValue !== undefined;

    if (isValid) {
      accumulator[group].push(aggregatedValue);
    }

    return accumulator;
  }, {});

  const targetOperation = aggregationFunctions[operation];

  if (targetOperation) {
    return Object.entries(groups).map(([name, value]) => ({
      name,
      value: targetOperation(value)
    }));
  }

  return [];
}
