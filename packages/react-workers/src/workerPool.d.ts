import { Methods } from './workerMethods';
import { ViewportFeaturesBinary } from '@carto/react-core';

export function executeTask(source: string, method: Methods, params: ViewportFeaturesBinary): Promise;

export function removeWorker(source: string): void;
