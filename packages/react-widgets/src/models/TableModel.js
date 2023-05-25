import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

// Make sure this is sync with the same constant in cloud-native/maps-api
const HARD_LIMIT = 100;

export function getTable(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

function fromLocal(props) {
  // Injecting sortByColumnType externally from metadata gives better results. It allows to avoid deriving type from row value itself (with potential null values)
  const { source, rowsPerPage, page, sortBy, sortDirection, sortByColumnType } = props;

  return executeTask(source.id, Methods.FEATURES_RAW, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    limit: rowsPerPage,
    page,
    sortBy,
    sortByDirection: sortDirection,
    sortByColumnType
  });
}

// @todo we need to cache res somehow otherwise we'll hit the API
// at every page change, HTTP cache saves us but better to avoid

function paginationResult(res, rowsPerPage, page) {
  const data = res.slice(
    rowsPerPage * Math.max(0, page),
    rowsPerPage * Math.max(1, page + 1)
  );
  // We can detect if the data is complete because we request HARD_LIMIT + 1
  const isDataComplete = res.length <= HARD_LIMIT;
  // The actual extra record is hidden from pagination
  const totalCount = isDataComplete ? res.length : HARD_LIMIT;
  const pages = Math.ceil(totalCount / rowsPerPage);
  const result = { data, currentPage: page, pages, totalCount, isDataComplete };
  return result;
}

// From remote
function fromRemote(props) {
  const { source, rowsPerPage, page, spatialFilter, abortController, ...params } = props;
  const { columns, sortBy, sortDirection } = params;

  return _executeModel({
    model: 'table',
    source,
    spatialFilter,
    params: { column: columns, sortBy, sortDirection, limit: HARD_LIMIT + 1 },
    opts: { abortController }
  })
    .then((res) => normalizeObjectKeys(res.rows))
    .then((res) => paginationResult(res, rowsPerPage, page));
}
