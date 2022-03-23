import { Methods, executeTask } from '@carto/react-workers';

export const getCategories = async (props) => {
  const {
    column,
    operationColumn,
    operation,
    filters,
    filtersLogicalOperator,
    dataSource
  } = props;

  return executeTask(dataSource, Methods.FEATURES_CATEGORY, {
    filters,
    filtersLogicalOperator,
    operation,
    column,
    operationColumn: operationColumn || column
  });
};
