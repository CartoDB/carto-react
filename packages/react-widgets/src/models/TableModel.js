import { Methods, executeTask } from '@carto/react-workers';
import { wrapModelCall } from './utils';

export function getTable(props) {
  return wrapModelCall(props, fromLocal);
}

function fromLocal(props) {
  // Injecting sortByColumnType externally from metadata gives better results. It allows to avoid deriving type from row value itself (with potential null values)
  const {
    source,
    rowsPerPage,
    page,
    sortBy,
    sortDirection,
    sortByColumnType,
    resultFormat
  } = props;

  return executeTask(source.id, Methods.FEATURES_RAW, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    limit: rowsPerPage,
    page,
    sortBy,
    sortByDirection: sortDirection,
    sortByColumnType,
    resultFormat
  });
}
