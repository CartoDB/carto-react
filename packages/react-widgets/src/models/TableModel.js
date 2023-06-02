import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

// Make sure this is sync with the same constant in cloud-native/maps-api
export const HARD_LIMIT = 100;

export function getTable(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

function fromLocal(props) {
  // Injecting sortByColumnType externally from metadata gives better results. It allows to avoid deriving type from row value itself (with potential null values)
  const { source, sortBy, sortDirection, sortByColumnType } = props;

  return executeTask(source.id, Methods.FEATURES_RAW, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    sortBy,
    sortByDirection: sortDirection,
    sortByColumnType
  });
}

export function paginateTable({ rows, totalCount }, page, rowsPerPage) {
  const sliced = rows.slice(
    Math.min(rowsPerPage * Math.max(0, page), totalCount),
    Math.min(rowsPerPage * Math.max(1, page + 1), totalCount)
  );
  const pages = Math.ceil(totalCount / rowsPerPage);
  return { rows: sliced, pages };
}

function formatResult(res) {
  const hasData = res.length > 0;
  // We can detect if the data is complete because we request HARD_LIMIT + 1
  const isDataComplete = res.length <= HARD_LIMIT;
  // The actual extra record is hidden from pagination logic
  const totalCount = isDataComplete ? res.length : HARD_LIMIT;
  return { rows: res, totalCount, hasData, isDataComplete };
}

// From remote
function fromRemote(props) {
  const { source, spatialFilter, abortController, ...params } = props;
  const { columns, sortBy, sortDirection } = params;

  return _executeModel({
    model: 'table',
    source,
    spatialFilter,
    params: { column: columns, sortBy, sortDirection, limit: HARD_LIMIT + 1 },
    opts: { abortController }
  })
    .then((res) => normalizeObjectKeys(res.rows))
    .then(formatResult);
}
