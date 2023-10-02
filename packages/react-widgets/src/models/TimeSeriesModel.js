import { _executeModel } from '@carto/react-api/';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';
import { AggregationTypes } from '@carto/react-core';

export function getTimeSeries(props) {
  if (props.series) {
    return getMultipleSeries(props);
  } else {
    return wrapModelCall(props, fromLocal, fromRemote);
  }
}

async function getMultipleSeries(props) {
  const { series, ...propsNoSeries } = props;

  const categories = series.map(({ operation, operationColumn }) =>
    getCategoryForAggregationOperation({ operation, operationColumn, series })
  );
  const rowsByCategory = await Promise.all(
    series.map(async (serie, categoryIndex) => ({
      data: (await getTimeSeries({ ...propsNoSeries, ...serie })).rows,
      categoryIndex
    }))
  );
  const rows = [];
  for (const { data, categoryIndex } of rowsByCategory) {
    for (const { name, value } of data) {
      rows.push({ name, value, categoryIndex });
    }
  }
  return {
    rows,
    categories
  };
}

// From local
function fromLocal({
  source,
  column,
  operationColumn,
  joinOperation,
  operation,
  stepSize,
  stepMultiplier,
  splitByCategory,
  splitByCategoryLimit,
  splitByCategoryValues
}) {
  return executeTask(source.id, Methods.FEATURES_TIME_SERIES, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    column,
    stepSize,
    stepMultiplier,
    operationColumn: operationColumn || column,
    joinOperation,
    operation,
    splitByCategory,
    splitByCategoryLimit,
    splitByCategoryValues
  });
}

// From remote
function fromRemote(props) {
  const { source, abortController, spatialFilter, ...params } = props;
  const {
    column,
    operationColumn,
    joinOperation,
    operation,
    stepSize,
    stepMultiplier,
    splitByCategory,
    splitByCategoryLimit,
    splitByCategoryValues
  } = params;

  return _executeModel({
    model: 'timeseries',
    source,
    spatialFilter,
    params: {
      column,
      stepSize,
      stepMultiplier,
      operationColumn: operationColumn || column,
      joinOperation,
      operation,
      splitByCategory,
      splitByCategoryLimit,
      splitByCategoryValues
    },
    opts: { abortController }
  }).then((res) => ({
    rows: normalizeObjectKeys(res.rows),
    categories: res.metadata?.categories
  }));
}

function getCategoryForAggregationOperation({ operation, operationColumn, series }) {
  if (operation === AggregationTypes.COUNT) {
    return `count of records`;
  }
  const countColumnUsed = series.filter(
    (s) => s.operationColumn === operationColumn
  ).length;
  if (countColumnUsed < 2) {
    return operationColumn;
  } else {
    return `${operation} of ${operationColumn}`;
  }
}
