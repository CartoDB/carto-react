import { Methods, executeTask } from '@carto/react-workers';

export const getFormula = async (props) => {
  const { operation, column, joinOperation, filters, dataSource } = props;

  return executeTask(dataSource, Methods.FEATURES_FORMULA, {
    filters,
    operation,
    joinOperation,
    column
  });
};
