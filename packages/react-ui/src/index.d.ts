import { theme, cartoThemeOptions, CartoTheme } from './theme/carto-theme';
import WrapperWidgetUI, {
  WrapperWidgetUIProps,
  WrapperWidgetAction,
  WrapperWidgetOption
} from './widgets/WrapperWidgetUI';
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
import RangeWidgetUI from './widgets/RangeWidgetUI/RangeWidgetUI';
import useTimeSeriesInteractivity from './widgets/TimeSeriesWidgetUI/hooks/useTimeSeriesInteractivity';
import { CHART_TYPES } from './widgets/TimeSeriesWidgetUI/utils/constants';
import TableWidgetUI from './widgets/TableWidgetUI/TableWidgetUI';
import NoDataAlert from './widgets/NoDataAlert';
import FeatureSelectionWidgetUI from './widgets/FeatureSelectionWidgetUI/FeatureSelectionWidgetUI';
import FeatureSelectionUIDropdown from './widgets/FeatureSelectionWidgetUI/FeatureSelectionUIDropdown';
import FeatureSelectionUIGeometryChips from './widgets/FeatureSelectionWidgetUI/FeatureSelectionUIGeometryChips';
import FeatureSelectionUIToggleButton from './widgets/FeatureSelectionWidgetUI/FeatureSelectionUIToggleButton';
import ComparativePieWidgetUI from './widgets/comparative/ComparativePieWidgetUI';
import ComparativeFormulaWidgetUI from './widgets/comparative/ComparativeFormulaWidgetUI/ComparativeFormulaWidgetUI';
import ComparativeCategoryWidgetUI from './widgets/comparative/ComparativeCategoryWidgetUI/ComparativeCategoryWidgetUI';
import Typography, {
  CartoFontWeight,
  TypographyProps
} from './components/atoms/Typography';
import Button, { ButtonProps } from './components/atoms/Button';
import SelectField, { SelectFieldProps } from './components/atoms/SelectField';
import MultipleSelectField, {
  MultipleSelectFieldProps
} from './components/molecules/MultipleSelectField/MultipleSelectField';
import PasswordField, { PasswordFieldProps } from './components/atoms/PasswordField';
import ToggleButtonGroup, {
  ToggleButtonGroupProps
} from './components/atoms/ToggleButtonGroup';
import UploadField, {
  UploadFieldProps
} from './components/molecules/UploadField/UploadField';
import UploadFieldBase, {
  UploadFieldBaseProps
} from './components/molecules/UploadField/UploadFieldBase';
import Menu, { MenuProps } from './components/molecules/Menu';
import MenuList, { MenuListProps } from './components/molecules/MenuList';
import MenuItem, { MenuItemProps } from './components/molecules/MenuItem';
import AppBar, { AppBarProps } from './components/organisms/AppBar/AppBar';
import LabelWithIndicator, {
  LabelWithIndicatorProps
} from './components/atoms/LabelWithIndicator';
import { getCartoColorStylePropsForItem } from './utils/palette';
import Avatar, { AvatarProps } from './components/molecules/Avatar';
import {
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE
} from './theme/themeConstants';
import ArrowDropIcon from './assets/icons/ArrowDropIcon';
import AccordionGroup, {
  AccordionGroupProps
} from './components/molecules/AccordionGroup';
import Alert, { CartoAlertSeverity, AlertProps } from './components/molecules/Alert';

export {
  theme,
  cartoThemeOptions,
  CartoTheme,
  WrapperWidgetUI,
  WrapperWidgetUIProps,
  WrapperWidgetAction,
  WrapperWidgetOption,
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
  FeatureSelectionUIDropdown,
  FeatureSelectionUIGeometryChips,
  FeatureSelectionUIToggleButton,
  ComparativeFormulaWidgetUI,
  ComparativeCategoryWidgetUI,
  LEGEND_TYPES,
  NoDataAlert,
  LegendCategories,
  LegendIcon,
  LegendProportion,
  LegendRamp,
  Typography,
  TypographyProps,
  CartoFontWeight,
  Button,
  ButtonProps,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  PasswordField,
  PasswordFieldProps,
  SelectField,
  SelectFieldProps,
  MultipleSelectField,
  MultipleSelectFieldProps,
  UploadField,
  UploadFieldProps,
  UploadFieldBase,
  UploadFieldBaseProps,
  Menu,
  MenuProps,
  MenuList,
  MenuListProps,
  MenuItem,
  MenuItemProps,
  AppBar,
  AppBarProps,
  LabelWithIndicator,
  LabelWithIndicatorProps,
  getCartoColorStylePropsForItem,
  Avatar,
  AvatarProps,
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE,
  ArrowDropIcon,
  AccordionGroup,
  AccordionGroupProps,
  Alert,
  AlertProps,
  CartoAlertSeverity
};
