import { Methods, executeTask } from '@carto/react-workers';

export const getCategories = async (props) => {
  const { data, column, operationColumn, operation, filters, dataSource } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_CATEGORY, {
    filters,
    operation,
    column,
    operationColumn: operationColumn || column
  });
};
