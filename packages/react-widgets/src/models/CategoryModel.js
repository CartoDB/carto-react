import { Methods, executeTask } from '@carto/react-workers';

export const getCategories = async (props) => {
  const { column, operationColumn, operation, filters, dataSource } = props;

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_CATEGORY, {
    filters,
    operation,
    column,
    operationColumn: operationColumn || column
  });
};
