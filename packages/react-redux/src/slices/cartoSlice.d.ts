import { Credentials } from '@carto/react-api/';
import { CartoBasemapsNames, GMapsBasemapsNames } from '@carto/react-basemaps/';
import { InitialCartoState, ViewState } from '../types';

export function createCartoSlice(initialState: InitialCartoState): object;

type AddSource = {
  id: string,
  data: string,
  type: string,
  credentials: Credentials
}

export function addSource(arg: AddSource): { type: 'carto/addSource', payload: AddSource };

type RemoveSource = {
  sourceId: string
}

export function removeSource(arg: RemoveSource): { type: 'carto/removeSource', payload: RemoveSource };

type AddLayer = {
  id: string,
  source: string,
  layerAttributes: object
}

export function addLayer(arg: AddLayer): { type: 'carto/addLayer', payload: AddLayer };

type UpdateLayer = {
  id: string,
  layerAttributes: object
}

export function updateLayer(arg: UpdateLayer): { type: 'carto/updateLayer', payload: UpdateLayer };

export function removeLayer(id: string): { type: 'carto/removeLayer', payload: string };

type AllowedBasemaps = CartoBasemapsNames & GMapsBasemapsNames;

export function setBasemap(id: AllowedBasemaps): { type: 'carto/setBasemap', payload: AllowedBasemaps };

type CommonFilterProps = {
  id: string,
  column: string
}

type AddFilter = {
  type: '',
  values: string[] | number[],
  owner: string
}

export function addFilter(arg: CommonFilterProps & AddFilter): { type: 'carto/addFilter', payload: CommonFilterProps & AddFilter };

export function removeFilter(arg: CommonFilterProps): { type: 'carto/removeFilter', payload: CommonFilterProps };

export function clearFilters(id: string): { type: 'carto/clearFilters', payload: { id: string } };

export function selectSourceById(state: any, id: string): string;

export function setViewState(viewState: ViewState): Function;

type ViewportFeaturesDataAction = {
  sourceId: string,
  features: []
}

// TODO: add geojson types
export function setViewportFeatures(data: ViewportFeaturesDataAction): { type: 'carto/setViewportFeatures', payload: ViewportFeaturesDataAction };

export function removeViewportFeatures(sourceId: string): { type: 'carto/removeViewportFeatures', payload: string };

type ViewportFeaturesReadyDataAction = {
  sourceId: string,
  ready: boolean
}

export function setViewportFeaturesReady(data: ViewportFeaturesReadyDataAction): { type: 'carto/setViewportFeaturesReady', payload: ViewportFeaturesReadyDataAction };

type WidgetLoadingState = {
  widgetId: string,
  isLoading: boolean
}

export function setWidgetLoadingState(data: WidgetLoadingState): { type: 'carto/setWidgetLoadingState', payload: WidgetLoadingState };

export function removeWidgetLoadingState(widgetId: string): { type: 'carto/removeWidgetLoadingState', payload: string };

export function setAllWidgetsLoadingState(areLoading: boolean): { type: 'carto/setAllWidgetsLoadingState', payload: boolean };