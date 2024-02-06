import type React from 'react'

export enum LEGEND_TYPES {
  CATEGORY = 'category',
  ICON = 'icon',
  CONTINUOUS_RAMP = 'continuous_ramp',
  BINS = 'bins',
  PROPORTION = 'proportion',
}

export type LegendLayer = {
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
  legend?: LegendLayerVariable | LegendLayerVariable[];
};

export type LegendLayerVariable = {
  type: LEGEND_TYPES;
  select: LegendItemSelectConfig
  attr?: React.ReactNode; // subtitle to show below the legend item toggle when expanded
} & LegendType;

type LegendType = LegendBins | LegendRamp | LegendIcons | LegendCategories | LegendProportion;

type LegendColors = string | string[];
type LegendNumericLabels = number[] | { label: string; value: number }[]; 

type LegendBins = {
  colors: LegendColors
  labels: LegendNumericLabels
}
type LegendRamp = {
  colors: LegendColors
  labels: LegendNumericLabels
}
type LegendIcons = {
  icons: string[]
  labels: string[]
}
type LegendCategories = {
  colors: LegendColors
  labels: string[]
}
type LegendProportion = {
  labels: [number, number]
}

export type LegendItemSelectConfig<T = unknown> = {
  label: string;
  value: T;
  options: {
    label: string;
    value: T;
  }[];
};

export type CustomLegendComponent = React.ComponentType<{
  layer: LegendLayer;
  legend: LegendLayerVariable;
}>;
