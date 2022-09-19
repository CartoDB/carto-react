import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';
import { setRemoteForeignSourceFilter } from '../hooks/sourceLinkUtils';

export function getFormula(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal(props) {
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
  const { source, abortController, foreignSource, ...params } = props;
  const { column, operation } = params;

  let remoteSource = source;
  if (source.foreignFilteringSource && foreignSource) {
    remoteSource = setRemoteForeignSourceFilter(source, foreignSource);
  }

  return _executeModel({
    model: 'formula',
    source: remoteSource,
    params: { column: column || '*', operation },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows[0]));
}
