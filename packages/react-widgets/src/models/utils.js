import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto/typed';
import {
  AggregationTypes,
  getSpatialIndexFromGeoColumn,
  _filtersToSQL
} from '@carto/react-core';

export function isRemoteCalculationSupported(props) {
  const { source } = props;

  return (
    source &&
    source.type !== MAP_TYPES.TILESET &&
    source.credentials.apiVersion !== API_VERSIONS.V2 &&
    !(!!source.geoColumn && getSpatialIndexFromGeoColumn(source.geoColumn) !== null)
  );
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

export function formatTableNameWithFilters(props) {
  const { source } = props;
  const { data, filters, filtersLogicalOperator } = source;

  const whereClause = _filtersToSQL(filters, filtersLogicalOperator);

  const formattedSourceData =
    source.type === MAP_TYPES.QUERY ? `(${data.replace(';', '')}) foo` : data;

  return `${formattedSourceData} ${whereClause}`.trim();
}

// Due to each data warehouse has its own behavior with columns,
// we need to normalize them and transform every key to lowercase
export function normalizeObjectKeys(el) {
  if (Array.isArray(el)) {
    return el.map(normalizeObjectKeys);
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
