#!/bin/bash

rm -rf src/wasm/*

pnpm exec jco new ../sqlite-component-core.wasm --wasi-reactor -o sqlite-component.wasm

pnpm exec jco transpile sqlite-component.wasm \
    --no-nodejs-compat \
    --map sqlite3-wasm-vfs:vfs/imports=../imports \
    -o src/wasm
