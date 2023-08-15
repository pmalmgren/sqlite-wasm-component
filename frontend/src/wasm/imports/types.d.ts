export namespace Types {
}
export type FileId = number;
export interface OpenFlags {
  readonly?: boolean,
  readwrite?: boolean,
  create?: boolean,
  deleteonclose?: boolean,
  exclusive?: boolean,
  autoproxy?: boolean,
  uri?: boolean,
  memory?: boolean,
  mainDb?: boolean,
  tempDb?: boolean,
  transientDb?: boolean,
  mainJournal?: boolean,
  tempJournal?: boolean,
  subjournal?: boolean,
  superJournal?: boolean,
  nomutex?: boolean,
  fullmutex?: boolean,
  privatecache?: boolean,
  wal?: boolean,
  nofollow?: boolean,
  exrescode?: boolean,
}
export type SqliteError = number;
export type SqliteDb = number;
