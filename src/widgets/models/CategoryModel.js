import { executeSQL } from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import {groupValuesByColumn} from '../operations/grouping';

export const getCategories = async (props) => {
  const { data, credentials, column, operation, filters, viewport, dataSource, viewportFilter, viewportFeatures, type, opts } = props;

  const operationColumn = props.operationColumn || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  // TODO: need to move this computation to a webworker
  if (viewportFilter || type === 'bq') {
    const targetFeatures = viewportFeatures[dataSource];
 
    if (targetFeatures) {
      const groups = groupValuesByColumn(targetFeatures, operationColumn, column, operation);
      return await groups;
    }
  } else {
    let query =
      (viewport && `SELECT * FROM (${data})  as q`) ||
      data;

    query = `WITH all_categories as (
      SELECT ${column} as category
        FROM (${query}) as q
      GROUP BY category
    ),
    categories as (
      SELECT ${column} as category, ${operation}(${operationColumn}) as value
        FROM (${query}) as q
      ${filtersToSQL(filters)}
      GROUP BY category
    )
    SELECT a.category, b.value
      FROM all_categories a
      LEFT JOIN categories b ON a.category=b.category`;

    return await executeSQL(credentials, query, opts);
  }
};
