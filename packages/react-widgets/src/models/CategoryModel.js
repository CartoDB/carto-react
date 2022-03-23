import { Methods, executeTask } from '@carto/react-workers';

export const getCategories = async (props) => {
  const { column, operationColumn, joinOperation, operation, filters, dataSource } = props;

  return executeTask(dataSource, Methods.FEATURES_CATEGORY, {
    filters,
    joinOperation,
    operation,
    column,
    operationColumn: operationColumn || column
  });
};
