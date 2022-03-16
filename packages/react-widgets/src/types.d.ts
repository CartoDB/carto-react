import { AggregationTypes } from '@carto/react-core';
declare type CommonWidgetProps = {
    id: string;
    title: string;
    dataSource: string;
    onError?: Function;
    wrapperProps?: object;
    noDataAlertProps?: object;
};
declare type MonoColumnWidgetProps = {
    column: string;
    operation?: AggregationTypes;
    formatter?: Function;
};
export declare type CategoryWidget = {
    operationColumn?: string;
    labels?: object;
} & CommonWidgetProps & MonoColumnWidgetProps;
export declare type FormulaWidget = CommonWidgetProps & MonoColumnWidgetProps;
export declare type GeocoderWidget = {
    className: string;
    onError?: Function;
};
export declare type HistogramWidget = {
    ticks: number[];
    xAxisformatter?: Function;
    tooltip?: boolean;
} & CommonWidgetProps & MonoColumnWidgetProps;
export declare type PieWidget = {
    height: string;
    operationColumn?: string;
    tooltipFormatter?: Function;
    colors?: string[];
} & CommonWidgetProps & MonoColumnWidgetProps;
export declare type ScatterPlotWidget = {
    xAxisColumn: string;
    yAxisColumn: string;
    xAxisFormatter?: Function;
    yAxisFormatter?: Function;
    tooltipFormatter?: Function;
} & CommonWidgetProps;
export declare type useSourceFilters = {
    dataSource: string;
    id: string;
};
export declare type TimeSeriesWidget = {
    operationColumn?: string;
    stepSize: string;
    stepSizeOptions?: string[];
    chartType?: string;
    tooltip?: boolean;
    tooltipFormatter?: Function;
    formatter?: Function;
    height?: string;
    showControls?: boolean;
    isPlaying?: boolean;
    isPaused?: boolean;
    timeWindow?: any[];
    onPlay?: Function;
    onPause?: Function;
    onStop?: Function;
    onTimelineUpdate?: Function;
    onTimeWindowUpdate?: Function;
} & CommonWidgetProps & MonoColumnWidgetProps;
export declare type LegendWidget = {
    className?: string;
    initialCollapsed?: boolean;
    customLegendTypes?: Record<string, Function>;
};
export {};
