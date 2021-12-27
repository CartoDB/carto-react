import { Credentials } from '@carto/react-api/';
import { SourceProps } from '@carto/react-api/types';
import { CartoBasemapsNames, GMapsBasemapsNames } from '@carto/react-basemaps/';
import { InitialCartoState, Reducer, ViewState } from '../types';

type Source = SourceProps & { id: string } & { filters?: any };

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
  geometry: object;
};

type Filter = FilterBasic & FilterCommonProps;

type FeaturesData = {
  sourceId: string;
  features: [];
};

type FeaturesReadyData = {
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
  ADD_FILTER = 'carto/addFilter',
  REMOVE_FILTER = 'carto/removeFilter',
  CLEAR_FILTERS = 'carto/clearFilters',
  SET_FEATURES_READY = 'carto/setFeaturesReady',
  SET_CREDENTIALS = 'carto/setCredentials',
  SET_FEATURE_SELECTION_GEOMETRY = 'carto/setFeatureSelectionGeometry',
  SET_FEATURE_SELECTION_MODE = 'carto/setFeatureSelectionMode'
}

export function createCartoSlice(initialState: InitialCartoState): Reducer;

export function addSource(source: Source): {
  type: CartoActions.ADD_SOURCE;
  payload: Source;
};

export function removeSource(id: string): {
  type: CartoActions.REMOVE_SOURCE;
  payload: string;
};

export function addLayer(layer: Layer): {
  type: CartoActions.ADD_LAYER;
  payload: Layer;
};

export function updateLayer(layer: Layer): {
  type: CartoActions.UPDATE_LAYER;
  payload: Layer;
};

export function removeLayer(id: string): {
  type: CartoActions.REMOVE_LAYER;
  payload: string;
};

export function setBasemap(id: BasemapName): {
  type: CartoActions.SET_BASEMAP;
  payload: BasemapName;
};

export function addFilter(filter: Filter): {
  type: CartoActions.ADD_FILTER;
  payload: Filter;
};

export function removeFilter(arg: FilterCommonProps): {
  type: CartoActions.REMOVE_FILTER;
  payload: FilterCommonProps;
};

export function clearFilters(id: string): {
  type: CartoActions.CLEAR_FILTERS;
  payload: { id: string };
};

export function selectSourceById(state: any, id: string): Source;

export function selectAreFeaturesReadyForSource(state: any, id: string): boolean;

export function setViewState(viewState: ViewState): Function;

export function setFeaturesReady(data: FeaturesReadyData): {
  type: CartoActions.SET_FEATURES_READY;
  payload: FeaturesReadyData;
};

export function setCredentials(credentials: Credentials): {
  type: CartoActions.SET_CREDENTIALS;
  payload: Credentials;
};

export function setFeatureSelectionMode(mode: string): {
  type: CartoActions.SET_FEATURE_SELECTION_MODE;
  payload: string;
};

export function setFeatureSelectionGeometry(payload?: SpatialFilter): {
  type: CartoActions.SET_FEATURE_SELECTION_GEOMETRY;
  payload: SpatialFilter;
};
