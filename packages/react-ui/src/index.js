import { theme, cartoThemeOptions } from './theme/carto-theme';
import WrapperWidgetUI from './widgets/WrapperWidgetUI';
import CategoryWidgetUI from './widgets/CategoryWidgetUI/CategoryWidgetUI';
import FormulaWidgetUI from './widgets/FormulaWidgetUI/FormulaWidgetUI';
import BarWidgetUI from './widgets/BarWidgetUI/BarWidgetUI';
import HistogramWidgetUI from './widgets/HistogramWidgetUI/HistogramWidgetUI';
import PieWidgetUI from './widgets/PieWidgetUI/PieWidgetUI';
import LegendWidgetUI from './widgets/legend/LegendWidgetUI';
import LEGEND_TYPES from './widgets/legend/legend-types/LegendTypes';
import LegendCategories from './widgets/legend/legend-types/LegendCategories';
import LegendIcon from './widgets/legend/legend-types/LegendIcon';
import LegendProportion from './widgets/legend/legend-types/LegendProportion';
import LegendRamp from './widgets/legend/legend-types/LegendRamp';
import ScatterPlotWidgetUI from './widgets/ScatterPlotWidgetUI/ScatterPlotWidgetUI';
import TimeSeriesWidgetUI from './widgets/TimeSeriesWidgetUI/TimeSeriesWidgetUI';
import {
  useTimeSeriesContext,
  TimeSeriesProvider
} from './widgets/TimeSeriesWidgetUI/hooks/TimeSeriesContext';
import FeatureSelectionWidgetUI from './widgets/FeatureSelectionWidgetUI/FeatureSelectionWidgetUI';
import FeatureSelectionUIDropdown from './widgets/FeatureSelectionWidgetUI/FeatureSelectionUIDropdown';
import FeatureSelectionUIGeometryChips from './widgets/FeatureSelectionWidgetUI/FeatureSelectionUIGeometryChips';
import FeatureSelectionUIToggleButton from './widgets/FeatureSelectionWidgetUI/FeatureSelectionUIToggleButton';
import RangeWidgetUI from './widgets/RangeWidgetUI/RangeWidgetUI';
import useTimeSeriesInteractivity from './widgets/TimeSeriesWidgetUI/hooks/useTimeSeriesInteractivity';
import ComparativeFormulaWidgetUI from './widgets/comparative/ComparativeFormulaWidgetUI/ComparativeFormulaWidgetUI';
import ComparativeCategoryWidgetUI from './widgets/comparative/ComparativeCategoryWidgetUI/ComparativeCategoryWidgetUI';
import { CHART_TYPES } from './widgets/TimeSeriesWidgetUI/utils/constants';
import TableWidgetUI from './widgets/TableWidgetUI/TableWidgetUI';
import NoDataAlert from './widgets/NoDataAlert';
import ComparativePieWidgetUI from './widgets/comparative/ComparativePieWidgetUI';
import CursorIcon from './assets/icons/CursorIcon';
import PolygonIcon from './assets/icons/PolygonIcon';
import RectangleIcon from './assets/icons/RectangleIcon';
import LassoIcon from './assets/icons/LassoIcon';
import CircleIcon from './assets/icons/CircleIcon';
import ArrowDropIcon from './assets/icons/ArrowDropIcon';
import Typography from './components/atoms/Typography';
import Button from './components/atoms/Button';
import ToggleButtonGroup from './components/atoms/ToggleButtonGroup';
import PasswordField from './components/atoms/PasswordField';
import SelectField from './components/atoms/SelectField';
import MultipleSelectField from './components/molecules/MultipleSelectField/MultipleSelectField';
import UploadField from './components/molecules/UploadField/UploadField';
import UploadFieldBase from './components/molecules/UploadField/UploadFieldBase';
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
import Alert from './components/molecules/Alert';

const featureSelectionIcons = {
  CursorIcon,
  PolygonIcon,
  RectangleIcon,
  LassoIcon,
  CircleIcon
};

export {
  theme,
  cartoThemeOptions,
  WrapperWidgetUI,
  CategoryWidgetUI,
  FormulaWidgetUI,
  HistogramWidgetUI,
  BarWidgetUI,
  PieWidgetUI,
  ScatterPlotWidgetUI,
  FeatureSelectionWidgetUI,
  FeatureSelectionUIDropdown,
  FeatureSelectionUIGeometryChips,
  FeatureSelectionUIToggleButton,
  TimeSeriesWidgetUI,
  useTimeSeriesContext,
  useTimeSeriesInteractivity,
  TimeSeriesProvider,
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
  LegendRamp,
  Typography,
  Button,
  ToggleButtonGroup,
  PasswordField,
  SelectField,
  MultipleSelectField,
  UploadField,
  UploadFieldBase,
  AppBar,
  ArrowDropIcon,
  LabelWithIndicator,
  getCartoColorStylePropsForItem,
  Avatar,
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE,
  AccordionGroup,
  Alert
};
