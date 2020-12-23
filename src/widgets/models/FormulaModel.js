import { executeSQL} from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import {aggregationFunctions} from '../operations/aggregation/values';

export const getFormula = async (props) => {
  const { data, credentials, operation, column, filters, viewport, opts, dataSource, viewportFilter, viewportFeatures, type } = props;


  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  // TODO: need to move this computation to a webworker
  if (viewportFilter || type === 'bq') {
    const operations = aggregationFunctions();
    const targetOperation = operations[operation];
    const targetFeatures = viewportFeatures[dataSource];

    if (targetOperation && targetFeatures) {
      return await [{ value: targetOperation(targetFeatures, column) }];
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
