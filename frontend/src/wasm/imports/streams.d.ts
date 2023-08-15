export namespace Streams {
  export function read(this: InputStream, len: bigint): [Uint8Array | ArrayBuffer, boolean];
  export function blockingRead(this: InputStream, len: bigint): [Uint8Array | ArrayBuffer, boolean];
  export function subscribeToInputStream(this: InputStream): Pollable;
  export function dropInputStream(this: InputStream): void;
  export function write(this: OutputStream, buf: Uint8Array): bigint;
  export function blockingWrite(this: OutputStream, buf: Uint8Array): bigint;
  export function subscribeToOutputStream(this: OutputStream): Pollable;
  export function dropOutputStream(this: OutputStream): void;
}
export type InputStream = number;
export interface StreamError {
}
import type { Pollable } from '../imports/poll';
export { Pollable };
export type OutputStream = number;
