export namespace WasiCliBaseStdin {
  export function getStdin(): InputStream;
}
import type { InputStream } from '../imports/wasi-io-streams';
export { InputStream };
