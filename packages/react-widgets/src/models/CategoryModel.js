import { minify } from 'pgsql-minify';
import { 
  _buildFeatureFilter as buildFeatureFilter, 
  _filtersToSQL as filtersToSQL, 
  groupValuesByColumn
} from '@carto/react-core';

import { executeSQL, SourceTypes } from '@carto/react-api'

export const getCategories = async (props) => {
  const {
    data,
    credentials,
    column,
    operation,
    filters,
    viewportFilter,
    viewportFeatures,
    type,
    opts,
    alias = 'name'
  } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  if (type === SourceTypes.BIGQUERY && !viewportFilter) {
    throw new Error(
      'Category Widget error: BigQuery layers need "viewportFilter" prop set to true.'
    );
  }

  const operationColumn = props.operationColumn || column;

  if (viewportFilter) {
    return filterViewportFeaturesToGetCategories({
      viewportFilter,
      viewportFeatures,
      filters,
      operation,
      column,
      operationColumn
    });
  }

  const query = buildSqlQueryToGetCategories({
    data,
    column,
    operation,
    operationColumn,
    filters,
    alias
  });
  return await executeSQL(credentials, query, opts);
};

/**
 * Build a SQL sentence to get the Categories defined by props
 */
export const buildSqlQueryToGetCategories = ({
  data,
  column,
  operation,
  operationColumn,
  filters,
  alias = 'name'
}) => {
  const query = `
    WITH all_categories as (
      SELECT
        ${column} as ${alias}
      FROM
        (${data}) as q
      GROUP BY ${alias}
    ),
    categories as (
      SELECT
        ${column} as ${alias}, ${operation}(${operationColumn}) as value
      FROM
        (${data}) as q
      ${filtersToSQL(filters)}
      GROUP BY ${alias}
    )
    SELECT
      a.${alias}, b.value
    FROM
      all_categories a
    LEFT JOIN categories b ON a.${alias}=b.${alias}
  `;

  return minify(query);
};

/**
 * Filter viewport features to get the Categories defined by props
 */
export const filterViewportFeaturesToGetCategories = ({
  viewportFeatures,
  filters,
  operation,
  column,
  operationColumn
}) => {
  if (viewportFeatures) {
    const filteredFeatures = !Object.keys(viewportFeatures).length
      ? viewportFeatures
      : viewportFeatures.filter(buildFeatureFilter({ filters }));

    const groups = groupValuesByColumn(
      filteredFeatures,
      operationColumn,
      column,
      operation
    );

    return groups;
  }

  return [];
};
