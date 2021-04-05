import { DataFilterExtension } from '@deck.gl/extensions';

export type Credentials = {
  username: string,
  apiKey: string,
  region?: string,
  mapsVersion?: 'v1' | 'v2',
  sqlUrl?: string,
  mapsUrl?: string
}

export type UseCartoLayerFilterProps = {
  binary: boolean,
  uniqueIdProperty?: string,
  onViewportLoad: Function,
  getFilterValue: Function,
  filterRange: [number, number],
  extensions: DataFilterExtension[],
  updateTriggers: {
    getFilterValue: object
  }
}