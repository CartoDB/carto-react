import { Credentials, SourceProps } from '@carto/react-api';
import { OauthApp } from '@carto/react-auth';
import { CartoBasemapsNames, GMapsBasemaps } from '@carto/react-basemaps';
import { Viewport, FiltersLogicalOperators, _FilterTypes } from '@carto/react-core';
import { Geometry } from 'geojson';

export type ViewState = {
  latitude?: number,
  longitude?: number,
  zoom?: number,
  pitch?: number,
  bearing?: number,
  dragRotate?: boolean,
  width?: number,
  height?: number,
}

type FilterValues = string[] | number[] | number[][]

export type SourceFilters = {
  [column: string]: Partial<Record<_FilterTypes, { values: FilterValues; owner?: string; params?: Record<string, unknown>; }>>
}

export type Source = SourceProps & {
  id: string;
  filters?: SourceFilters;
  filtersLogicalOperator?: FiltersLogicalOperators;
  isDroppingFeatures?: boolean;
};

type InitialCarto2State = {
  accountsUrl?: string,
  viewState: ViewState,
  basemap: CartoBasemapsNames | GMapsBasemaps,
  credentials: Credentials,
  googleApiKey: string,
  googleMapId: string,
}

type OauthCarto3 = {
  namespace?: string,
  domain: string,
  clientId: string,
  organizationId: string,
  scopes: Array<string>
  audience: string,
  authorizeEndPoint: string
}

type InitialCarto3State = {
  oauth?: OauthCarto3
} & InitialCarto2State;

export type InitialCartoState = InitialCarto2State | InitialCarto3State;

export type CartoState = {
  viewport: Viewport | undefined,
  geocoderResult: Record<string,any> | null,
  error: null, // TODO: remove from state?
  layers: { [key: string]: string },
  dataSources: { [key: string]: Source },
  spatialFilter: Geometry,
  featuresReady: { [key: string]: boolean },
  featureSelectionEnabled: boolean,
  featureSelectionMode: string
} & InitialCartoState;

export type InitialOauthState = {
  oauthApp: OauthApp
}

export type OauthState = {
  token: string,
  userInfo: string
} & InitialOauthState;
