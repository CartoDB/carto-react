import { executeSQL} from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import { filterApplicator } from '../../api/FilterApplicator';
import { aggregationFunctions } from '../operations/aggregation/values';

export const getFormula = async (props) => {
  const { data, credentials, operation, column, filters, viewport, opts, viewportFilter, viewportFeatures, type } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  if (type === 'bq' && !viewportFilter) {
    throw new Error('Formula Widget error: BigQuery layers needs "viewportFilter" prop set to true.');
  }

  // It's an await because we probably will move this calculation need to a webworker
  if (viewportFilter) {
    if (viewportFeatures) {
      const operations = aggregationFunctions();
      const targetOperation = operations[operation];

      if (filters && Object.keys(filters).length) {
        const filteredFeatures = viewportFeatures.filter(feat => filterApplicator(feat, filters));
        return await [{ value: targetOperation(filteredFeatures, column) }];
      }

      return await [{ value: targetOperation(viewportFeatures, column) }];
    }

    return [];
  } else {
    let query =
      (viewport && `SELECT * FROM (${data})  as q`) ||
      data;

    query = `
      SELECT ${operation}(${column}) as value
      FROM (${query}) as q
      ${filtersToSQL(filters)}
    `;

    return await executeSQL(credentials, query, opts);
  }
};
