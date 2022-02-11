import { AggregationTypes } from './aggregation/AggregationTypes';
import { aggregationFunctions } from './aggregation/values';

export function groupValuesByColumn(data, valuesColumn, keysColumn, operation) {
  if (Array.isArray(data) && data.length === 0) {
    return null;
  }

  const groups = data.reduce((accumulator, item) => {
    const group = item[keysColumn];

    accumulator[group] = accumulator[group] || [];

    const isUndefined = item[valuesColumn] === undefined;
    const isNull = item[valuesColumn] === null;
    const isValid =
      operation === AggregationTypes.COUNT ? !isUndefined : !isUndefined && !isNull;

    if (isValid) {
      accumulator[group].push(isNull ? 1 : item[valuesColumn]);
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
