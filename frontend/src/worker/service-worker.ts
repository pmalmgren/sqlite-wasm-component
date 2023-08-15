import { init, registerVfs, sqliteOpen } from "../wasm/example";
import { setWorkerState } from "./state";
import type { WorkerEvent } from "./types";

const MANAGED_FILE_PREFIX: string = "DBFILE_";
const NUM_FILES: number = 10;

declare var self: DedicatedWorkerGlobalScope;

self.addEventListener('install', async (event: MessageEvent<Event>) => {
  console.info("Installing service worker.");
  const opfsRoot = await navigator.storage.getDirectory();
  const directoryHandle: FileSystemDirectoryHandle = await opfsRoot.getDirectoryHandle("sqlite", { create: true });
  const files: [string, FileSystemFileHandle][] = [];
  // @ts-ignore
  for await (let [name, handle] of directoryHandle) {
    const fileName = name as string;
    const fileHandle = handle as FileSystemFileHandle;
    if (fileName.startsWith(MANAGED_FILE_PREFIX)) {
      files.push([fileName, fileHandle]);
    }
  }
  const nameToAccessHandle: Map<string, FileSystemSyncAccessHandle> = new Map();
  const pathToAccessHandle: Map<string, FileSystemSyncAccessHandle> = new Map();

  await Promise.all(files.map(async ([name, handle]) => {
    const accessHandle = await handle.createSyncAccessHandle();

  }));

  setWorkerState({ kind: "initialized", directoryHandle });
  init();
  registerVfs("opfs");
  sqliteOpen("db.sqlite", "opfs");
});

self.addEventListener('message', (event: MessageEvent<WorkerEvent>) => {

});

export {};