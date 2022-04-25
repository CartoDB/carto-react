import { executeSQL } from '@carto/react-api/';
import { AggregationTypes } from '@carto/react-core/';
import { Methods, executeTask } from '@carto/react-workers';
import {
  formatOperationColumn,
  formatTableNameWithFilters,
  normalizeObjectKeys,
  wrapModelCall
} from './utils';

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
  const { source, abortController } = props;
  const { credentials, connection } = source;

  const query = buildSqlQueryToGetCategories(props);

  return executeSQL({
    credentials,
    query,
    connection,
    opts: { abortController }
  }).then(normalizeObjectKeys);
}

function buildSqlQueryToGetCategories(props) {
  const { column, operation, operationColumn, joinOperation } = props;

  const selectValueClause = `${operation}(${
    operation === AggregationTypes.COUNT
      ? '*'
      : formatOperationColumn(operationColumn || column, joinOperation)
  }) as value`;

  return `SELECT COALESCE(${column}, 'null') as name, ${selectValueClause} FROM ${formatTableNameWithFilters(
    props
  )} GROUP BY ${column}`.trim();
}
