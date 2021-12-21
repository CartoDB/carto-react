import { Methods, executeTask } from '@carto/react-workers';

export const getTableData = async (props) => {
  const { filters, dataSource, rowsPerPage, page, sortBy, sortDirection } = props;

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_RAW_FEATURES, {
    filters,
    limit: rowsPerPage,
    page,
    sortBy,
    sortByDirection: sortDirection
  });
};
