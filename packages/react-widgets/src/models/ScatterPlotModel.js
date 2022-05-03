import { Methods, executeTask } from '@carto/react-workers';
import { wrapModelCall } from './utils';

export function getScatter(props) {
  return wrapModelCall(props, fromLocal);
}

function fromLocal(props) {
  const { source, xAxisColumn, xAxisJoinOperation, yAxisColumn, yAxisJoinOperation } =
    props;

  return executeTask(source.id, Methods.FEATURES_SCATTERPLOT, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    xAxisColumn,
    xAxisJoinOperation,
    yAxisColumn,
    yAxisJoinOperation
  });
}
