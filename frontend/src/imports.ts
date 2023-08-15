import type { OpenFlags } from "./wasm/imports/types";

const log = (out: string) => {
  console.log(out);
};

const vfsOpen = (name: string, fileId: number, flags: OpenFlags): OpenFlags => {
  console.log(`Opening ${name} with id ${fileId}`);
  return {
    readwrite: true
  }
}

export { log, vfsOpen }