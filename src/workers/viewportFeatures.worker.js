import { binaryToGeoJson } from '@loaders.gl/gis';
import { viewportFeatures } from '../api/viewportFeatures';
import { Methods } from './workerMethods';
import { aggregationFunctions } from '../widgets/operations/aggregation/values';
import { buildFeatureFilter } from '../api/Filter';
import { histogram } from '../widgets/operations/histogram';
import { groupValuesByColumn } from '../widgets/operations/groupby';

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
    tiles: tiles.map(({ data, isVisible, bbox }) => ({
      data: data && binaryToGeoJson(data),
      isVisible,
      bbox
    })),
    viewport,
    uniqueIdProperty
  });
  postMessage({ result: true });
}

function getFormula({ filters, operation, column }) {
  let result = [{ value: null }];

  if (currentViewportFeatures) {
    const targetOperation = aggregationFunctions[operation];

    const filteredFeatures = !Object.keys(currentViewportFeatures).length
      ? currentViewportFeatures
      : currentViewportFeatures.filter(buildFeatureFilter({ filters }));

    result = [{ value: targetOperation(filteredFeatures, column) }];
  }

  postMessage({ result });
}

function getHistogram({ filters, operation, column, ticks }) {
  let result = [];

  if (currentViewportFeatures) {
    const filteredFeatures = !Object.keys(currentViewportFeatures).length
      ? currentViewportFeatures
      : currentViewportFeatures.filter(buildFeatureFilter({ filters }));

    result = histogram(filteredFeatures, column, ticks, operation);
  }

  postMessage({ result });
}

function getCategories({ filters, operation, column, operationColumn }) {
  let result = [];

  if (currentViewportFeatures) {
    const filteredFeatures = !Object.keys(currentViewportFeatures).length
      ? currentViewportFeatures
      : currentViewportFeatures.filter(buildFeatureFilter({ filters }));

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
