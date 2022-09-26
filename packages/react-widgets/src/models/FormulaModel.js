import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

export function getFormula(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
async function fromLocal(props) {
  const { source, operation, column, joinOperation } = props;

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
  const { source, abortController, ...params } = props;
  const { column, operation } = params;

  return _executeModel({
    model: 'formula',
    source,
    params: { column: column || '*', operation },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows[0]));
}
