export namespace Poll {
  export function dropPollable(this: Pollable): void;
  export function pollOneoff(input: Uint32Array): Uint8Array | ArrayBuffer;
}
export type Pollable = number;
