import { _executeModel } from '@carto/react-api/';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

export function getCategories(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal(props) {
  const { source, column, operationColumn, operation, joinOperation } = props;

  return executeTask(source.id, Methods.FEATURES_CATEGORY, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    operation,
    joinOperation,
    column,
    operationColumn: operationColumn || column
  });
}

// From remote
function fromRemote(props) {
  const { source, abortController, ...params } = props;

  return _executeModel({
    model: 'category',
    source,
    params: {
      ...params,
      operationColumn: params.operationColumn || params.column
    },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows));
}
