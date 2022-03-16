import { aggregate } from './aggregation';

// Filters invalid features and formats  data
export function scatterPlot({ data, xAxisColumns, yAxisColumns, joinOperation }) {
  return data.reduce((acc, feature) => {
    const xValue = aggregate(feature, xAxisColumns, joinOperation);
    const xIsValid = xValue !== null && xValue !== undefined;
    const yValue = aggregate(feature, yAxisColumns, joinOperation);
    const yIsValid = yValue !== null && yValue !== undefined;

    if (xIsValid && yIsValid) {
      acc.push([xValue, yValue]);
    }

    return acc;
  }, []);
}
