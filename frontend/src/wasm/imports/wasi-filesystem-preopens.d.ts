export namespace WasiFilesystemPreopens {
  export function getDirectories(): [Descriptor, string][];
}
import type { Descriptor } from '../imports/wasi-filesystem-types';
export { Descriptor };
