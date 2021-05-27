import { DataFilterExtension } from '@deck.gl/extensions';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { FeatureCollection } from 'geojson';

declare enum DEFAULT_MAPS_URLS {
  V1 = 'https://{user}.carto.com/api/v1/map',
  V2 = 'https://maps-api-v2.{region}.carto.com/user/{user}',
  V3 = 'https://maps-{tenant}'
}

export type Credentials = {
  username?: string,
  apiKey?: string,
  serverUrlTemplate?: 'https://{user}.carto.com' | string
  region?: string,
  sqlUrl?: 'https://{user}.carto.com/api/v2/sql' | string,
  mapsUrl?: DEFAULT_MAPS_URLS | string,
  accessToken?: string | null,
  tenant?: string
  apiVersion?: API_VERSIONS.V1 | API_VERSIONS.V2 | API_VERSIONS.V3
}

export type SourceProps = {
  data: string,
  type: MAP_TYPES.QUERY | MAP_TYPES.TABLE | MAP_TYPES.TILESET
  connection?: string,
  credentials: Credentials
}

export type UseCartoLayerFilterProps = {
  binary?: boolean,
  uniqueIdProperty?: string,
  onViewportLoad?: Function,
  onDataLoad?: Function
  getFilterValue: Function,
  filterRange: [number, number],
  extensions: DataFilterExtension[],
  updateTriggers: {
    getFilterValue: Record<string, unknown>
  }
} & SourceProps

export type ExecuteSQL = Promise<FeatureCollection | {}[]>;