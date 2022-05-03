import { DataFilterExtension, MaskExtension } from '@deck.gl/extensions';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { FeatureCollection } from 'geojson';

interface CredentialsCarto2 {
  apiVersion: API_VERSIONS.V1 | API_VERSIONS.V2;
  username: string;
  apiKey: string;
  region?: string;
  mapsUrl?: string;
  serverUrlTemplate?: string;
}

interface CredentialsCarto3 {
  apiVersion?: API_VERSIONS.V3;
  apiBaseUrl?: string;
  accessToken?: string;
}

export type Credentials = CredentialsCarto2 | CredentialsCarto3;

export type SourceProps = {
  data: string;
  type: MAP_TYPES.QUERY | MAP_TYPES.TABLE | MAP_TYPES.TILESET;
  connection?: string;
  credentials: Credentials;
};

export type LayerConfig = {
  id: string;
  source?: string;
  visible?: boolean;
  opacity?: number;
  [key: string]: unknown;
};

export type UseCartoLayerFilterProps = {
  binary?: boolean;
  uniqueIdProperty?: string;
  onViewportLoad?: Function;
  onDataLoad?: Function;
  getFilterValue: Function;
  filterRange: [number, number];
  extensions: [DataFilterExtension, MaskExtension];
  updateTriggers: {
    getFilterValue: Record<string, unknown>;
  };
  maskEnabled: boolean;
  maskId: string;
} & SourceProps;

export type ExecuteSQLResponse<Response = FeatureCollection | {}[]> = Promise<Response>;
