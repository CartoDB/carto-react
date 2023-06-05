import { GroupDateTypes } from '@carto/react-core';
import { SxProps, Theme } from '@mui/material';
export { SelectFieldProps } from './components/atoms/SelectField';
export { TypographyProps } from './components/atoms/Typography';
export { LabelWithIndicatorProps } from './components/atoms/LabelWithIndicator';
export { AvatarProps } from './components/molecules/Avatar';
export { AccordionGroupProps } from './components/molecules/AccordionGroup';
export { UploadFieldProps } from './components/molecules/UploadField/UploadField';
export { AppBarProps } from './components/organisms/AppBar/AppBar';

export type WrapperWidgetUI = {
  title: string;
  isLoading?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onExpandedChange?: (v: boolean) => void;
  actions?: { id: string; name: string; icon: React.ReactElement; action: Function }[];
  options?: { id: string; name: string; action: Function }[];
  children?: React.ReactNode;
};

export type CategoryWidgetUIData = { name: number | string | boolean; value: number }[];
export type CategoryWidgetUI = {
  data: CategoryWidgetUIData;
  formatter?: Function;
  labels?: object;
  maxItems?: number;
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
  order?: 'ranking' | 'fixed';
  isLoading?: boolean;
};

export type FormulaWidgetUIData =
  | string
  | number
  | { value: string[] | number[]; prefix?: string; suffix?: string };
export type FormulaWidgetUI = {
  data: FormulaWidgetUIData;
  formatter?: Function;
  isLoading?: boolean;
};

export type HistogramWidgetUIData = number[];
export type HistogramWidgetUI = {
  data: HistogramWidgetUIData;
  tooltip?: boolean;
  tooltipFormatter?: Function;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  dataAxis?: unknown[];
  name?: string;
  onSelectedBarsChange?: Function;
  height?: number;
  isLoading?: boolean;
};

export type BarWidgetUI = {
  xAxisData: (string | number)[];
  yAxisData: (string | number)[] | (string | number)[][];
  series?: string[];
  colors?: string | string[];
  stacked?: boolean;
  labels?: object;
  tooltip?: boolean;
  tooltipFormatter?: Function;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  selectedBars?: number[] | [number, number][];
  onSelectedBarsChange?: Function;
  height?: string | number;
  filterable?: boolean;
  animation?: boolean;
  isLoading?: boolean;
};

export type PieWidgetUIData = { name: string; value: number }[];
export type PieWidgetUI = {
  name: string;
  data: PieWidgetUIData;
  formatter?: Function;
  tooltipFormatter?: Function;
  height?: string;
  colors?: string[];
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
  isLoading?: boolean;
};

export type Layer = {
  id: string | number;
  title: string;
  switchable: boolean;
  visible: boolean;
  legend?: LegendWidgetUIData;
};

export type LegendWidgetUIData = {
  type: string;
  children?: Node;
  collapsible?: boolean;
  note?: string;
  attr?: string;
  colors?: string[];
  labels?: (string | number)[];
  icons?: string[];
};

export type LegendWidgetUI = {
  className?: string;
  customLegendTypes?: Record<string, Function>;
  layers?: LegendWidgetUIData[];
  collapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
  onChangeVisibility?: (args: { id: string; visible: boolean }) => void;
  onChangeOpacity?: (args: { id: string; visible: boolean }) => void;
  onChangeLegendRowCollapsed?: (args: { id: string; collapsed: boolean }) => void;
};

export type ScatterPlotWidgetUIData = number[][];
export type ScatterPlotWidgetUI = {
  name: string;
  data: ScatterPlotWidgetUIData;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  tooltipFormatter?: Function;
  isLoading?: boolean;
};

export type TimeSeriesWidgetUIData = { name: number; value: number }[];
export type TimeSeriesWidgetUI = {
  data: TimeSeriesWidgetUIData;
  stepSize: GroupDateTypes;
  chartType?: string;
  duration?: number;
  tooltip?: boolean;
  tooltipFormatter?: Function;
  height?: string;
  isPlaying?: boolean;
  onPlay?: Function;
  isPaused?: boolean;
  onPause?: Function;
  onStop?: Function;
  timelinePosition?: number;
  onTimelineUpdate?: Function;
  timeWindow?: any[];
  onTimeWindowUpdate?: Function;
  showControls?: boolean;
  isLoading?: boolean;
};

export type NoDataAlert = {
  title: string;
  body: string;
};

