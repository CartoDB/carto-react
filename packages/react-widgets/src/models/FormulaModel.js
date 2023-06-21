import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';
import { AggregationTypes } from '@carto/react-core';

export function getFormula(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal(props) {
  const { source, operation, column, joinOperation } = props;

  if (operation === AggregationTypes.CUSTOM) {
    throw new Error('Custom aggregation not supported for local widget calculation');
  }
  return executeTask(source.id, Methods.FEATURES_FORMULA, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    operation,
    joinOperation,
    column
  });
}

// From remote
function fromRemote(props) {
  const { source, spatialFilter, abortController, client, operationExp, ...params } = props;
  const { column, operation } = params;

  return _executeModel({
    model: 'formula',
    source,
    spatialFilter,
    client,
    params: { column: column ?? '*', operation, operationExp },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows[0]));
}
