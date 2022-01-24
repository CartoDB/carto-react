import { Methods } from './workerMethods';
import { TileFeatures } from '@carto/react-core';

export function executeTask(source: string, method: Methods, params?: TileFeatures): Promise<any>;

export function removeWorker(source: string): void;
