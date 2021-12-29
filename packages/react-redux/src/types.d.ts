import { Credentials } from '@carto/react-api';
import { OauthApp } from '@carto/react-auth';
import { CartoBasemapsNames } from '@carto/react-basemaps';
import { DRAW_MODES, Viewport } from '@carto/react-core';

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

type InitialCarto2State = {
  viewState: ViewState,
  basemap: CartoBasemapsNames,
  credentials: Credentials,
  googleApiKey: string,
}

type OauthCarto3 = {
  domain: string,
  clientId: string,
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
  geocoderResult: object | null,
  error: null, // TODO: remove from state?
  layers: { [key: string]: string },
  dataSources: { [key: string]: string },
  featuresReady: { [key: string]: boolean },
  drawingToolEnabled: boolean,
  drawingToolMode: typeof DRAW_MODES
} & InitialCartoState;

export type InitialOauthState = {
  oauthApp: OauthApp
}

export type OauthState = {
  token: string,
  userInfo: string
} & InitialOauthState;
