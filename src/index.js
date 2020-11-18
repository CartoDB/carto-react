// api
import {
  executeSQL,
  getUserDatasets,
  AggregationTypes,
  FilterTypes,
  buildQuery,
} from './api';

const api = {
  executeSQL,
  getUserDatasets,
  AggregationTypes,
  FilterTypes,
  buildQuery,
};

// slice
import * as slice from './slice';

// basemaps
import * as basemaps from './basemaps';

// oauth
import { OAuthCallback, OAuthLogin, useOAuthLogin } from './oauth';
const oauth = { OAuthCallback, OAuthLogin, useOAuthLogin };

// widgets
import {
  CategoryWidget,
  FormulaWidget,
  GeocoderWidget,
  HistogramWidget,
  getFormula,
  getHistogram,
  getCategories,
} from './widgets';

const widgets = {
  CategoryWidget,
  FormulaWidget,
  GeocoderWidget,
  HistogramWidget,
  getFormula,
  getHistogram,
  getCategories,
};

// ui
import {
  cartoThemeOptions,
  WrapperWidgetUI,
  CategoryWidgetUI,
  HistogramWidgetUI,
  FormulaWidgetUI,
} from './ui';

const ui = {
  cartoThemeOptions,
  WrapperWidgetUI,
  CategoryWidgetUI,
  HistogramWidgetUI,
  FormulaWidgetUI,
}

// ---

export { api };
export { slice };
export { basemaps };
export { oauth };
export { widgets };
export { ui };