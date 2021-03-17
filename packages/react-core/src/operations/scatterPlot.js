/**
 * Filters invalid features and formats  data
 */
export const scatterPlot = (features, xAxisColumn, yAxisColumn) =>
  features
    .filter((feature) => {
      const xValue = feature[xAxisColumn];
      const xIsValid = xValue !== null && xValue !== undefined;
      const yValue = feature[yAxisColumn];
      const yIsValid = yValue !== null && yValue !== undefined;
      return xIsValid && yIsValid;
    })
    .map((feature) => [feature[xAxisColumn], feature[yAxisColumn]]);
