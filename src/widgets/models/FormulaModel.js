import { minify } from 'pgsql-minify';

import { executeSQL } from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import { buildFeatureFilter } from '../../api/Filter';
import { aggregationFunctions } from '../operations/aggregation/values';
import { LayerTypes } from '../LayerTypes';

export const getFormula = async (props) => {
  const {
    data,
    credentials,
    operation,
    column,
    filters,
    opts,
    viewportFilter,
    viewportFeatures,
    type
  } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get formula');
  }

  if (type === LayerTypes.BIGQUERY && !viewportFilter) {
    throw new Error(
      'Formula Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  }

  if (viewportFilter) {
    return filterViewportFeaturesToGetFormula({
      viewportFeatures,
      filters,
      operation,
      column
    });
  }

  const query = buildSqlQueryToGetFormula({ data, column, operation, filters });
  return await executeSQL(credentials, query, opts);
};

/**
 * Build a SQL sentence to get Formula defined by props
 */
export const buildSqlQueryToGetFormula = ({ data, column, operation, filters }) => {
  const query = `
    SELECT 
      ${operation}(${column}) as value
    FROM 
      (${data}) as q
    ${filtersToSQL(filters)}
  `;

  return minify(query);
};

/**
 * Filter viewport features to get Formula defined by props
 */
export const filterViewportFeaturesToGetFormula = ({
  viewportFeatures,
  filters,
  operation,
  column
}) => {
  if (viewportFeatures) {
    const targetOperation = aggregationFunctions[operation];

    const filteredFeatures = !Object.keys(viewportFeatures).length
      ? viewportFeatures
      : viewportFeatures.filter(buildFeatureFilter({ filters }));

    return [{ value: targetOperation(filteredFeatures, column) }];
  }

  return [{ value: null }];
};
