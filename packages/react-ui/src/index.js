import { cartoThemeOptions } from './theme/carto-theme';
import WrapperWidgetUI from './widgets/WrapperWidgetUI';
import CategoryWidgetUI from './widgets/CategoryWidgetUI';
import FormulaWidgetUI from './widgets/FormulaWidgetUI';
import HistogramWidgetUI from './widgets/HistogramWidgetUI';
import PieWidgetUI from './widgets/PieWidgetUI';
import LegendWidgetUI, { LEGEND_TYPES } from './widgets/legend/LegendWidgetUI';
import ScatterPlotWidgetUI from './widgets/ScatterPlotWidgetUI';
import TimeSeriesWidgetUI from './widgets/TimeSeriesWidgetUI/TimeSeriesWidgetUI';
import DrawingToolWidgetUI from './widgets/DrawingToolWidgetUI';
import { CHART_TYPES } from './widgets/TimeSeriesWidgetUI/utils/constants';
import NoDataAlert from './widgets/NoDataAlert';
import CursorIcon from './assets/CursorIcon';
import PolygonIcon from './assets/PolygonIcon';
import RectangleIcon from './assets/RectangleIcon';
import LassoIcon from './assets/LassoIcon';
import CircleIcon from './assets/CircleIcon';

const drawingToolIcons = {
  CursorIcon,
  PolygonIcon,
  RectangleIcon,
  LassoIcon,
  CircleIcon
};

export {
  cartoThemeOptions,
  WrapperWidgetUI,
  CategoryWidgetUI,
  FormulaWidgetUI,
  HistogramWidgetUI,
  PieWidgetUI,
  ScatterPlotWidgetUI,
  TimeSeriesWidgetUI,
  DrawingToolWidgetUI,
  CHART_TYPES as TIME_SERIES_CHART_TYPES,
  LegendWidgetUI,
  LEGEND_TYPES,
  NoDataAlert,
  drawingToolIcons
};
