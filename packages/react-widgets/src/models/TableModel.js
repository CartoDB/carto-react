import { _executeModel } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';

export function getTable(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

function fromLocal(props) {
  // Injecting sortByColumnType externally from metadata gives better results. It allows to avoid deriving type from row value itself (with potential null values)
  const {
    source,
    sortBy,
    sortDirection,
    sortByColumnType,
    page,
    rowsPerPage,
    searchFilterText,
    searchFilterColumn
  } = props;

  return executeTask(source.id, Methods.FEATURES_RAW, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    searchFilterText,
    searchFilterColumn,
    sortBy,
    sortByDirection: sortDirection,
    sortByColumnType,
    page,
    rowsPerPage
  });
}

function formatResult(res) {
  const { rows, totalCount } = res;
  const hasData = totalCount > 0;
  return { rows, totalCount, hasData };
}

// From remote
function fromRemote(props) {
  const {
    source,
    spatialFilter,
    searchFilterText,
    searchFilterColumn,
    abortController,
    ...params
  } = props;
  const { columns, sortBy, sortDirection, page, rowsPerPage } = params;

  const searchFilter =
    searchFilterText && searchFilterColumn
      ? { [searchFilterColumn]: { stringSearch: { values: [searchFilterText] } } }
      : null;

  return _executeModel({
    model: 'table',
    source,
    spatialFilter,
    ...(searchFilter && { searchFilter }),
    params: {
      column: [...new Set(columns)],
      sortBy,
      sortDirection,
      limit: rowsPerPage,
      offset: page * rowsPerPage
    },
    opts: { abortController }
  })
    .then((res) => ({
      rows: normalizeObjectKeys(res.rows),
      totalCount: res.metadata.total
    }))
    .then(formatResult);
}
