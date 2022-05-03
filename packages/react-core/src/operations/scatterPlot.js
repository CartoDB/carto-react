import { aggregate } from './aggregation';

// Filters invalid features and formats  data
export function scatterPlot({
  data,
  xAxisColumns,
  xAxisJoinOperation,
  yAxisColumns,
  yAxisJoinOperation
}) {
  return data.reduce((acc, feature) => {
    const xValue = aggregate(feature, xAxisColumns, xAxisJoinOperation);
    const xIsValid = xValue !== null && xValue !== undefined;
    const yValue = aggregate(feature, yAxisColumns, yAxisJoinOperation);
    const yIsValid = yValue !== null && yValue !== undefined;

    if (xIsValid && yIsValid) {
      acc.push([xValue, yValue]);
    }

    return acc;
  }, []);
}
