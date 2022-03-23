import { Methods, executeTask } from '@carto/react-workers';

export const getScatter = async (props) => {
  const {
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation,
    filters,
    filtersLogicalOperator,
    dataSource
  } = props;

  return executeTask(dataSource, Methods.FEATURES_SCATTERPLOT, {
    filters,
    filtersLogicalOperator,
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation
  });
};
