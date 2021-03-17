import { minify } from 'pgsql-minify';
import {
  _buildFeatureFilter as buildFeatureFilter,
  _filtersToSQL as filtersToSQL,
  scatterPlot
} from '@carto/react-core';
import { executeSQL, SourceTypes } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';

export const getScatter = async (props) => {
  const {
    data,
    credentials,
    xAxisColumn,
    yAxisColumn,
    filters,
    opts,
    viewportFilter,
    dataSource,
    type
  } = props;
  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get scatter plot');
  }
  if (type === SourceTypes.BIGQUERY && !viewportFilter) {
    throw new Error(
      'Scatter Widget error: BigQuery layer needs "viewportFilter" prop set to true.'
    );
  }
  if (viewportFilter) {
    return executeTask(dataSource, Methods.VIEWPORT_FEATURES_SCATTERPLOT, {
      filters,
      xAxisColumn,
      yAxisColumn
    });
  }
  const query = buildSqlQueryToGetScatter({
    data,
    xAxisColumn,
    yAxisColumn,
    filters
  });
  const queryResult = await executeSQL(credentials, query, opts);
  const result = scatterPlot(queryResult, xAxisColumn, yAxisColumn);
  return result;
};

export const buildSqlQueryToGetScatter = ({
  data,
  xAxisColumn,
  yAxisColumn,
  filters
}) => {
  const query = `
    SELECT 
      ${xAxisColumn}, ${yAxisColumn}
    FROM (${data}) as q1
    ${filtersToSQL(filters)}
  `;

  return minify(query);
};
