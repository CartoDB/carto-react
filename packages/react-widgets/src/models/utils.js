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

    return fromRemote(props);
  }

  return fromLocal(props);
}

export function formatTableNameWithFilters(props) {
  const { source } = props;
  const { data, filters, filtersLogicalOperator } = source;

  const whereClause = _filtersToSQL(filters, filtersLogicalOperator) || 'TRUE';

  const formattedSourceData =
    source.type === MAP_TYPES.QUERY ? `(${data.replace(';', '')})` : data;

  return `${formattedSourceData} WHERE ${whereClause}`;
}

// Operation columns & Join operation
const SELECT_CLAUSE_BY_JOIN_OPERATION = {
  [AggregationTypes.AVG]: (operationColumns) =>
    `SAFE_ADD(${operationColumns.join()}) / ${operationColumns.length}`,
  [AggregationTypes.SUM]: (operationColumns) => `SAFE_ADD(${operationColumns.join()})`,
  [AggregationTypes.COUNT]: (operationColumns) => operationColumns[0],
  [AggregationTypes.MIN]: (operationColumns) => `LEAST(${operationColumns.join()})`,
  [AggregationTypes.MAX]: (operationColumns) => `GREATEST(${operationColumns.join()})`
};

export function formatOperationColumn(operationColumn, joinOperation) {
  if (typeof operationColumn === 'string') {
    return operationColumn || '*';
  }

  const selectClauseFormatter = SELECT_CLAUSE_BY_JOIN_OPERATION[joinOperation];

  if (!selectClauseFormatter) {
    throw new Error(`${joinOperation} isn't valid.`);
  }

  return selectClauseFormatter(operationColumn);
}
