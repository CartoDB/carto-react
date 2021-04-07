import { Credentials } from '@carto/react-api';
import { OauthApp } from '@carto/react-auth';
import { CartoBasemapsNames } from '@carto/react-basemaps';

export type InitialCartoState = {
  viewState: {
    latitude: number,
    longitude: number,
    zoom: number,
    pitch: number,
    bearing: number,
    dragRotate: false
  },
  basemap: CartoBasemapsNames.POSITRON,
  credentials: Credentials,
  googleApiKey: string
}

export type InitialOauthState = {
  oauthApp: OauthApp
}
  