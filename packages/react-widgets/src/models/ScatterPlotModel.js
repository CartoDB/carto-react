import { Methods, executeTask } from '@carto/react-workers';
import checkParams from './utils/checkParams';

export const getScatter = async (props) => {
  const {
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation,
    filters,
    dataSource
  } = props;

  checkParams({ joinOperation: xAxisJoinOperation, operationColumn: xAxisColumn });
  checkParams({ joinOperation: yAxisJoinOperation, operationColumn: yAxisColumn });

  return executeTask(dataSource, Methods.FEATURES_SCATTERPLOT, {
    filters,
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation
  });
};
