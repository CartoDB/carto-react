import { Methods, executeTask } from '@carto/react-workers';

export const getScatter = async (props) => {
  const { xAxisColumn, yAxisColumn, filters, filtersLogicalOperator, dataSource } = props;

  return executeTask(dataSource, Methods.FEATURES_SCATTERPLOT, {
    filters,
    filtersLogicalOperator,
    xAxisColumn,
    yAxisColumn
  });
};
