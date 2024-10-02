import {
  AggregationTypes,
  getSpatialIndexFromGeoColumn,
  _filtersToSQL,
  Provider
} from '@carto/react-core';
import { FullyQualifiedName } from './fqn';
import { MAP_TYPES, API_VERSIONS } from '@carto/react-api';

export { getSpatialFiltersResolution } from './spatialFiltersResolution';

export function isRemoteCalculationSupported(props) {
  const { source } = props;

  if (
    !source ||
    source.type === MAP_TYPES.TILESET ||
    source.credentials.apiVersion === API_VERSIONS.V2 ||
    source.provider === 'databricks'
  ) {
    return false;
  }

  const isDynamicSpatialIndex = source.spatialDataType
    ? source.spatialDataType !== 'geo'
    : source.geoColumn && getSpatialIndexFromGeoColumn(source.geoColumn);

  if (
    isDynamicSpatialIndex &&
    !source.dataResolution &&
    !source.spatialFiltersResolution
  ) {
    return false;
  }
  return true;
}

export function wrapModelCall(props, fromLocal, fromRemote) {
  const { source, global, remoteCalculation } = props;

  if (global) {
    if (source.type === MAP_TYPES.TILESET)
      throw new Error('Tileset sources are not supported in global mode.');

    if (source.credentials.apiVersion === API_VERSIONS.V2) {
      throw new Error(
        'CARTO 2 cannot be used in global mode. Upgrade to CARTO 3, please.'
      );
    }

    if (!fromRemote) {
      throw new Error(`Global mode isn't supported for this widget`);
    }

    return fromRemote(props);
  } else if (remoteCalculation && isRemoteCalculationSupported(props)) {
    if (!fromRemote) {
      throw new Error(`Remote calculation isn't supported for this widget`);
    }

    // The widget supports remote calculation, preferred whenever possible
    return fromRemote(props);
  } else {
    // Local calculation, it requires data to be available
    return fromLocal(props);
  }
}

const SOURCE_QUERY_ALIAS = '__source_query';

export function sourceAndFiltersToSQL({
  data,
  filters,
  filtersLogicalOperator,
  provider,
  type
}) {
  const whereClause = _filtersToSQL(filters, filtersLogicalOperator);

  const formattedSourceData =
    type === MAP_TYPES.QUERY
      ? `(${sanitizeSQLSource(data)}) ${SOURCE_QUERY_ALIAS}`
      : getSqlEscapedSource(data, provider);

  return `SELECT * FROM ${formattedSourceData} ${whereClause}`;
}

function sanitizeSQLSource(sql) {
  return sql.trim().replace(/;$/, '');
}

export function getSqlEscapedSource(table, provider) {
  const fqn = new FullyQualifiedName(table, provider);

  if (provider === Provider.Snowflake) {
    if (!fqn.getSchemaName({ safe: true })) {
      fqn.setSchemaName('PUBLIC');
    }
  }

  if (provider === Provider.Postgres || provider === Provider.Redshift) {
    if (!fqn.getSchemaName({ safe: true })) {
      fqn.setSchemaName('public');
    }
  }

  if (provider === Provider.Databricks) {
    if (!fqn.getDatabaseName({ safe: true })) {
      throw new Error('Database name is required for Databricks');
    }
    if (!fqn.getSchemaName({ safe: true })) {
      fqn.setSchemaName('default');
    }
  }
  return fqn.toString();
}

// Due to each data warehouse has its own behavior with columns,
// we need to normalize them and transform every key to lowercase
export function normalizeObjectKeys(el) {
  if (Array.isArray(el)) {
    return el.map(normalizeObjectKeys);
  } else if (typeof el !== 'object') {
    return el;
  }

  return Object.entries(el).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] =
      typeof value === 'object' && value ? normalizeObjectKeys(value) : value;
    return acc;
  }, {});
}

// Operation columns & Join operation
const sumColumns = (operationColumns) =>
  operationColumns.map((column) => `COALESCE(${column}, 0)`).join(' + ');

const SELECT_CLAUSE_BY_JOIN_OPERATION = {
  [AggregationTypes.AVG]: (operationColumns) =>
    `(${sumColumns(operationColumns)}) / ${operationColumns.length}`,
  [AggregationTypes.SUM]: (operationColumns) => sumColumns(operationColumns),
  [AggregationTypes.COUNT]: (operationColumns) => operationColumns[0],
  [AggregationTypes.MIN]: (operationColumns) => `LEAST(${operationColumns.join()})`,
  [AggregationTypes.MAX]: (operationColumns) => `GREATEST(${operationColumns.join()})`
};

export function formatOperationColumn(operationColumn, joinOperation) {
  if (!Array.isArray(operationColumn)) {
    return operationColumn || '*';
  }

  if (operationColumn.length <= 1) {
    return operationColumn[0];
  }

  const selectClauseFormatter = SELECT_CLAUSE_BY_JOIN_OPERATION[joinOperation];

  if (!selectClauseFormatter) {
    throw new Error(`${joinOperation} isn't valid.`);
  }

  return selectClauseFormatter(operationColumn);
}
