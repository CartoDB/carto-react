import { DataFilterExtension, MaskExtension } from '@deck.gl/extensions/typed';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto/typed';
import { QueryParameters } from '@deck.gl/carto/typed';
import { FeatureCollection } from 'geojson';

type ApiVersionsType = typeof API_VERSIONS;
type MapTypesType = typeof MAP_TYPES;
interface CredentialsCarto2 {
  apiVersion: ApiVersionsType['V1'] | ApiVersionsType['V2'];
  username: string;
  apiKey: string;
  region?: string;
  mapsUrl?: string;
  serverUrlTemplate?: string;
}

interface CredentialsCarto3 {
  apiVersion?: ApiVersionsType['V3'];
  apiBaseUrl?: string;
  accessToken?: string;
}

export type Credentials = CredentialsCarto2 | CredentialsCarto3;

/*
  SourceProps can be passed to a new CartoLayer for map instantiation.
  Check CartoLayer props at https://deck.gl/docs/api-reference/carto/carto-layer
*/
export type SourceProps = {
  data: string;
  type: MapTypesType['QUERY'] | MapTypesType['TABLE'] | MapTypesType['TILESET'];
  connection: string;
  geoColumn?: string;
  aggregationExp?: string;
  credentials?: Credentials;
  queryParameters?: QueryParameters;
  provider?: 'bigquery' | 'postgres' | 'snowflake' | 'redshift' | 'databricks';
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
