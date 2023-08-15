export namespace Imports {
  export function log(msg: string): void;
  export function vfsOpen(name: string, id: FileId, inFlags: OpenFlags): OpenFlags;
}
import type { FileId } from '../imports/types';
export { FileId };
import type { OpenFlags } from '../imports/types';
export { OpenFlags };
import type { SqliteError } from '../imports/types';
export { SqliteError };
