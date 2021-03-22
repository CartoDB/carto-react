import { Methods, executeTask } from '@carto/react-workers';

export const getFormula = async (props) => {
  const { data, operation, column, filters, dataSource } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get formula');
  }

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_FORMULA, {
    filters,
    operation,
    column
  });
};
