import { executeSQL } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { formatTableNameWithFilters, normalizeObjectKeys, wrapModelCall } from './utils';

export function getHistogram(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal(props) {
  const { source, column, operation, ticks, bins } = props;

  return executeTask(source.id, Methods.FEATURES_HISTOGRAM, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    bins,
    operation,
    column,
    ticks
  });
}

// From remote
async function fromRemote(props) {
  const { source, ticks, bins, abortController } = props;
  const { credentials, connection } = source;

  const query = buildSqlQueryToGetHistogram(props);

  const data = await executeSQL({
    credentials,
    query,
    connection,
    opts: { abortController }
  }).then(normalizeObjectKeys);

  const nBreaks = ticks.length ? ticks.length + 1 : bins;

  const result = Array(nBreaks).fill(0);
  data.forEach(({ tick, value }) => (result[tick] = value));

  const min = data[0]._min;
  const max = data[0]._max;

  return {
    min,
    max,
    data: result,
    ticks: ticks.length
      ? ticks
      : Array(nBreaks - 1)
          .fill(0)
          .map((_, index) => min + (max - min) * ((index + 1) / nBreaks))
  };
}

function buildSqlQueryToGetHistogram(props) {
  const { column, operation, ticks, bins } = props;

  const breaks = ticks.length ? ticks : Array(bins - 1).fill(-1);
  const caseTicks = breaks.map(
    (t, index) =>
      `WHEN ${column} < ${
        t === -1
          ? `(minMax._min + (minMax._max - minMax._min) * (${index + 1} / ${bins}))`
          : t
      } THEN ${index}`
  );
  caseTicks.push(`ELSE ${breaks.length}`);

  const selectValueClause = `${operation}(${column}) as value`;
  const selectTickClause = `CASE ${caseTicks.join(' ')} END as tick`;

  const tableName = formatTableNameWithFilters(props);

  const minMaxQuery = `SELECT MIN(${column}) _min, MAX(${column}) _max FROM ${tableName}`;

  const subQuery = `SELECT ${selectTickClause}, ${column}, minMax.* FROM ${tableName}, (${minMaxQuery}) minMax`;

  return `SELECT tick, ${selectValueClause}, MIN(q._min) _min, MAX(q._max) _max FROM (${subQuery}) q GROUP BY tick`;
}
