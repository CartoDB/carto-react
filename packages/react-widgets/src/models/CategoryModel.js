import { Methods, executeTask } from '@carto/react-workers';

export const getCategories = async (props) => {
  const {
    column,
    operationColumn,
    operation,
    joinOperation,
    filters,
    filtersLogicalOperator,
    dataSource
  } = props;

  return executeTask(dataSource, Methods.FEATURES_CATEGORY, {
    filters,
    filtersLogicalOperator,
    operation,
    joinOperation,
    column,
    operationColumn: operationColumn || column
  });
};
