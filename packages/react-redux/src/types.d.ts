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
  credentials: {}, // TODO: add Credentials type
  googleApiKey: string
}

export type InitialOauthState = {
  oauthApp: {} // TODO: add OauthApp type
}
  