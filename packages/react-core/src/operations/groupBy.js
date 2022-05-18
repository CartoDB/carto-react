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

    const values = accumulator.get(group) || []
    accumulator.set(group, values)

    const aggregatedValue = aggregate(item, valuesColumns, joinOperation);

    const isValid =
      (operation === AggregationTypes.COUNT ? true : aggregatedValue !== null) &&
      aggregatedValue !== undefined;

    if (isValid) {
      values.push(aggregatedValue)
      accumulator.set(group, values);
    }

    return accumulator;
  }, new Map());


  const targetOperation = aggregationFunctions[operation];

  if (targetOperation) {
    return Array.from(groups).map(([name, value]) => ({
      name,
      value: targetOperation(value)
    }));
  }

  return [];
}
