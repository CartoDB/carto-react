import { Methods, executeTask } from '@carto/react-workers';
import checkParams from './utils/checkParams';

export const getCategories = async (props) => {
  const { column, operationColumn, joinOperation, operation, filters, dataSource } = props;

  checkParams({ joinOperation, operationColumn });

  return executeTask(dataSource, Methods.FEATURES_CATEGORY, {
    filters,
    joinOperation,
    operation,
    column,
    operationColumn: operationColumn || column
  });
};
