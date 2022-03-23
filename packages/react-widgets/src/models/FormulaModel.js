import { Methods, executeTask } from '@carto/react-workers';

export const getFormula = async (props) => {
  const { operation, column, filters, filtersLogicalOperator, dataSource } = props;

  return executeTask(dataSource, Methods.FEATURES_FORMULA, {
    filters,
    filtersLogicalOperator,
    operation,
    column
  });
};
