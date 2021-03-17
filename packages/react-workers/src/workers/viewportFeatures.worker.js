import {
  viewportFeaturesBinary,
  viewportFeaturesGeoJSON,
  aggregationFunctions,
  _buildFeatureFilter,
  histogram,
  scatterPlot,
  groupValuesByColumn
} from '@carto/react-core';
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

function getFilteredFeatures(filters) {
  return !Object.keys(currentViewportFeatures).length
    ? currentViewportFeatures
    : currentViewportFeatures.filter(_buildFeatureFilter({ filters }));
}

