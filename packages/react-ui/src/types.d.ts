export type CartoThemeOptions = {
  themeName: 'CARTO',
  breakpoints: object,
  direction: string,
  mixins: object,
  palette: object,
  shadows: string[],
  typography: object,
  spacing: object,
  shape: object,
  transitions: object,
  zIndex: object,
  overrides: object,
  props: object
}

export type WrapperWidgetUI = {
  title: string,
  isLoading?: boolean,
  expandable?: boolean,
  actions?: { id: string, name: string, icon: React.ReactElement, action: Function }[],
  options?: { id: string, name: string, action: Function }[],
  children?: React.ReactNode
};

export type CategoryWidgetUIData = { name: string, value: number }[]

export type CategoryWidgetUI = {
  data: CategoryWidgetUIData,
  isLoading?: boolean,
  formatter?: Function,
  labels?: object,
  maxItems?: number,
  selectedCategories?: string[],
  onSelectedCategoriesChange?: Function,
  order?: 'ranking' | 'fixed'
};

export type FormulaWidgetUIData = string | number | { value: string[] | number[], unit: string };

export type FormulaWidgetUI = {
  data: FormulaWidgetUIData,
  unitBefore?: boolean,
  formatter?: Function
}

export type HistogramWidgetUIData = number[];

export type HistogramWidgetUI = {
  data: HistogramWidgetUIData,
  tooltip?: boolean,
  tooltipFormatter?: Function,
  xAxisFormatter?: Function,
  yAxisFormatter?: Function,
  dataAxis?: unknown[],
  name?: string,
  onSelectedBarsChange?: Function,
  height?: number
}

export type PieWidgetUIData = { name: string, value: number }[];

export type PieWidgetUI = {
  name: string,
  data: PieWidgetUIData,
  colors?: string[],
  formatter?: Function,
  tooltipFormatter?: Function,
  height?: string,
  selectedCategories?: string[],
  onSelectedCategoriesChange?: Function
}