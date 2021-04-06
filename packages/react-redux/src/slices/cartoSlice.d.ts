import { InitialCartoState } from '../types';

export function createCartoSlice(initialState: InitialCartoState): object;

type AddSource = {
  id: string,
  data: string,
  type: string,
  credentials: object // TODO: add Credentials type
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
