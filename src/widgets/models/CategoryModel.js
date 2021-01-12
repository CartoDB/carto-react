import { executeSQL } from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import { applyFilter } from '../../api/Filter';
import { groupValuesByColumn } from '../operations/groupby';

export const getCategories = async (props) => {
  const { data, credentials, column, operation, filters, viewportFilter, viewportFeatures, type, opts } = props;

  const operationColumn = props.operationColumn || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  if (type === 'bq' && !viewportFilter) {
    throw new Error('Category Widget error: BigQuery layers needs "viewportFilter" prop set to true.');
  }

  // It's an await because we probably will move this calculation need to a webworker
  if (viewportFilter) {
    const features = viewportFeatures || [];
    const filteredFeatures = features.filter(applyFilter({ filters }));
    const groups = groupValuesByColumn(filteredFeatures, operationColumn, column, operation);
    return groups;
  } else {
    let query = data;

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
