import { cartoThemeOptions, CartoTheme } from './theme/carto-theme';
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
import {
  useTimeSeriesContext,
  TimeSeriesProvider
} from './widgets/TimeSeriesWidgetUI/hooks/TimeSeriesContext';
import RangeWidgetUI from './widgets/RangeWidgetUI';
import useTimeSeriesInteractivity from './widgets/TimeSeriesWidgetUI/hooks/useTimeSeriesInteractivity';
import { CHART_TYPES } from './widgets/TimeSeriesWidgetUI/utils/constants';
import TableWidgetUI from './widgets/TableWidgetUI/TableWidgetUI';
import NoDataAlert from './widgets/NoDataAlert';
import FeatureSelectionWidgetUI from './widgets/FeatureSelectionWidgetUI';
import ComparativePieWidgetUI from './widgets/ComparativePieWidgetUI';
import ComparativeFormulaWidgetUI from './widgets/comparative/ComparativeFormulaWidgetUI';
import ComparativeCategoryWidgetUI from './widgets/comparative/ComparativeCategoryWidgetUI/ComparativeCategoryWidgetUI';

export {
  cartoThemeOptions,
  CartoTheme,
  WrapperWidgetUI,
  CategoryWidgetUI,
  FormulaWidgetUI,
  HistogramWidgetUI,
  BarWidgetUI,
  PieWidgetUI,
  ScatterPlotWidgetUI,
  TimeSeriesWidgetUI,
  useTimeSeriesContext,
  useTimeSeriesInteractivity,
  TimeSeriesProvider,
  CHART_TYPES as TIME_SERIES_CHART_TYPES,
  TableWidgetUI,
  LegendWidgetUI,
  RangeWidgetUI,
  ComparativePieWidgetUI,
  FeatureSelectionWidgetUI,
  ComparativeFormulaWidgetUI,
  ComparativeCategoryWidgetUI,
  LEGEND_TYPES,
  NoDataAlert,
  LegendCategories,
  LegendIcon,
  LegendProportion,
  LegendRamp
};
