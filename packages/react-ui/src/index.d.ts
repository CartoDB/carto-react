import { theme, cartoThemeOptions, CartoTheme } from './theme/carto-theme';
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
import ComparativePieWidgetUI from './widgets/comparative/ComparativePieWidgetUI';
import ComparativeFormulaWidgetUI from './widgets/comparative/ComparativeFormulaWidgetUI/ComparativeFormulaWidgetUI';
import ComparativeCategoryWidgetUI from './widgets/comparative/ComparativeCategoryWidgetUI/ComparativeCategoryWidgetUI';
import Typography from './components/atoms/Typography';
import Button from './components/atoms/Button';
import PasswordField from './components/atoms/PasswordField';
import SelectField from './components/atoms/SelectField';
import UploadField from './components/molecules/UploadField/UploadField';
import AppBar from './components/organisms/AppBar/AppBar';
import LabelWithIndicator from './components/atoms/LabelWithIndicator';
import { getCartoColorStylePropsForItem } from './utils/palette';
import Avatar from './components/molecules/Avatar';
import {
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE
} from './theme/themeConstants';
import AccordionGroup from './components/molecules/AccordionGroup';

export {
  theme,
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
  LegendRamp,
  Typography,
  Button,
  PasswordField,
  SelectField,
  UploadField,
  AppBar,
  LabelWithIndicator,
  getCartoColorStylePropsForItem,
  Avatar,
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE,
  AccordionGroup
};
