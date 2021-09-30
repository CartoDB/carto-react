import { Methods, executeTask } from '@carto/react-workers';

export const getScatter = async (props) => {
  const { xAxisColumn, yAxisColumn, filters, dataSource } = props;

  return executeTask(dataSource, Methods.VIEWPORT_FEATURES_SCATTERPLOT, {
    filters,
    xAxisColumn,
    yAxisColumn
  });
};
