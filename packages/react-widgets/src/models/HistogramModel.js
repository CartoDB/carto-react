import { executeSQL, _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { formatTableNameWithFilters, normalizeObjectKeys, wrapModelCall } from './utils';

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
  const { source, abortController, ...params } = props;

  const { ticks } = params;

  const data = await _executeModel({
    model: 'histogram',
    source,
    params,
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows));

  const result = Array(ticks.length + 1).fill(0);
  data.forEach(({ tick, value }) => (result[tick] = value));

  return result;
}
