export namespace WasiIoStreams {
  export function dropInputStream(this: InputStream): void;
  export function write(this: OutputStream, buf: Uint8Array): [bigint, StreamStatus];
  export function blockingWrite(this: OutputStream, buf: Uint8Array): [bigint, StreamStatus];
  export function dropOutputStream(this: OutputStream): void;
}
export type InputStream = number;
export type OutputStream = number;
/**
 * # Variants
 * 
 * ## `"open"`
 * 
 * ## `"ended"`
 */
export type StreamStatus = 'open' | 'ended';
export interface StreamError {
  dummy: number,
}
