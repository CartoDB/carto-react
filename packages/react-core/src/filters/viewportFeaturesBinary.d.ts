type ViewportFeaturesBinary = {
  tiles: any, // TODO: add proper deck.gl type
  viewport: [number, number, number, number],
  uniqueIdProperty: string
}

export function viewportFeatures(arg: ViewportFeaturesBinary): object[];