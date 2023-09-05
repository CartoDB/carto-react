import { _executeModel } from '@carto/react-api/';
import { Methods, executeTask } from '@carto/react-workers';
import { normalizeObjectKeys, wrapModelCall } from './utils';
import { AggregationTypes } from '@carto/react-core';

export function getTimeSeries(props) {
  if (props.series) {
    const { series, propsNoSeries } = props;
    return Promise.all(
      series.map(({ operation, operationColumn }) => {
        const category = getCategory(operation, operationColumn, series);
        return {
          data: wrapModelCall(
            { ...propsNoSeries, operation, operationColumn },
            fromLocal,
            fromRemote
          ),
          category
        };
      })
    );
  } else {
    return wrapModelCall(props, fromLocal, fromRemote);
  }
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
  }).then((res) => normalizeObjectKeys(res.rows));
}

function getCategory(series, operation, operationColumn) {
  const countColumnUsed = series.filter(
    (s) => s.operationColumn === operationColumn
  ).length;
  if (countColumnUsed < 2) {
    return operationColumn;
  } else {
    if (operation === AggregationTypes.COUNT) {
      return `count of records`;
    }
    return `${operation} of ${operationColumn}`; // todo translate maybe ?
  }
}
