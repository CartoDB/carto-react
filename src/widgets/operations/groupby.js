import { aggregationFunctions } from './aggregation/values';

export function groupValuesByColumn(data, valuesColumn, keysColumn, operation) {
  if (Array.isArray(data) && data.length === 0) {
    return null;
  }

  const groups = data.reduce((accumulator, item) => {
    const group = item[keysColumn];

    accumulator[group] = accumulator[group] || [];

    const isValid = item[valuesColumn] !== null && item[valuesColumn] !== undefined;

    if (isValid) {
      accumulator[group].push(item[valuesColumn]);
    }

    return accumulator;
  }, {});

  const targetOperation = aggregationFunctions[operation];

  if (targetOperation) {
    return Object.entries(groups).map(([category, value]) => ({
      category,
      value: targetOperation(value)
    }));
  }

  return [];
}
