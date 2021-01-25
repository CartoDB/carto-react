import { executeSQL } from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import { applyFilter } from '../../api/Filter';
import { aggregationFunctions } from '../operations/aggregation/values';
import { LayerTypes } from '../LayerTypes';

export const getFormula = async (props) => {
  const { data, credentials, operation, column, filters, opts, viewportFilter, viewportFeatures, type } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  if (type === LayerTypes.BQ && !viewportFilter) {
    throw new Error('Formula Widget error: BigQuery layers need "viewportFilter" prop set to true.');
  }

  if (viewportFilter) {
    const targetOperation = aggregationFunctions[operation];

    const features = viewportFeatures || [];
    const filteredFeatures = features.filter(applyFilter({ filters }));
    return [{ value: targetOperation(filteredFeatures, column) }];
  } else {
    let query = data;

    query = `
      SELECT ${operation}(${column}) as value
      FROM (${query}) as q
      ${filtersToSQL(filters)}
    `;

    return await executeSQL(credentials, query, opts);
  }
};
