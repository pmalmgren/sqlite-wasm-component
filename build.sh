#!/usr/bin/env bash

# set WASI_SDK_PATH to the correct location in your system

export WASI_SYSROOT="${WASI_SDK_PATH}/share/wasi-sysroot"
export CC="${WASI_SDK_PATH}/bin/clang --sysroot=${WASI_SYSROOT}"
export AR="${WASI_SDK_PATH}/bin/llvm-ar"
export CC_wasm32_wasi="${CC}"
export CARGO_TARGET_WASM32_WASI_LINKER="${WASI_SDK_PATH}/bin/wasm-ld"

export LIBSQLITE3_FLAGS="\
    -DSQLITE_TEMP_STORE=2 \
    -DSQLITE_THREADSAFE=0 \
    -DSQLITE_OMIT_LOCALTIME \
    -DSQLITE_OMIT_LOAD_EXTENSION \
    -DLONGDOUBLE_TYPE=double"

cargo build --target "wasm32-wasi"

cp ./target/wasm32-wasi/debug/sqlite_component.wasm sqlite-component-core.wasm