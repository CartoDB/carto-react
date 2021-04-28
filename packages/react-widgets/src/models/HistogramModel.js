import { Methods, executeTask } from '@carto/react-workers';

export const getHistogram = async (props) => {
  const { data, column, operation, ticks, filters, dataSource } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get histogram');
  }

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_HISTOGRAM, {
    filters,
    operation,
    column,
    ticks
  });
};
