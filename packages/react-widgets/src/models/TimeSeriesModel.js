import { Methods, executeTask } from '@carto/react-workers';
import checkParams from './utils/checkParams';

export const getTimeSeries = async (props) => {
  const {
    filters,
    dataSource,
    column,
    operationColumn,
    joinOperation,
    operation,
    stepSize
  } = props;

  checkParams({ joinOperation, operationColumn });

  return executeTask(dataSource, Methods.FEATURES_TIME_SERIES, {
    filters,
    column,
    stepSize,
    operationColumn: operationColumn || column,
    joinOperation,
    operation
  });
};
