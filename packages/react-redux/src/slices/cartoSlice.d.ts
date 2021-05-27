import { Credentials } from '@carto/react-api/';
import { CartoBasemapsNames, GMapsBasemapsNames } from '@carto/react-basemaps/';
import { InitialCartoState, Reducer, ViewState } from '../types';

type AddSource = {
  id: string,
  data: string,
  type: string,
  credentials: Credentials
}

type RemoveSource = {
  sourceId: string
}

type AddLayer = {
  id: string,
  source: string,
  layerAttributes: object
}

type UpdateLayer = {
  id: string,
  layerAttributes: object
}

type AllowedBasemaps = CartoBasemapsNames & GMapsBasemapsNames;

type CommonFilterProps = {
  id: string,
  column: string
}

type AddFilter = {
  type: '',
  values: string[] | number[],
  owner: string
}

type ViewportFeaturesDataAction = {
  sourceId: string,
  features: []
}

type ViewportFeaturesReadyDataAction = {
  sourceId: string,
  ready: boolean
}

type WidgetLoadingState = {
  widgetId: string,
  isLoading: boolean
}

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
  SET_VIEWPORT_FEATURES = 'carto/setViewportFeatures',
  REMOVE_VIEWPORT_FEATURES = 'carto/removeViewportFeatures',
  SET_VIEWPORT_FEATURES_READY = 'carto/setViewportFeaturesReady',
  SET_WIDGET_LOADING_STATE = 'carto/setWidgetLoadingState',
  REMOVE_WIDGET_LOADING_STATE = 'carto/removeWidgetLoadingState',
  SET_ALL_WIDGETS_LOADING_STATE = 'carto/setAllWidgetsLoadingState',
  SET_CREDENTIALS = 'carto/setCredentials'
}

export function createCartoSlice(initialState: InitialCartoState): Reducer;

export function addSource(arg: AddSource): {
  type: CartoActions.ADD_SOURCE,
  payload: AddSource
};

export function removeSource(arg: RemoveSource): {
  type: CartoActions.REMOVE_SOURCE,
  payload: RemoveSource
};

export function addLayer(arg: AddLayer): {
  type: CartoActions.ADD_LAYER,
  payload: AddLayer
};

export function updateLayer(arg: UpdateLayer): {
  type: CartoActions.UPDATE_LAYER,
  payload: UpdateLayer
};

export function removeLayer(id: string): {
  type: CartoActions.REMOVE_LAYER,
  payload: string
};

export function setBasemap(id: AllowedBasemaps): {
  type: CartoActions.SET_BASEMAP,
  payload: AllowedBasemaps
};

export function addFilter(arg: CommonFilterProps & AddFilter): {
  type: CartoActions.ADD_LAYER,
  payload: CommonFilterProps & AddFilter
};

export function removeFilter(arg: CommonFilterProps): {
  type: CartoActions.REMOVE_FILTER,
  payload: CommonFilterProps
};

export function clearFilters(id: string): {
  type: CartoActions.CLEAR_FILTERS,
  payload: { id: string }
};

export function selectSourceById(state: any, id: string): string;

export function setViewState(viewState: ViewState): Function;

export function setViewportFeatures(data: ViewportFeaturesDataAction): {
  type: CartoActions.SET_VIEWPORT_FEATURES,
  payload: ViewportFeaturesDataAction
};

export function removeViewportFeatures(sourceId: string): {
  type: CartoActions.REMOVE_VIEWPORT_FEATURES,
  payload: string
};

export function setViewportFeaturesReady(data: ViewportFeaturesReadyDataAction): {
  type: CartoActions.SET_VIEWPORT_FEATURES_READY,
  payload: ViewportFeaturesReadyDataAction
};

export function setWidgetLoadingState(data: WidgetLoadingState): {
  type: CartoActions.SET_WIDGET_LOADING_STATE,
  payload: WidgetLoadingState
};

export function removeWidgetLoadingState(widgetId: string): {
  type: CartoActions.REMOVE_WIDGET_LOADING_STATE,
  payload: string
};

export function setAllWidgetsLoadingState(areLoading: boolean): {
  type: CartoActions.SET_ALL_WIDGETS_LOADING_STATE,
  payload: boolean
};

export function setCredentials(credentials: Credentials): {
  type: CartoActions.SET_CREDENTIALS,
  payload: Credentials
};