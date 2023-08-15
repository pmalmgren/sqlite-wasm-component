# Usage

## Prerequisites

Install Rust, pnpm, and node.

Install [wasi-sdk-20](https://github.com/WebAssembly/wasi-sdk/releases/tag/wasi-sdk-20) to `~/lib/wasi-sdk-20.0` or wherever you want.

Install [wasm-tools](https://github.com/bytecodealliance/wasm-tools).

## Building

### SQLite

Run the provided build script `build.sh` (credit: [polyrand in rustqlite](https://github.com/rusqlite/rusqlite/issues/827#issuecomment-1042796161)) while specifying the location of `wasi-sdk-20`:

```bash
$ WASI_SDK_PATH=~/lib/wasi-sdk-20.0 ./build.sh
```

You should end up with a WebAssembly component called `sqlite-component.wasm`.

### Frontend

Run `pnpm i` in the frontend directory. Afterwards, run the build script there.

```bash
$ cd frontend
$ pnpm i
$ ./build.sh
```

This will transpile the WebAssembly component and put the output in `src/wasm`. Now you can start the server.

```bash
$ pnpm start
```

After this is done, observe that it works by navigating to http://localhost:3000 and opening the browser console.