import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

export function getHistogram(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal(props) {
  const { source, column, operation, ticks } = props;

  return executeTask(source.id, Methods.FEATURES_HISTOGRAM, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    operation,
    column,
    ticks
  });
}

// From remote
async function fromRemote(props) {
  const { source, spatialFilter, abortController, ...params } = props;
  const { column, operation, ticks } = params;

  const data = await _executeModel({
    model: 'histogram',
    source,
    spatialFilter,
    params: { column, operation, ticks },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows));

  if (data.length) {
    const result = Array(ticks.length + 1).fill(0);
    data.forEach(({ tick, value }) => (result[tick] = value));
    return result;
  }

  return [];
}
