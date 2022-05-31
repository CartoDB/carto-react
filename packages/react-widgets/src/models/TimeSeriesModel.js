import { executeSQL, _executeModel } from '@carto/react-api/';
import {
  AggregationTypes,
  getMonday,
  GroupDateTypes,
  groupValuesByDateColumn
} from '@carto/react-core/';
import { Methods, executeTask } from '@carto/react-workers';
import {
  formatOperationColumn,
  formatTableNameWithFilters,
  normalizeObjectKeys,
  wrapModelCall
} from './utils';

export function getTimeSeries(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal({
  source,
  column,
  operationColumn,
  joinOperation,
  operation,
  stepSize
}) {
  return executeTask(source.id, Methods.FEATURES_TIME_SERIES, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    column,
    stepSize,
    operationColumn: operationColumn || column,
    joinOperation,
    operation
  });
}

// From remote
function fromRemote(props) {
  const { source, abortController, ...params } = props;
  const { column, operationColumn, joinOperation, operation, stepSize } = params;

  return _executeModel({
    model: 'timeseries',
    source,
    params: {
      column,
      stepSize,
      operationColumn: operationColumn || column,
      joinOperation,
      operation
    },
    opts: { abortController }
  }).then((res) => normalizeObjectKeys(res.rows));
}
