export type GMap = {
  basemap: object,
  viewState: object,
  layers: object[],
  getTooltip: Function,
  onResize: Function,
  onViewStateChange: Function,
  apiKey: string
}
