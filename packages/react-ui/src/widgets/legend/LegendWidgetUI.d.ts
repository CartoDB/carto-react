import type React from 'react'

export enum LEGEND_TYPES {
  CATEGORY = 'category',
  ICON = 'icon',
  CONTINUOUS_RAMP = 'continuous_ramp',
  BINS = 'bins',
  PROPORTION = 'proportion',
}

export type LegendWidgetUIProps = {
  customLegendTypes?: Record<string, CustomLegendComponent>;
  layers?: LegendLayerData[];
  collapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
  onChangeLegendRowCollapsed?: ({ id, collapsed }: { id: string, collapsed: boolean }) => void;
  onChangeOpacity?: ({ id, opacity }: { id: string, opacity: number }) => void
  onChangeVisibility?: ({ id, visible }: { id: string, visible: boolean }) => void
  onChangeSelection?: ({ id, index, selection }: { id: string, index: number, selection: unknown }) => void
  title?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  maxZoom?: number
  minZoom?: number
  currentZoom?: number
  isMobile?: boolean
}

declare const LegendWidgetUI: (props: LegendWidgetUIProps) => React.ReactNode;
export default LegendWidgetUI;

export type LegendLayerData = {
  id: string;
  title?: string;
  visible?: boolean; // layer visibility state
  switchable?: boolean; // layer visibility state can be toggled on/off
  collapsed?: boolean; // layer collapsed state
  collapsible?: boolean; // layer collapsed state can be toggled on/off
  opacity?: number; // layer opacity percentage
  showOpacityControl?: boolean; // layer opacity percentage can be modified
  helperText?: React.ReactNode; // note to show below all legend items
  minZoom?: number; // min zoom at which layer is displayed
  maxZoom?: number; // max zoom at which layer is displayed
  legend: LegendLayerVariableData | LegendLayerVariableData[];
};

export type LegendLayerVariableBase = {
  type: LEGEND_TYPES | string;
  select: LegendSelectConfig
  attr?: string; // subtitle to show below the legend item toggle when expanded
}
export type LegendLayerVariableData = LegendLayerVariableBase & LegendType;

export type LegendType = LegendBins | LegendRamp | LegendIcons | LegendCategories | LegendProportion;

export type LegendColors = string | string[] | number[][];
export type LegendNumericLabels = number[] | { label: string; value: number }[]; 

export type LegendBins = {
  colors: LegendColors
  labels: LegendNumericLabels
}
export type LegendRamp = {
  colors: LegendColors
  labels: LegendNumericLabels
}
export type LegendIcons = {
  icons: string[]
  labels: string[]
}
export type LegendCategories = {
  colors: LegendColors
  labels: string[] | number[]
  isStrokeColor?: boolean
  customMarkers?: string | string[]
  maskedMarkers?: boolean
}
export type LegendProportion = {
  labels: [number, number]
}

export type LegendSelectConfig<T = unknown> = {
  label: string;
  value: T;
  options: {
    label: string;
    value: T;
  }[];
};

export type CustomLegendComponent = React.ComponentType<{
  layer: LegendLayerData;
  legend: LegendLayerVariableData;
}>;
