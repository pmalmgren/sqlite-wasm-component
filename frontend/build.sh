#!/bin/bash

rm -rf src/wasm/*
pnpm exec jco transpile ../sqlite-component.wasm \
    --no-nodejs-compat \
    --map wasi:poll/*=@bytecodealliance/preview2-shim/poll#* \
    --map wasi:clocks/monotonic-clock*=@bytecodealliance/preview2-shim/clocks#monotonicClock* \
    --map wasi:clocks/wall-clock*=@bytecodealliance/preview2-shim/clocks#wallClock* \
    --map sqlite3-wasm-vfs:vfs/imports=../imports \
    -o src/wasm

sed -i '' 's/in:/input:/g' ./src/wasm/imports/poll.d.ts