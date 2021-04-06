import { Methods } from './workerMethods';
import type { ViewportFeaturesBinary } from '@carto/react-core';

export function executeTask(source: string, method: Methods, params: ViewportFeaturesBinary): Promise;

export function removeWorker(source: string): void;
