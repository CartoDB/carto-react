import { executeSQL } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { formatTableNameWithFilters, wrapModelCall } from './utils';

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
  const { source, ticks, abortController } = props;
  const { credentials, connection } = source;

  const query = buildSqlQueryToGetHistogram(props);

  const data = await executeSQL({
    credentials,
    query,
    connection,
    opts: { abortController }
  });

  const result = Array(ticks.length + 1).fill(0);
  data.forEach(({ tick, value }) => (result[tick] = value));

  return result;
}

function buildSqlQueryToGetHistogram(props) {
  const { column, operation, ticks } = props;

  const caseTicks = ticks.map((t, index) => `WHEN ${column} < ${t} THEN ${index}`);
  caseTicks.push(`ELSE ${ticks.length}`);

  const selectValueClause = `${operation}(${column}) as value`;
  const selectTickClause = `CASE ${caseTicks.join(' ')} END as tick`;

  const subQuery = `SELECT ${selectTickClause}, ${column} FROM ${formatTableNameWithFilters(props)}`;

  return `SELECT tick, ${selectValueClause} FROM (${subQuery}) q GROUP BY tick`;
}
