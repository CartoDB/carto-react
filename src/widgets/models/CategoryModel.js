import { executeSQL } from '../../api';
import { filtersToSQL, viewportToSQL } from '../../api/FilterQueryBuilder';

export const getCategories = async (props) => {
  const { data, credentials, column, operation, filters, viewport, opts, alias = 'name' } = props;

  const operationColumn = props.operationColumn || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  let query =
    (viewport && `SELECT * FROM (${data})  as q WHERE ${viewportToSQL(viewport)}`) ||
    data;

  query = `WITH all_categories as (
    SELECT ${column} as ${alias}
      FROM (${query}) as q
    GROUP BY ${alias}
  ),
  categories as (
    SELECT ${column} as ${alias}, ${operation}(${operationColumn}) as value
      FROM (${query}) as q
    ${filtersToSQL(filters)}
    GROUP BY ${alias}
  )
  SELECT a.${alias}, b.value
    FROM all_categories a
    LEFT JOIN categories b ON a.${alias}=b.${alias}
  WHERE b.value IS NOT NULL`;

  return await executeSQL(credentials, query, opts);
};
