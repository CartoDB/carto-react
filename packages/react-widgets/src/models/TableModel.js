import { Methods, executeTask } from '@carto/react-workers';

export const getTable = async (props) => {
  const {
    filters,
    filtersLogicalOperator,
    dataSource,
    rowsPerPage,
    page,
    sortBy,
    sortDirection
  } = props;

  return executeTask(dataSource, Methods.FEATURES_RAW, {
    filters,
    filtersLogicalOperator,
    limit: rowsPerPage,
    page,
    sortBy,
    sortByDirection: sortDirection
  });
};
