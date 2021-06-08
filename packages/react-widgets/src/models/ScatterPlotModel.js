import { Methods, executeTask } from '@carto/react-workers';

export const getScatter = async (props) => {
  const { data, xAxisColumn, yAxisColumn, filters, dataSource } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get scatter plot');
  }

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_SCATTERPLOT, {
    filters,
    xAxisColumn,
    yAxisColumn
  });
};
