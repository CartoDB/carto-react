import { Credentials } from '@carto/react-api';
import { OauthApp } from '@carto/react-auth';
import { CartoBasemapsNames, GMapsBasemaps } from '@carto/react-basemaps';
import { Viewport } from '@carto/react-core/types';
import { Geometry } from 'geojson';
export declare type ViewState = {
    latitude?: number;
    longitude?: number;
    zoom?: number;
    pitch?: number;
    bearing?: number;
    dragRotate?: boolean;
    width?: number;
    height?: number;
};
declare type InitialCarto2State = {
    viewState: ViewState;
    basemap: CartoBasemapsNames | GMapsBasemaps;
    credentials: Credentials;
    googleApiKey: string;
    googleMapId: string;
};
declare type OauthCarto3 = {
    domain: string;
    clientId: string;
    scopes: Array<string>;
    audience: string;
    authorizeEndPoint: string;
};
export declare type InitialCarto3State = {
    oauth?: OauthCarto3;
} & InitialCarto2State;
export declare type InitialCartoState = InitialCarto2State | InitialCarto3State;
export declare type CartoState = {
    viewport: Viewport | undefined;
    geocoderResult: object | null;
    error: null;
    layers: {
        [key: string]: string;
    };
    dataSources: {
        [key: string]: string;
    };
    spatialFilter: Geometry;
    featuresReady: {
        [key: string]: boolean;
    };
    featureSelectionEnabled: boolean;
    featureSelectionMode: string;
} & InitialCartoState;
export declare type InitialOauthState = {
    oauthApp: OauthApp;
};
export declare type OauthState = {
    token: string;
    userInfo: string;
} & InitialOauthState;
export {};
