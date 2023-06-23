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
  const { source, spatialFilter, abortController, client, ...params } = props;
  const { column, operation, operationColumn } = params;

  return _executeModel({
    model: 'category',
    source,
    spatialFilter,
    client,
    params: {
      column,
      operation,
      operationColumn: operationColumn || column
    },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows));
}
