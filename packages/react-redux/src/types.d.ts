import { Credentials } from '@carto/react-api';
import { OauthApp } from '@carto/react-auth';
import { CartoBasemapsNames } from '@carto/react-basemaps';
import { Viewport } from '@carto/react-core';
import { AnyAction } from 'redux';

export type ViewState = {
  latitude?: number,
  longitude?: number,
  zoom?: number,
  pitch?: number,
  bearing?: number,
  dragRotate?: boolean
}

export type InitialCartoState = {
  viewState: ViewState,
  basemap: CartoBasemapsNames,
  credentials: Credentials,
  googleApiKey: string,
}

export type InitialCartoCloudNativeState = {
  viewState: ViewState,
  basemap: CartoBasemapsNames,
  credentials: Credentials,
  googleApiKey: string,
  oauth?: OauthCartoCloudNative
}

export type OauthCartoCloudNative = {
  domain: string,
  clientId: string,
  scopes: Array<string>
  audience: string,
  authorizeEndPoint: string
}

export type CartoState = {
  viewport: Viewport | undefined,
  geocoderResult: object | null,
  error: null, // TODO: remove from state?
  layers: { [key: string]: string },
  dataSources: { [key: string]: string },
  viewportFeatures: { [key: string]: object },
  viewportFeaturesReady: { [key: string]: boolean },
  widgetsLoadingState: { [key: string]: boolean }
} & InitialCartoState;

export type InitialOauthState = {
  oauthApp: OauthApp
}

export type OauthState = {
  token: string,
  userInfo: string
} & InitialOauthState;

export type Reducer = {
  state: CartoState | OauthState,
  action: AnyAction
}
