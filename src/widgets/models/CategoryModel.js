import { minify } from 'pgsql-minify';

import { executeSQL } from '../../api';
import { filtersToSQL, viewportToSQL } from '../../api/FilterQueryBuilder';

/**
 * Execute a query against SQL API to get Categories defined by props
 */
export const getCategories = async (props) => {
  const { credentials, opts, ...propsForQuery } = props;
  const query = buildSqlQueryToGetCategories(propsForQuery);

  return await executeSQL(credentials, query, opts);
};

/**
 * Build a SQL sentence to get Categories defined by props
 */
export const buildSqlQueryToGetCategories = (props) => {
  const { data, column, operation, filters, viewport } = props;

  const operationColumn = props.operationColumn || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  let query =
    (viewport && `SELECT * FROM (${data}) as q WHERE ${viewportToSQL(viewport)}`) ||
    data;

  query = `
    WITH all_categories as (
      SELECT
        ${column} as category
      FROM
        (${query}) as q
      GROUP BY category
    ),
    categories as (
      SELECT
        ${column} as category, ${operation}(${operationColumn}) as value
      FROM
        (${query}) as q
      ${filtersToSQL(filters)}
      GROUP BY category
    )
    SELECT
      a.category, b.value
    FROM
      all_categories a
    LEFT JOIN categories b ON a.category=b.category
  `;

  return minify(query);
}
