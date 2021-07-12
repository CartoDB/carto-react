import { DataFilterExtension } from '@deck.gl/extensions';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { FeatureCollection } from 'geojson';

interface Credentials2 {
  apiVersion: API_VERSIONS.V1 | API_VERSIONS.V2,
  username: string,
  apiKey: string,
  region?: string,
  mapsUrl?: string,
  serverUrlTemplate?: string
}

interface Credentials3 {
  apiVersion?: API_VERSIONS.V3,
  apiBaseUrl?: string,
  accessToken?: string,
}

export type Credentials = Credentials2 | Credentials3;

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
