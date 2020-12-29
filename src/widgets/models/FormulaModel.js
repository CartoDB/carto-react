import { executeSQL} from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import {aggregationFunctions} from '../operations/aggregation/values';
import {filterApplicatorForFeatures} from '../../api/FilterApplicatorForFeatures';

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
    const operations = aggregationFunctions();
    const targetOperation = operations[operation];

    if (targetOperation) {
      if (filters && Object.keys(filters).length) {
        const filteredFeatures = filterApplicatorForFeatures.filter(viewportFeatures, filters);
        return await [{ value: targetOperation(filteredFeatures, column) }];
      }

      return await [{ value: targetOperation(viewportFeatures || [], column) }];
    }
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
