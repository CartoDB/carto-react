import { Methods, executeTask } from '@carto/react-workers';

export const getTimeSeries = async (props) => {
  const { filters, dataSource, column, operationColumn, operation, stepSize } = props;

  return executeTask(dataSource, Methods.FEATURES_TIME_SERIES, {
    filters,
    column,
    stepSize,
    operationColumn: operationColumn || column,
    operation
  });
};
