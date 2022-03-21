import { Methods, executeTask } from '@carto/react-workers';
import checkParams from './utils/checkParams';

export const getFormula = async (props) => {
  const { operation, column, joinOperation, filters, dataSource } = props;

  checkParams({ joinOperation, operationColumn: column });

  return executeTask(dataSource, Methods.FEATURES_FORMULA, {
    filters,
    operation,
    joinOperation,
    column
  });
};
