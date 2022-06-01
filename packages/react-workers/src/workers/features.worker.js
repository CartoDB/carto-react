import {
  tileFeatures,
  geojsonFeatures,
  aggregationFunctions,
  _applyFilters,
  histogram,
  scatterPlot,
  groupValuesByColumn,
  groupValuesByDateColumn,
  AggregationTypes
} from '@carto/react-core';
import { applySorting } from '../utils/sorting';
import { Methods } from '../workerMethods';

let currentFeatures;
let currentGeoJSON;
let currentTiles;

onmessage = ({ data: { method, ...params } }) => {
  switch (method) {
    case Methods.TILE_FEATURES:
      getTileFeatures(params);
      break;
    case Methods.FEATURES_FORMULA:
      getFormula(params);
      break;
    case Methods.FEATURES_HISTOGRAM:
      getHistogram(params);
      break;
    case Methods.FEATURES_CATEGORY:
      getCategories(params);
      break;
    case Methods.FEATURES_SCATTERPLOT:
      getScatterPlot(params);
      break;
    case Methods.FEATURES_TIME_SERIES:
      getTimeSeries(params);
      break;
    case Methods.FEATURES_RAW:
      getRawFeatures(params);
      break;
    case Methods.LOAD_TILES:
      loadTiles(params);
      break;
    case Methods.LOAD_GEOJSON_FEATURES:
      loadGeoJSONFeatures(params);
      break;
    case Methods.GEOJSON_FEATURES:
      getGeojsonFeatures(params);
      break;
    default:
      throw new Error('Invalid worker method');
  }
};

function getTileFeatures({
  viewport,
  geometry,
  uniqueIdProperty,
  tileFormat,
  spatialIndex
}) {
  currentFeatures = tileFeatures({
    tiles: currentTiles,
    viewport,
    geometry,
    uniqueIdProperty,
    tileFormat,
    spatialIndex
  });
  postMessage({ result: true });
}

function loadTiles({ tiles }) {
  currentTiles = tiles;
  postMessage({ result: true });
}

function loadGeoJSONFeatures({ geojson }) {
  currentGeoJSON = geojson;
  postMessage({ result: true });
}

function getGeojsonFeatures({ viewport, geometry, uniqueIdProperty }) {
  if (currentGeoJSON) {
    currentFeatures = geojsonFeatures({
      geojson: currentGeoJSON,
      viewport,
      geometry,
      uniqueIdProperty
    });
  }
  postMessage({ result: true });
}

function getFormula({
  filters,
  filtersLogicalOperator,
  operation,
  column,
  joinOperation
}) {
  let result = null;

  if (currentFeatures) {
    const targetOperation = aggregationFunctions[operation];

    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    if (filteredFeatures.length === 0 && operation !== AggregationTypes.COUNT) {
      result = { value: null };
    } else {
      result = { value: targetOperation(filteredFeatures, column, joinOperation) };
    }
  }

  postMessage({ result });
}

function getHistogram({
  filters,
  filtersLogicalOperator,
  operation,
  column,
  bins,
  ticks,
  joinOperation
}) {
  let result = null;

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    result = histogram({
      data: filteredFeatures,
      valuesColumns: [column].flat(),
      joinOperation,
      ticks,
      bins,
      operation
    });
  }

  postMessage({ result });
}

function getCategories({
  filters,
  filtersLogicalOperator,
  operation,
  column,
  operationColumn,
  joinOperation
}) {
  let result = null;

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    const groups = groupValuesByColumn({
      data: filteredFeatures,
      valuesColumns: [operationColumn].flat(),
      joinOperation,
      keysColumn: column,
      operation
    });

    result = groups || [];
  }

  postMessage({ result });
}

function getScatterPlot({
  filters,
  filtersLogicalOperator,
  xAxisColumn,
  yAxisColumn,
  xAxisJoinOperation,
  yAxisJoinOperation
}) {
  let result = [];
  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);
    result = scatterPlot({
      data: filteredFeatures,
      xAxisColumns: [xAxisColumn].flat(),
      xAxisJoinOperation,
      yAxisColumns: [yAxisColumn].flat(),
      yAxisJoinOperation
    });
  }

  postMessage({ result });
}

function getTimeSeries({
  filters,
  filtersLogicalOperator,
  column,
  stepSize,
  operation,
  operationColumn,
  joinOperation
}) {
  let result = [];

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    const groups = groupValuesByDateColumn({
      data: filteredFeatures,
      valuesColumns: [operationColumn].flat(),
      keysColumn: column,
      groupType: stepSize,
      operation,
      joinOperation
    });

    result = groups || [];
  }

  postMessage({ result });
}

// See sorting details in utils/sorting.js
function getRawFeatures({
  filters,
  filtersLogicalOperator,
  limit = 10,
  page = 0,
  sortBy,
  sortByDirection = 'asc'
}) {
  let data = [];
  let numberPages = 0;
  let totalCount = 0;

  if (currentFeatures) {
    data = applySorting(getFilteredFeatures(filters, filtersLogicalOperator), {
      sortBy,
      sortByDirection
    });

    totalCount = data.length;

    if (limit) {
      numberPages = Math.ceil(data.length / limit);
      data = applyPagination(data, { limit, page });
    }
  }

  postMessage({
    result: { data, currentPage: page, pages: numberPages, totalCount }
  });
}

function applyPagination(features, { limit, page }) {
  return features.slice(limit * Math.max(0, page), limit * Math.max(1, page + 1));
}

function getFilteredFeatures(filters = {}, filtersLogicalOperator) {
  return _applyFilters(currentFeatures, filters, filtersLogicalOperator);
}
