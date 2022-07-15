import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

export function getSlider(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal(props) {
  const { source, column } = props;

  return executeTask(source.id, Methods.FEATURES_MIN_MAX, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    column
  });
}

// From remote
function fromRemote(props) {
  const { source, abortController, ...params } = props;
  const { column } = params;

  return _executeModel({
    model: 'range',
    source,
    params: { column },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows[0]));
}
