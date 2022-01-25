import { DataFilterExtension } from '@deck.gl/extensions';
// TODO change this after publish a new version of Deck GL @types
import * as extensions from '@deck.gl/extensions';
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

export type UseCartoLayerFilterProps = {
  binary?: boolean;
  uniqueIdProperty?: string;
  onViewportLoad?: Function;
  onDataLoad?: Function;
  getFilterValue: Function;
  filterRange: [number, number];
  extensions: [DataFilterExtension, extensions.MaskExtension];
  updateTriggers: {
    getFilterValue: Record<string, unknown>;
  };
  maskId?: string
} & SourceProps;

export type ExecuteSQLResponse<Response = FeatureCollection | {}[]> = Promise<Response>;
