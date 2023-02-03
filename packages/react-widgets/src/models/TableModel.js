import { Methods, executeTask } from '@carto/react-workers';
import { wrapModelCall } from './utils';

export function getTable(props) {
  return wrapModelCall(props, fromLocal);
}

function fromLocal(props) {
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
