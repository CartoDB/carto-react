import { minify } from 'pgsql-minify';

import { executeSQL} from '../../api';
import { filtersToSQL, viewportToSQL } from '../../api/FilterQueryBuilder';

/**
 * Execute a query against SQL API to get Formula defined by props
 */
export const getFormula = async (props) => {
  const { credentials, opts, ...propsForQuery } = props;
  const query = buildSqlQueryToGetFormula(propsForQuery);
  
  return await executeSQL(credentials, query, opts);
};

/**
 * Build a SQL sentence to get Formula defined by props 
 */
export const buildSqlQueryToGetFormula = (props) => {
  const { data, column, operation, filters, viewport } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get formula');
  }

  let query =
    (viewport && `SELECT * FROM (${data}) as q WHERE ${viewportToSQL(viewport)}`) ||
    data;

  query = `
    SELECT 
      ${operation}(${column}) as value
    FROM 
      (${query}) as q
    ${filtersToSQL(filters)}
  `;

  return minify(query);

}
