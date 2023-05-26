import { theme, cartoThemeOptions } from './theme/carto-theme';
import WrapperWidgetUI from './widgets/WrapperWidgetUI';
import CategoryWidgetUI from './widgets/CategoryWidgetUI/CategoryWidgetUI';
import FormulaWidgetUI from './widgets/FormulaWidgetUI/FormulaWidgetUI';
import BarWidgetUI from './widgets/BarWidgetUI/BarWidgetUI';
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
  LegendRamp,
  Typography,
  Button,
  PasswordField,
  SelectField,
  UploadField,
  AppBar,
  ArrowDropIcon,
  LabelWithIndicator,
  getCartoColorStylePropsForItem,
  Avatar,
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE,
  AccordionGroup
};
