import {
  viewportFeaturesBinary,
  viewportFeaturesGeoJSON,
  aggregationFunctions,
  _applyFilters,
  histogram,
  scatterPlot,
  groupValuesByColumn,
  groupValuesByDateColumn
} from '@carto/react-core';
import { applySorting } from '../utils/sorting';
import { Methods } from '../workerMethods';

let currentViewportFeatures;
let currentGeoJSON;

onmessage = ({ data: { method, ...params } }) => {
  switch (method) {
    case Methods.VIEWPORT_FEATURES:
      getViewportFeatures(params);
      break;
    case Methods.VIEWPORT_FEATURES_FORMULA:
      getFormula(params);
      break;
    case Methods.VIEWPORT_FEATURES_HISTOGRAM:
      getHistogram(params);
      break;
    case Methods.VIEWPORT_FEATURES_CATEGORY:
      getCategories(params);
      break;
    case Methods.VIEWPORT_FEATURES_SCATTERPLOT:
      getScatterPlot(params);
      break;
    case Methods.VIEWPORT_FEATURES_TIME_SERIES:
      getTimeSeries(params);
      break;
    case Methods.VIEWPORT_FEATURES_RAW_FEATURES:
      getRawFeatures(params);
      break;
    case Methods.LOAD_GEOJSON_FEATURES:
      loadGeoJSONFeatures(params);
      break;
    case Methods.VIEWPORT_FEATURES_GEOJSON:
      getViewportFeaturesGeoJSON(params);
      break;
    default:
      throw new Error('Invalid worker method');
  }
};

function getViewportFeatures({ tiles, viewport, uniqueIdProperty }) {
  currentViewportFeatures = viewportFeaturesBinary({
    tiles,
    viewport,
    uniqueIdProperty
  });
  postMessage({ result: true });
}

function loadGeoJSONFeatures({ geojson }) {
  currentGeoJSON = geojson;
  postMessage({ result: true });
}

function getViewportFeaturesGeoJSON({ viewport, uniqueIdProperty }) {
  if (currentGeoJSON) {
    currentViewportFeatures = viewportFeaturesGeoJSON({
      geojson: currentGeoJSON,
      viewport,
      uniqueIdProperty
    });
  }
  postMessage({ result: true });
}

function getFormula({ filters, operation, column }) {
  let result = null;

  if (currentViewportFeatures) {
    const targetOperation = aggregationFunctions[operation];

    const filteredFeatures = getFilteredFeatures(filters);

    result = [{ value: targetOperation(filteredFeatures, column) }];
  }

  postMessage({ result });
}

function getHistogram({ filters, operation, column, ticks }) {
  let result = null;

  if (currentViewportFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    result = histogram(filteredFeatures, column, ticks, operation);
  }

  postMessage({ result });
}

function getCategories({ filters, operation, column, operationColumn }) {
  let result = null;

  if (currentViewportFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    const groups = groupValuesByColumn(
      filteredFeatures,
      operationColumn,
      column,
      operation
    );

    result = groups || [];
  }

  postMessage({ result });
}

function getScatterPlot({ filters, xAxisColumn, yAxisColumn }) {
  let result = [];
  if (currentViewportFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);
    result = scatterPlot(filteredFeatures, xAxisColumn, yAxisColumn);
  }

  postMessage({ result });
}

function getTimeSeries({ filters, column, stepSize, operation, operationColumn }) {
  let result = [];

  if (currentViewportFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    const groups = groupValuesByDateColumn(
      filteredFeatures,
      operationColumn,
      column,
      stepSize,
      operation
    );

    result = groups || [];
  }

  postMessage({ result });
}

// See sorting details in utils/sorting.js
function getRawFeatures({
  filters,
  limit = 10,
  page = 1,
  sortBy = [],
  sortByDirection = 'asc'
}) {
  let data = [];
  let numberPages = 0;

  if (currentViewportFeatures) {
    const features = applySorting(getFilteredFeatures(filters), {
      sortBy,
      sortByDirection
    });

    if (limit) {
      numberPages = Math.ceil(features.length / limit);
      data = features.slice(limit * Math.max(0, page - 1), limit * Math.max(1, page));
    } else {
      data = features;
    }
  }

  postMessage({ result: { data, currentPage: page, pages: numberPages } });
}

function getFilteredFeatures(filters = {}) {
  return _applyFilters(currentViewportFeatures, filters);
}
