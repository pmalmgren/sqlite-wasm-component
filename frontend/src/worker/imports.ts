import type { OpenFlags } from "../wasm/imports/types";
import { setWorkerState, getWorkerState } from "./state";

const log = (out: string) => {
  console.log(out);
};

const vfsOpen = (name: string, fileId: number, flags: OpenFlags): OpenFlags => {
  console.log(`Opening ${name} with id ${fileId}`);
  const workerState = getWorkerState();
  if (workerState.kind === "initializing") {
    throw new Error(`Attempted to open file ${name} on uninitialized worker.`);
  }
  return {
    readwrite: true
  }
}

export { log, vfsOpen }