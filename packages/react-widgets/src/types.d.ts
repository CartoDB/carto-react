import { AggregationTypes } from '@carto/react-core';

type CommonWidgetProps = {
  id: string,
  title: string,
  dataSource: string,
  onError?: Function,
  wrapperProps?: object
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

export type FormulaWidget = CommonWidgetProps & MonoColumnWidgetProps;

export type GeocoderWidget = {
  className: string,
  onError?: Function
}

export type HistogramWidget = {
  ticks: number[],
  xAxisformatter?: Function,
  tooltip?: boolean,
} & CommonWidgetProps & MonoColumnWidgetProps;

export type PieWidget = {
  height: string,
  operationColumn?: string,
  tooltipFormatter?: Function
}

export type ScatterPlotWidget = {
  xAxisColumn: string,
  yAxisColumn: string,
  xAxisFormatter?: Function,
  yAxisFormatter?: Function,
  tooltipFormatter?: Function
} & CommonWidgetProps

export type useSourceFilters =  {
  dataSource: string,
  id: string,
};

export type NoDataAlert = {
  title: string,
  body: string,
};