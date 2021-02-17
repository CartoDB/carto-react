import testWorker from '../workers/testWorker.worker.js';

let workerPool;

const getWorker = (name) => {
  if (!workerPool) {
    debugger;
    workerPool = {
      testWorker: new testWorker()
    };
  }
  return workerPool[name];
};

export { getWorker };
