export type WrapperWidgetUI = {
  title: string;
  isLoading?: boolean;
  expandable?: boolean;
  actions?: { id: string; name: string; icon: React.ReactElement; action: Function }[];
  options?: { id: string; name: string; action: Function }[];
  children?: React.ReactNode;
};

export type CategoryWidgetUIData = { name: string; value: number }[];
export type CategoryWidgetUI = {
  data: CategoryWidgetUIData;
  isLoading?: boolean;
  formatter?: Function;
  labels?: object;
  maxItems?: number;
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
  order?: 'ranking' | 'fixed';
};

export type FormulaWidgetUIData =
  | string
  | number
  | { value: string[] | number[]; unit: string };
export type FormulaWidgetUI = {
  data: FormulaWidgetUIData;
  unitBefore?: boolean;
  formatter?: Function;
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
  children?: Node,
  collapsible?: boolean;
  note?: string;
  attr?: string;
  colors?: string[];
  labels?: (string | number)[];
  icons?: string[];
  stats?: {
    min: number | string;
    max: number | string;
  };
};

export type LegendWidgetUI = {
  layers: LegendWidgetUIData[];
  onChangeVisibility: ({ id: string, visible: boolean }) => void;
};

export type ScatterPlotWidgetUIData = number[][];
export type ScatterPlotWidgetUI = {
  name: string;
  data: ScatterPlotWidgetUIData;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  tooltipFormatter?: Function;
};

export type TimeSeriesWidgetUIData = number[][];
export type TimeSeriesWidgetUI = {
};
