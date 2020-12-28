import {aggregationFunctions} from './aggregation/values';

export function groupValuesByColumn(data, valuesColumn, keysColumn, operation) {
  const groups = data.reduce(
    (accumulator, item) => {
      const group = item.properties[keysColumn];

      accumulator[group] = accumulator[group] || [];

      const isValid = item.properties[valuesColumn] !== null && item.properties[valuesColumn] !== undefined;
  
      if (isValid) {
        accumulator[group].push(item.properties[valuesColumn]);
      }

      return accumulator;
    },
    {}
  );

  const operations = aggregationFunctions();
  const targetOperation = operations[operation];

  if (targetOperation) {
    return Object.entries(groups).map(([category, value]) => ({category, value: targetOperation(value)}));
  }
  
  return [];
}