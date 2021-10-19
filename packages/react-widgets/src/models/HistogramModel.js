import { Methods, executeTask } from '@carto/react-workers';

export const getHistogram = async (props) => {
  const { column, operation, ticks, filters, dataSource } = props;

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_HISTOGRAM, {
    filters,
    operation,
    column,
    ticks
  });
};
