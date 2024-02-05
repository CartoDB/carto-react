import type React from 'react'

export enum LEGEND_TYPES {
  CATEGORY = 'category',
  ICON = 'icon',
  CONTINUOUS_RAMP = 'continuous_ramp',
  BINS = 'bins',
  PROPORTION = 'proportion',
  CUSTOM = 'custom'
}

export type LegendData = {
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
  legend?: LegendItemData | LegendItemData[];
};

export type LegendItemData = {
  type: LEGEND_TYPES;
  children?: React.ReactNode;
  attr?: React.ReactNode; // subtitle
  colors?: string[];
  labels?: (string | number)[];
  icons?: string[];
  select: LegendItemSelectConfig
};

export type LegendItemSelectConfig<T = unknown> = {
  label: string;
  value: T;
  options: {
    label: string;
    value: T;
  }[];
};
