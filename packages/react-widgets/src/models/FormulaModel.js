import { minify } from 'pgsql-minify';
import { _filtersToSQL as filtersToSQL } from '@carto/react-core';
import { executeSQL, SourceTypes } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';

export const getFormula = async (props) => {
  const {
    data,
    credentials,
    operation,
    column,
    filters,
    opts,
    viewportFilter,
    dataSource,
    type
  } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get formula');
  }

  if (type === SourceTypes.BIGQUERY && !viewportFilter) {
    throw new Error(
      'Formula Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  }

  if (viewportFilter) {
    return executeTask(dataSource, Methods.VIEWPORT_FEATURES_FORMULA, {
      filters,
      operation,
      column
    });
  }

  const query = buildSqlQueryToGetFormula({ data, column, operation, filters });
  return await executeSQL(credentials, query, opts);
};

/**
 * Build a SQL sentence to get Formula defined by props
 */
export const buildSqlQueryToGetFormula = ({ data, column, operation, filters }) => {
  const query = `
    SELECT 
      ${operation}(${column}) as value
    FROM 
      (${data}) as q
    ${filtersToSQL(filters)}
  `;

  return minify(query);
};