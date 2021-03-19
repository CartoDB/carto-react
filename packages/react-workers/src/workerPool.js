import viewportFeaturesWorker from './workers/viewportFeatures.worker';

const pool = {};

export function executeTask(source, method, params) {
  return new Promise((resolve, reject) => {
    const worker = getWorker(source);
    worker.tasks.push({
      method,
      params,
      resolve,
      reject
    });
    if (worker.tasks.length === 1) {
      resolveWorkerTasks(worker);
    }
  });
}

export function removeWorker(source) {
  if (pool[source]) {
    const removeSourceError = new Error();
    removeSourceError.name = 'AbortError';
    pool[source].tasks.forEach((t) => t.reject(removeSourceError));
    pool[source].worker.terminate();
    delete pool[source];
  }
}

function getWorker(source) {
  if (!pool[source]) {
    pool[source] = {
      worker: new viewportFeaturesWorker(),
      tasks: []
    };
    onmessage(pool[source]);
    onerror(pool[source]);
  }
  return pool[source];
}

function onmessage(w) {
  w.worker.onmessage = ({ data: { result } }) => {
    const task = w.tasks.shift();
    task.resolve(result);
    resolveWorkerTasks(w);
  };
}

function onerror(w) {
  w.worker.onerror = (err) => {
    const task = w.tasks.shift();
    resolveWorkerTasks(w);
    task.reject(err);
  };
}

function resolveWorkerTasks(w) {
  if (w.tasks.length > 0) {
    const { method, params } = w.tasks[0];
    w.worker.postMessage({ method, ...params });
  }
}
