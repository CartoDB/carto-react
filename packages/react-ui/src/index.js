import { cartoThemeOptions } from './theme/carto-theme';
import WrapperWidgetUI from './widgets/WrapperWidgetUI';
import CategoryWidgetUI from './widgets/CategoryWidgetUI';
import FormulaWidgetUI from './widgets/FormulaWidgetUI';
import BarWidgetUI from './widgets/BarWidgetUI';
import HistogramWidgetUI from './widgets/HistogramWidgetUI/HistogramWidgetUI';
import PieWidgetUI from './widgets/PieWidgetUI';
import LegendWidgetUI, { LEGEND_TYPES } from './widgets/legend/LegendWidgetUI';
import LegendCategories from './widgets/legend/LegendCategories';
import LegendIcon from './widgets/legend/LegendIcon';
import LegendProportion from './widgets/legend/LegendProportion';
import LegendRamp from './widgets/legend/LegendRamp';
import ScatterPlotWidgetUI from './widgets/ScatterPlotWidgetUI';
import TimeSeriesWidgetUI from './widgets/TimeSeriesWidgetUI/TimeSeriesWidgetUI';
import FeatureSelectionWidgetUI from './widgets/FeatureSelectionWidgetUI';
import RangeWidgetUI from './widgets/RangeWidgetUI';
import ComparativeFormulaWidgetUI from './widgets/comparative/ComparativeFormulaWidgetUI';
import ComparativeCategoryWidgetUI from './widgets/comparative/ComparativeCategoryWidgetUI/ComparativeCategoryWidgetUI';
import { CHART_TYPES } from './widgets/TimeSeriesWidgetUI/utils/constants';
import TableWidgetUI from './widgets/TableWidgetUI/TableWidgetUI';
import NoDataAlert from './widgets/NoDataAlert';
import CursorIcon from './assets/CursorIcon';
import PolygonIcon from './assets/PolygonIcon';
import RectangleIcon from './assets/RectangleIcon';
import LassoIcon from './assets/LassoIcon';
import CircleIcon from './assets/CircleIcon';
import ComparativePieWidgetUI from './widgets/ComparativePieWidgetUI';

const featureSelectionIcons = {
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
  BarWidgetUI,
  PieWidgetUI,
  ScatterPlotWidgetUI,
  FeatureSelectionWidgetUI,
  TimeSeriesWidgetUI,
  CHART_TYPES as TIME_SERIES_CHART_TYPES,
  TableWidgetUI,
  LegendWidgetUI,
  RangeWidgetUI,
  ComparativePieWidgetUI,
  ComparativeFormulaWidgetUI,
  ComparativeCategoryWidgetUI,
  LEGEND_TYPES,
  NoDataAlert,
  featureSelectionIcons,
  LegendCategories,
  LegendIcon,
  LegendProportion,
  LegendRamp
};
