/// <reference types="react" />
import { GroupDateTypes } from '@carto/react-core';
export declare type WrapperWidgetUI = {
    title: string;
    isLoading?: boolean;
    expandable?: boolean;
    actions?: {
        id: string;
        name: string;
        icon: React.ReactElement;
        action: Function;
    }[];
    options?: {
        id: string;
        name: string;
        action: Function;
    }[];
    children?: React.ReactNode;
};
export declare type CategoryWidgetUIData = {
    name: string;
    value: number;
}[];
export declare type CategoryWidgetUI = {
    data: CategoryWidgetUIData;
    isLoading?: boolean;
    formatter?: Function;
    labels?: object;
    maxItems?: number;
    selectedCategories?: string[];
    onSelectedCategoriesChange?: Function;
    order?: 'ranking' | 'fixed';
};
export declare type FormulaWidgetUIData = string | number | {
    value: string[] | number[];
    unit: string;
};
export declare type FormulaWidgetUI = {
    data: FormulaWidgetUIData;
    unitBefore?: boolean;
    formatter?: Function;
};
export declare type HistogramWidgetUIData = number[];
export declare type HistogramWidgetUI = {
    data: HistogramWidgetUIData;
    tooltip?: boolean;
    tooltipFormatter?: Function;
    xAxisFormatter?: Function;
    yAxisFormatter?: Function;
    dataAxis?: unknown[];
    name?: string;
    onSelectedBarsChange?: Function;
    height?: number;
};
export declare type PieWidgetUIData = {
    name: string;
    value: number;
}[];
export declare type PieWidgetUI = {
    name: string;
    data: PieWidgetUIData;
    formatter?: Function;
    tooltipFormatter?: Function;
    height?: string;
    colors?: string[];
    selectedCategories?: string[];
    onSelectedCategoriesChange?: Function;
};
export declare type Layer = {
    id: string | number;
    title: string;
    switchable: boolean;
    visible: boolean;
    legend?: LegendWidgetUIData;
};
export declare type LegendWidgetUIData = {
    type: string;
    children?: Node;
    collapsible?: boolean;
    note?: string;
    attr?: string;
    colors?: string[];
    labels?: (string | number)[];
    icons?: string[];
};
export declare type LegendWidgetUI = {
    className?: string;
    customLegendTypes?: Record<string, Function>;
    layers?: LegendWidgetUIData[];
    collapsed?: boolean;
    onChangeCollapsed?: (collapsed: boolean) => void;
    onChangeVisibility?: (args: {
        id: string;
        visible: boolean;
    }) => void;
    onChangeOpacity?: (args: {
        id: string;
        visible: boolean;
    }) => void;
    onChangeLegendRowCollapsed?: (args: {
        id: string;
        collapsed: boolean;
    }) => void;
};
export declare type ScatterPlotWidgetUIData = number[][];
export declare type ScatterPlotWidgetUI = {
    name: string;
    data: ScatterPlotWidgetUIData;
    xAxisFormatter?: Function;
    yAxisFormatter?: Function;
    tooltipFormatter?: Function;
};
export declare type TimeSeriesWidgetUIData = {
    name: number;
    value: number;
}[];
export declare type TimeSeriesWidgetUI = {
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
};
export declare type NoDataAlert = {
    title: string;
    body: string;
};
export declare type FeatureSelectionWidgetUIData = {
    id: string;
    label: string;
    icon: React.ReactElement;
};
export declare type FeatureSelectionWidgetUI = {
    selectionModes: FeatureSelectionWidgetUIData[];
    editModes: FeatureSelectionWidgetUIData[];
    selectedMode: string;
    onSelectMode?: Function;
    activated?: boolean;
    onActivatedChange?: Function;
    geometry?: any;
    onSelectGeometry?: Function;
    tooltipPlacement?: string;
    className?: string;
};
export declare type LegendCategories = {
    legend: {
        labels?: (string | number)[];
        colors?: string | string[] | number[][];
        isStrokeColor?: boolean;
    };
};
export declare type LegendIcon = {
    legend: {
        labels?: string[];
        icons?: string[];
    };
};
export declare type LegendProportion = {
    legend: {
        labels?: (number | string)[];
    };
};
export declare type LegendRamp = {
    isContinuous?: boolean;
    legend: {
        labels?: (number | string)[];
        colors?: string | string[] | number[][];
    };
};
