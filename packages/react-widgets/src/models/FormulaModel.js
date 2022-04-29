import { executeSQL } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import {
  formatOperationColumn,
  formatTableNameWithFilters,
  normalizeObjectKeys,
  wrapModelCall
} from './utils';

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
  const { source, abortController } = props;
  const { credentials, connection } = source;

  const query = buildSqlQueryToGetFormula(props);

  return executeSQL({
    credentials,
    query,
    connection,
    opts: { abortController }
  })
    .then(normalizeObjectKeys)
    .then((data) => data[0]);
}

const buildSqlQueryToGetFormula = (props) => {
  const { column, joinOperation, operation } = props;

  const selectClause = `${operation}(${formatOperationColumn(
    column,
    joinOperation
  )}) as value`;

  return `SELECT ${selectClause} FROM ${formatTableNameWithFilters(props)}`;
};
