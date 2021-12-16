import { Credentials } from '@carto/react-api/';
import { SourceProps } from '@carto/react-api/types';
import { CartoBasemapsNames, GMapsBasemapsNames } from '@carto/react-basemaps/';
import { InitialCartoState, Reducer, ViewState } from '../types';

type Source = SourceProps & { id: string } & { filters?: any};

type Layer = {
  id: string;
  source?: string;
  layerAttributes?: object;
};

type BasemapName = CartoBasemapsNames & GMapsBasemapsNames;

type FilterBasic = {
  type: '';
  values: string[] | number[];
  owner: string;
};

type FilterCommonProps = {
  id: string;
  column: string;
};

type SpatialFilter = {
  sourceId?: string;
  geometry: object
}

type Filter = FilterBasic & FilterCommonProps;

type ViewportFeaturesData = {
  sourceId: string;
  features: [];
};

type ViewportFeaturesReadyData = {
  sourceId: string;
  ready: boolean;
};

type WidgetLoadingState = {
  widgetId: string;
  isLoading: boolean;
};

declare enum CartoActions {
  ADD_SOURCE = 'carto/addSource',
  REMOVE_SOURCE = 'carto/removeSource',
  ADD_LAYER = 'carto/addLayer',
  UPDATE_LAYER = 'carto/updateLayer',
  REMOVE_LAYER = 'carto/removeLayer',
  SET_BASEMAP = 'carto/setBasemap',
  ADD_SPATIAL_FILTER = 'carto/addSpatialFilter',
  REMOVE_SPATIAL_FILTER = 'carto/removeSpatialFilter',
  ADD_FILTER = 'carto/addFilter',
  REMOVE_FILTER = 'carto/removeFilter',
  CLEAR_FILTERS = 'carto/clearFilters',
  SET_VIEWPORT_FEATURES = 'carto/setViewportFeatures',
  REMOVE_VIEWPORT_FEATURES = 'carto/removeViewportFeatures',
  SET_VIEWPORT_FEATURES_READY = 'carto/setViewportFeaturesReady',
  SET_CREDENTIALS = 'carto/setCredentials'
}

export function createCartoSlice(initialState: InitialCartoState): Reducer;

export function addSource(
  source: Source
): {
  type: CartoActions.ADD_SOURCE;
  payload: Source;
};

export function removeSource(
  id: string
): {
  type: CartoActions.REMOVE_SOURCE;
  payload: string;
};

export function addLayer(
  layer: Layer
): {
  type: CartoActions.ADD_LAYER;
  payload: Layer;
};

export function updateLayer(
  layer: Layer
): {
  type: CartoActions.UPDATE_LAYER;
  payload: Layer;
};

export function removeLayer(
  id: string
): {
  type: CartoActions.REMOVE_LAYER;
  payload: string;
};

export function setBasemap(
  id: BasemapName
): {
  type: CartoActions.SET_BASEMAP;
  payload: BasemapName;
};

export function addSpatialFilter(
  spatialFilter: SpatialFilter
): {
  type: CartoActions.ADD_SPATIAL_FILTER;
  payload: SpatialFilter;
};

export function removeSpatialFilter(
  sourceId?: string
): {
  type: CartoActions.REMOVE_SPATIAL_FILTER;
  payload: string;
};


export function addFilter(
  filter: Filter
): {
  type: CartoActions.ADD_FILTER;
  payload: Filter;
};

export function removeFilter(
  arg: FilterCommonProps
): {
  type: CartoActions.REMOVE_FILTER;
  payload: FilterCommonProps;
};

export function clearFilters(
  id: string
): {
  type: CartoActions.CLEAR_FILTERS;
  payload: { id: string };
};

export function selectSourceById(state: any, id: string): Source;

export function selectIsViewportFeaturesReadyForSource(state: any, id: string): boolean;

export function setViewState(viewState: ViewState): Function;

export function setViewportFeatures(
  data: ViewportFeaturesData
): {
  type: CartoActions.SET_VIEWPORT_FEATURES;
  payload: ViewportFeaturesData;
};

export function removeViewportFeatures(
  sourceId: string
): {
  type: CartoActions.REMOVE_VIEWPORT_FEATURES;
  payload: string;
};

export function setViewportFeaturesReady(
  data: ViewportFeaturesReadyData
): {
  type: CartoActions.SET_VIEWPORT_FEATURES_READY;
  payload: ViewportFeaturesReadyData;
};

export function setCredentials(
  credentials: Credentials
): {
  type: CartoActions.SET_CREDENTIALS;
  payload: Credentials;
};
