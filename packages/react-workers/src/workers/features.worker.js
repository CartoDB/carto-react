import { Methods } from '../workerMethods';
import {
  getTileFeatures,
  getFormula,
  getHistogram,
  getCategories,
  getScatterPlot,
  getTimeSeries,
  getRawFeatures,
  getRange,
  loadTiles,
  loadGeoJSONFeatures,
  getGeojsonFeatures
} from './methods';

export const methodMap = {
  [Methods.TILE_FEATURES]: getTileFeatures,
  [Methods.FEATURES_FORMULA]: getFormula,
  [Methods.FEATURES_HISTOGRAM]: getHistogram,
  [Methods.FEATURES_CATEGORY]: getCategories,
  [Methods.FEATURES_SCATTERPLOT]: getScatterPlot,
  [Methods.FEATURES_TIME_SERIES]: getTimeSeries,
  [Methods.FEATURES_RAW]: getRawFeatures,
  [Methods.FEATURES_RANGE]: getRange,
  [Methods.LOAD_TILES]: loadTiles,
  [Methods.LOAD_GEOJSON_FEATURES]: loadGeoJSONFeatures,
  [Methods.GEOJSON_FEATURES]: getGeojsonFeatures
};

onmessage = ({ data: { method, ...params } }) => {
  try {
    const methodFn = methodMap[method];
    if (!methodFn) {
      throw new Error(`Invalid react-workers method: ${methodFn}`);
    }
    const result = methodFn(params);
    postMessage({ result: result === undefined ? true : result });
  } catch (error) {
    postMessage({ error: String(error) });
    console.error(error);
  }
};
