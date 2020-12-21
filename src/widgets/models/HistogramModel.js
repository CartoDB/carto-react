import { minify } from 'pgsql-minify';

import { executeSQL } from '../../api';
import { filtersToSQL, viewportToSQL } from '../../api/FilterQueryBuilder';
import { buildSqlQueryToGetCategories } from './CategoryModel';

/**
 * Execute a query against SQL API to get Histogram defined by props
 */
export const getHistogram = async (props) => {
  const { credentials, opts, ...propsForQuery } = props;
  const query = buildSqlQueryToGetHistogram(propsForQuery);

  const queryResult = await executeSQL(credentials, query, opts);

  const result = [];
  for (let i = 0; i <= propsForQuery.ticks.length; i++) {
    const tick = `cat_${i}`;
    const element = queryResult.find((d) => d.tick === tick);
    result.push(element ? element.value : null);
  }

  return result;
};

/**
 * Build a SQL sentence to get Histogram defined by props
 */
export const buildSqlQueryToGetHistogram = (props) => {
  const { data, column, operation, ticks, filters, viewport } = props;

  const operationColumn = props.operationColumn || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get histogram');
  }

  let query =
    (viewport && `SELECT * FROM (${data}) as q WHERE ${viewportToSQL(viewport)}`) ||
    data;

  const caseTicks = ticks.map((t, index) => `WHEN ${column} < ${t} THEN 'cat_${index}'`);
  caseTicks.push(`ELSE 'cat_${ticks.length}'`);

  query = `
    SELECT 
      tick, ${operation}(${operationColumn}) as value
    FROM 
      (
        SELECT 
          CASE ${caseTicks.join(' ')} END as tick, ${operationColumn} 
        FROM (
          SELECT 
            * 
          FROM (${query}) as q2
          ${filtersToSQL(filters)}
        ) as q1
      ) as q
    GROUP BY tick
  `;
  
  return minify(query);
}