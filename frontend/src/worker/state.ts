import type { WorkerState } from './types';

let WORKER_STATE: WorkerState = {
  kind: "initializing"
};

const getWorkerState = (): WorkerState => {
  return WORKER_STATE;
}

const setWorkerState = (state: WorkerState) => {
  WORKER_STATE = state;
};

export { getWorkerState, setWorkerState };