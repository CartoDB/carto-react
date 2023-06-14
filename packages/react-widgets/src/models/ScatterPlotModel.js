import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

// Make sure this is sync with the same constant in cloud-native/maps-api
export const HARD_LIMIT = 1000;

export function getScatter(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
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

function formatResult(res) {
  return res.map(({ x, y }) => [x, y]);
}

function fromRemote(props) {
  const { source, spatialFilter, abortController, ...params } = props;
  const { xAxisColumn, xAxisJoinOperation, yAxisColumn, yAxisJoinOperation } = params;

  return _executeModel({
    model: 'scatterplot',
    source,
    spatialFilter,
    params: {
      xAxisColumn,
      xAxisJoinOperation,
      yAxisColumn,
      yAxisJoinOperation,
      limit: HARD_LIMIT
    },
    opts: { abortController }
  })
    .then((res) => normalizeObjectKeys(res.rows))
    .then(formatResult);
}
