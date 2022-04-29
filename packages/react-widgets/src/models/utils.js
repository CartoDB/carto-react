import { AggregationTypes, _filtersToSQL } from '@carto/react-core';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';

export function wrapModelCall(props, fromLocal, fromRemote) {
  const { source, global } = props;

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
  }

  return fromLocal(props);
}

export function formatTableNameWithFilters(props) {
  const { source } = props;
  const { data, filters, filtersLogicalOperator } = source;

  const whereClause = _filtersToSQL(filters, filtersLogicalOperator);

  const formattedSourceData =
    source.type === MAP_TYPES.QUERY ? `(${data.replace(';', '')})` : data;

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
      typeof value === 'object' ? normalizeObjectKeys(value) : value;
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
