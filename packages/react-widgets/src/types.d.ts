import { AggregationTypes } from '@carto/react-core';

type CommonWidgetProps = {
  id: string,
  title: string,
  dataSource: string,
  column: string,
  operation?: AggregationTypes,
  formatter?: Function,
  onError?: Function,
  wrapperProps?: object
}

export type CategoryWidget = {
  operationColumn?: string,
  labels?: object,
} & CommonWidgetProps;

export type FormulaWidget = CommonWidgetProps;

export type GeocoderWidget = {
  className: string,
  onError?: Function
}

export type HistogramWidget = {
  ticks: number[],
  xAxisformatter?: Function,
  tooltip?: boolean,
} & CommonWidgetProps;

export type PieWidget = {
  height: string,
  operationColumn?: string,
  tooltipFormatter?: Function
}