export type FeatureSelectionWidgetUIData = {
  id: string;
  label: string;
  icon: React.ReactNode;
};
export type FeatureSelectionWidgetUI = {
  selectionModes: FeatureSelectionWidgetUIData[];
  editModes?: FeatureSelectionWidgetUIData[];
  selectedMode: string;
  onSelectMode?: Function;
  enabled?: boolean;
  onEnabledChange?: Function;
  geometry?: GeoJSON.Feature;
  onSelectGeometry?: Function;
  onDeleteGeometry?: Function;
  className?: string;
  sx?: SxProps<Theme>;
  tooltipPlacement?: "bottom" | "left" | "right" | "top";
};

export type FeatureSelectionUIDropdown = {
  className?: string;
  sx?: SxProps<Theme>;
  selectionModes: FeatureSelectionWidgetUIData[];
  editModes: FeatureSelectionWidgetUIData[];
  selectedMode: string;
  onSelectMode?: Function;
  enabled?: boolean;
  onEnabledChange?: Function;
  tooltipPlacement?: "bottom" | "left" | "right" | "top";
};
export type FeatureSelectionUIGeometryChips = {
  className?: string;
  sx?: SxProps<Theme>;
  features: GeoJSON.Feature[];
  onSelectGeometry?: Function;
  onDeleteGeometry?: Function;
  chipTooltip?: string;
  disabledChipTooltip?: string;
  size?: 'small' | 'medium';
  tooltipPlacement?: "bottom" | "left" | "right" | "top";
};
export type FeatureSelectionUIToggleButton = {
  className?: string;
  sx?: SxProps<Theme>;
  icon: React.ReactNode;
  hoverTooltip?: string;
  clickTooltip?: string;
  enabled?: boolean;
  onEnabledChange?: Function;
  tooltipPlacement?: "bottom" | "left" | "right" | "top";
};

// Legends
export type LegendCategories = {
  legend: {
    labels?: (string | number)[];
    colors?: string | string[] | number[][];
    isStrokeColor?: boolean;
  };
};

export type LegendIcon = {
  legend: {
    labels?: string[];
    icons?: string[];
  };
};

export type LegendProportion = {
  legend: {
    labels?: (number | string)[];
  };
};

export type LegendRamp = {
  isContinuous?: boolean;
  legend: {
    labels?: (number | string)[];
    colors?: string | string[] | number[][];
  };
};

export type AnimationOptions = {
  duration?: number;
  animateOnMount?: boolean;
  initialValue?: number;
};

export type AnimatedNumber = {
  enabled: boolean;
  value: number;
  options?: AnimationOptions;
  formatter: (n: number) => React.ReactNode;
};

export type FormulaData = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: React.ReactNode;
  value: number;
};

export type ComparativeFormulaWidgetUI = {
  data: FormulaData[];
  colors?: string[];
  animated?: boolean;
  animationOptions?: AnimationOptions;
  formatter?: (n: number) => React.ReactNode;
  isLoading?: boolean;
};

export enum ORDER_TYPES {
  RANKING = 'ranking',
  FIXED = 'fixed'
}

type CategoryData = {
  name: string;
  value: number;
};

export type ComparativeCategoryWidgetUI = {
  names: string[];
  data: CategoryData[][];
  labels?: string[];
  colors?: string[];
  maxItems?: number;
  order?: ORDER_TYPES;
  animation?: boolean;
  animationOptions?: AnimationOptions;
  searchable?: boolean;
  filterable?: boolean;
  selectedCategories?: string[];
  onSelectedCategoriesChange?: (categories: string[]) => any;
  formatter?: (v: any) => string;
  tooltipFormatter?: (v: any) => string;
  isLoading?: boolean;
};

export type PieData = {
  name: string;
  value: number;
};

export type ComparativePieWidgetUIProps = {
  names: string[];
  data: PieData[][];
  labels?: string[][];
  colors?: string[][];
  height?: string;
  animation?: boolean;
  formatter?: (v: number) => string;
  tooltipFormatter?: (v: any) => string;
  selectedCategories?: string[];
  onCategorySelected?: (categories: string[]) => any;
  isLoading?: boolean;
};

// Tooltip data
// Export types and component if we need it outsite C4R
type TooltipDataProps = {
  items: [
    {
      category?: string;
      value: string | number;
      outlinedBullet?: boolean;
      color?: 'primary' | 'secondary';
    }
  ];
  title?: string;
};
