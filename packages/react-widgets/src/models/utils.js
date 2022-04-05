import { AggregationTypes, _filtersToSQL } from '@carto/react-core';

export function formatTableNameWithFilters(props) {
  const { source, spatialFilter } = props;
  const { data, filters, filtersLogicalOperator } = source;

  const filtersClause = _filtersToSQL(filters, filtersLogicalOperator);

  let query = `(${data} ${filtersClause}) foo`;

  if (spatialFilter) {
    const spatialFilterString = JSON.stringify(spatialFilter);
    const spatialFilterClause = `ST_Intersects(geom, ST_GEOGFROMGEOJSON("""${spatialFilterString}"""))`;
    query += ` WHERE ${spatialFilterClause}`;
  }

  return query;
}

// Operation columns & Join operation
const SELECT_CLAUSE_BY_JOIN_OPERATION = {
  [AggregationTypes.AVG]: (operationColumns) =>
    `(${operationColumns.join(' + ')} / ${operationColumns.length})`,
  [AggregationTypes.SUM]: (operationColumns) => `(${operationColumns.join(' + ')})`,
  [AggregationTypes.COUNT]: (operationColumns) => operationColumns[0],
  [AggregationTypes.MIN]: (operationColumns) => `(${operationColumns.join(' + ')})`,
  [AggregationTypes.MAX]: (operationColumns) => `(${operationColumns.join(' + ')})`
};

export function formatOperationColumn(operationColumn, joinOperation) {
  if (typeof operationColumn === 'string') {
    return operationColumn;
  }

  const selectClauseFormatter = SELECT_CLAUSE_BY_JOIN_OPERATION[joinOperation];

  if (!selectClauseFormatter) {
    throw new Error(`${joinOperation} isn't valid.`);
  }

  return SELECT_CLAUSE_BY_JOIN_OPERATION[joinOperation](operationColumn);
}
