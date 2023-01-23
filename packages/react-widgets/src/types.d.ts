import { AggregationTypes } from '@carto/react-core';

type CommonWidgetProps = {
  id: string,
  title: string,
  dataSource: string,
  onError?: Function,
  wrapperProps?: object,
  noDataAlertProps?: object
  droppingFeaturesAlertProps?: object
}

type MonoColumnWidgetProps = {
  column: string,
  operation?: AggregationTypes,
  formatter?: Function,
}

export type CategoryWidget = {
  operationColumn?: string,
  labels?: object,
} & CommonWidgetProps & MonoColumnWidgetProps;

export type BarWidget = {
  operationColumn?: string | string[],
  labels?: object,
  column: string,
  operation?: AggregationTypes,
  joinOperation?: AggregationTypes,
  xAxisFormatter?: Function,
  yAxisFormatter?: Function,
  tooltip?: boolean,
  tooltipFormatter?: Function,
  order?: string[],
  animation?: boolean;
  filterable?: boolean;
  global?: boolean,
  height?: string | number,
} & CommonWidgetProps;

export type FormulaWidget = CommonWidgetProps & MonoColumnWidgetProps;

export type GeocoderWidget = {
  className: string,
  onError?: Function
}

export type HistogramWidget = {
  ticks?: number[],
  bins?: number;
  min?: number;
  max?: number;
  xAxisformatter?: Function,
  tooltip?: boolean,
} & CommonWidgetProps & MonoColumnWidgetProps;

export type PieWidget = {
  height: string,
  operationColumn?: string,
  tooltipFormatter?: Function,
  colors?: string[];
} & CommonWidgetProps & MonoColumnWidgetProps;

export type ScatterPlotWidget = {
  xAxisColumn: string,
  yAxisColumn: string,
  xAxisFormatter?: Function,
  yAxisFormatter?: Function,
  tooltipFormatter?: Function
} & CommonWidgetProps;

export type useSourceFilters =  {
  dataSource: string,
  id: string,
};

export type TimeSeriesWidget = {
  operationColumn?: string,
  stepSize: string,
  stepSizeOptions?: string[],
  chartType?: string,
  tooltip?: boolean,
  tooltipFormatter?: Function,
  formatter?: Function,
  height?: string,
  showControls?: boolean,
  isPlaying?: boolean,
  isPaused?: boolean,
  timeWindow?: any[],
  onPlay?: Function,
  onPause?: Function,
  onStop?: Function,
  onTimelineUpdate?: Function,
  onTimeWindowUpdate?: Function
} & CommonWidgetProps & MonoColumnWidgetProps;

export type LegendWidget = {
  className?: string;
  initialCollapsed?: boolean;
  customLegendTypes?: Record<string, Function>;
  layerOrder?: string[];
}

export type WidgetWithAlert = {
  dataSource: string;
  global?: boolean;
  noDataAlertProps?: object;
  droppingFeaturesAlertProps?: object;
  children?: React.ReactNode;
}

export type FeatureSelectionWidget = {
  className?: string;
  selectionModes?: string[],
  editModes?: string[],
  tooltipPlacement?: string,
}
