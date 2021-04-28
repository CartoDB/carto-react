import {
  viewportFeaturesBinary as viewportFeatures,
  aggregationFunctions,
  _buildFeatureFilter,
  histogram,
  groupValuesByColumn } from '@carto/react-core';
import { Methods } from '../workerMethods';

let currentViewportFeatures;

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
    default:
      throw new Error('Invalid worker method');
  }
};

function getViewportFeatures({ tiles, viewport, uniqueIdProperty }) {
  currentViewportFeatures = viewportFeatures({
    tiles,
    viewport,
    uniqueIdProperty
  });
  postMessage({ result: true });
}

function getFormula({ filters, operation, column }) {
  let result = [{ value: null }];

  if (currentViewportFeatures) {
    const targetOperation = aggregationFunctions[operation];

    const filteredFeatures = getFilteredFeatures(filters);

    result = [{ value: targetOperation(filteredFeatures, column) }];
  }

  postMessage({ result });
}

function getHistogram({ filters, operation, column, ticks }) {
  let result = [];

  if (currentViewportFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    result = histogram(filteredFeatures, column, ticks, operation);
  }

  postMessage({ result });
}

function getCategories({ filters, operation, column, operationColumn }) {
  let result = [];

  if (currentViewportFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    const groups = groupValuesByColumn(
      filteredFeatures,
      operationColumn,
      column,
      operation
    );

    result = groups;
  }

  postMessage({ result });
}

function getFilteredFeatures(filters) {
  return !Object.keys(currentViewportFeatures).length
    ? currentViewportFeatures
    : currentViewportFeatures.filter(_buildFeatureFilter({ filters }));
}