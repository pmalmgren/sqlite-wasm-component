import { FileId, SqliteDb } from "../wasm/imports/types";

export type WorkerEvent = {
  type: "init";
};

export type WorkerState = { 
  kind: "initializing"; 
} | {
  kind: "initialized"; 
  directoryHandle: FileSystemDirectoryHandle; 
} | {
  kind: "loaded"; 
  directoryHandle: FileSystemDirectoryHandle; 
  db: SqliteDb;
  files: Map<FileId, FileSystemSyncAccessHandle>;
};