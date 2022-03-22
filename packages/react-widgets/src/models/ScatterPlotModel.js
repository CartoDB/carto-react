import { Methods, executeTask } from '@carto/react-workers';

export const getScatter = async (props) => {
  const {
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation,
    filters,
    dataSource
  } = props;

  return executeTask(dataSource, Methods.FEATURES_SCATTERPLOT, {
    filters,
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation
  });
};
