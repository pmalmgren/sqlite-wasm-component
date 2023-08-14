import { getEnvironment } from 'wasi:cli-base/environment';
import { exit } from 'wasi:cli-base/exit';
import { getStderr } from 'wasi:cli-base/stderr';
import { getStdin } from 'wasi:cli-base/stdin';
import { getStdout } from 'wasi:cli-base/stdout';
import { getDirectories } from 'wasi:filesystem/preopens';
import { appendViaStream, dropDescriptor, getType, writeViaStream } from 'wasi:filesystem/types';
import { blockingWrite, dropInputStream, dropOutputStream, write } from 'wasi:io/streams';

const base64Compile = str => WebAssembly.compile(Uint8Array.from(atob(str), b => b.charCodeAt(0)));

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const fetchCompile = url => fetch(url).then(WebAssembly.compileStreaming);

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const toUint64 = val => BigInt.asUintN(64, val);

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal)
  ptr = realloc(ptr, allocLen, 1, writtenTotal);
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;

function trampoline0(arg0) {
  dropDescriptor(arg0 >>> 0);
}

function trampoline1() {
  const ret = getStdin();
  return toUint32(ret);
}

function trampoline2() {
  const ret = getStdout();
  return toUint32(ret);
}

function trampoline3() {
  const ret = getStderr();
  return toUint32(ret);
}

function trampoline4(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

function trampoline5(arg0) {
  dropInputStream(arg0 >>> 0);
}

function trampoline6(arg0) {
  dropOutputStream(arg0 >>> 0);
}
let exports2;

function trampoline7(arg0) {
  const ret = getDirectories();
  const vec2 = ret;
  const len2 = vec2.length;
  const result2 = realloc0(0, 0, 4, len2 * 12);
  for (let i = 0; i < vec2.length; i++) {
    const e = vec2[i];
    const base = result2 + i * 12;const [tuple0_0, tuple0_1] = e;
    dataView(memory0).setInt32(base + 0, toUint32(tuple0_0), true);
    const ptr1 = utf8Encode(tuple0_1, realloc0, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len1, true);
    dataView(memory0).setInt32(base + 4, ptr1, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len2, true);
  dataView(memory0).setInt32(arg0 + 0, result2, true);
}
let memory0;
let realloc0;

function trampoline8(arg0, arg1, arg2) {
  let ret;
  try {
    ret = { tag: 'ok', val: writeViaStream(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      dataView(memory0).setInt32(arg2 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'would-block': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlock': {
          enum0 = 5;
          break;
        }
        case 'quota': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'file-too-large': {
          enum0 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum0 = 9;
          break;
        }
        case 'in-progress': {
          enum0 = 10;
          break;
        }
        case 'interrupted': {
          enum0 = 11;
          break;
        }
        case 'invalid': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'is-directory': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'too-many-links': {
          enum0 = 16;
          break;
        }
        case 'message-size': {
          enum0 = 17;
          break;
        }
        case 'name-too-long': {
          enum0 = 18;
          break;
        }
        case 'no-device': {
          enum0 = 19;
          break;
        }
        case 'no-entry': {
          enum0 = 20;
          break;
        }
        case 'no-lock': {
          enum0 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum0 = 22;
          break;
        }
        case 'insufficient-space': {
          enum0 = 23;
          break;
        }
        case 'not-directory': {
          enum0 = 24;
          break;
        }
        case 'not-empty': {
          enum0 = 25;
          break;
        }
        case 'not-recoverable': {
          enum0 = 26;
          break;
        }
        case 'unsupported': {
          enum0 = 27;
          break;
        }
        case 'no-tty': {
          enum0 = 28;
          break;
        }
        case 'no-such-device': {
          enum0 = 29;
          break;
        }
        case 'overflow': {
          enum0 = 30;
          break;
        }
        case 'not-permitted': {
          enum0 = 31;
          break;
        }
        case 'pipe': {
          enum0 = 32;
          break;
        }
        case 'read-only': {
          enum0 = 33;
          break;
        }
        case 'invalid-seek': {
          enum0 = 34;
          break;
        }
        case 'text-file-busy': {
          enum0 = 35;
          break;
        }
        case 'cross-device': {
          enum0 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline9(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: appendViaStream(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt32(arg1 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'would-block': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlock': {
          enum0 = 5;
          break;
        }
        case 'quota': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'file-too-large': {
          enum0 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum0 = 9;
          break;
        }
        case 'in-progress': {
          enum0 = 10;
          break;
        }
        case 'interrupted': {
          enum0 = 11;
          break;
        }
        case 'invalid': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'is-directory': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'too-many-links': {
          enum0 = 16;
          break;
        }
        case 'message-size': {
          enum0 = 17;
          break;
        }
        case 'name-too-long': {
          enum0 = 18;
          break;
        }
        case 'no-device': {
          enum0 = 19;
          break;
        }
        case 'no-entry': {
          enum0 = 20;
          break;
        }
        case 'no-lock': {
          enum0 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum0 = 22;
          break;
        }
        case 'insufficient-space': {
          enum0 = 23;
          break;
        }
        case 'not-directory': {
          enum0 = 24;
          break;
        }
        case 'not-empty': {
          enum0 = 25;
          break;
        }
        case 'not-recoverable': {
          enum0 = 26;
          break;
        }
        case 'unsupported': {
          enum0 = 27;
          break;
        }
        case 'no-tty': {
          enum0 = 28;
          break;
        }
        case 'no-such-device': {
          enum0 = 29;
          break;
        }
        case 'overflow': {
          enum0 = 30;
          break;
        }
        case 'not-permitted': {
          enum0 = 31;
          break;
        }
        case 'pipe': {
          enum0 = 32;
          break;
        }
        case 'read-only': {
          enum0 = 33;
          break;
        }
        case 'invalid-seek': {
          enum0 = 34;
          break;
        }
        case 'text-file-busy': {
          enum0 = 35;
          break;
        }
        case 'cross-device': {
          enum0 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline10(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: getType(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'unknown': {
          enum0 = 0;
          break;
        }
        case 'block-device': {
          enum0 = 1;
          break;
        }
        case 'character-device': {
          enum0 = 2;
          break;
        }
        case 'directory': {
          enum0 = 3;
          break;
        }
        case 'fifo': {
          enum0 = 4;
          break;
        }
        case 'symbolic-link': {
          enum0 = 5;
          break;
        }
        case 'regular-file': {
          enum0 = 6;
          break;
        }
        case 'socket': {
          enum0 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum0, true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val1 = e;
      let enum1;
      switch (val1) {
        case 'access': {
          enum1 = 0;
          break;
        }
        case 'would-block': {
          enum1 = 1;
          break;
        }
        case 'already': {
          enum1 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum1 = 3;
          break;
        }
        case 'busy': {
          enum1 = 4;
          break;
        }
        case 'deadlock': {
          enum1 = 5;
          break;
        }
        case 'quota': {
          enum1 = 6;
          break;
        }
        case 'exist': {
          enum1 = 7;
          break;
        }
        case 'file-too-large': {
          enum1 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum1 = 9;
          break;
        }
        case 'in-progress': {
          enum1 = 10;
          break;
        }
        case 'interrupted': {
          enum1 = 11;
          break;
        }
        case 'invalid': {
          enum1 = 12;
          break;
        }
        case 'io': {
          enum1 = 13;
          break;
        }
        case 'is-directory': {
          enum1 = 14;
          break;
        }
        case 'loop': {
          enum1 = 15;
          break;
        }
        case 'too-many-links': {
          enum1 = 16;
          break;
        }
        case 'message-size': {
          enum1 = 17;
          break;
        }
        case 'name-too-long': {
          enum1 = 18;
          break;
        }
        case 'no-device': {
          enum1 = 19;
          break;
        }
        case 'no-entry': {
          enum1 = 20;
          break;
        }
        case 'no-lock': {
          enum1 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum1 = 22;
          break;
        }
        case 'insufficient-space': {
          enum1 = 23;
          break;
        }
        case 'not-directory': {
          enum1 = 24;
          break;
        }
        case 'not-empty': {
          enum1 = 25;
          break;
        }
        case 'not-recoverable': {
          enum1 = 26;
          break;
        }
        case 'unsupported': {
          enum1 = 27;
          break;
        }
        case 'no-tty': {
          enum1 = 28;
          break;
        }
        case 'no-such-device': {
          enum1 = 29;
          break;
        }
        case 'overflow': {
          enum1 = 30;
          break;
        }
        case 'not-permitted': {
          enum1 = 31;
          break;
        }
        case 'pipe': {
          enum1 = 32;
          break;
        }
        case 'read-only': {
          enum1 = 33;
          break;
        }
        case 'invalid-seek': {
          enum1 = 34;
          break;
        }
        case 'text-file-busy': {
          enum1 = 35;
          break;
        }
        case 'cross-device': {
          enum1 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val1}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline11(arg0) {
  const ret = getEnvironment();
  const vec3 = ret;
  const len3 = vec3.length;
  const result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;const [tuple0_0, tuple0_1] = e;
    const ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    const ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline12(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: write(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      const [tuple1_0, tuple1_1] = e;
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(tuple1_0), true);
      const val2 = tuple1_1;
      let enum2;
      switch (val2) {
        case 'open': {
          enum2 = 0;
          break;
        }
        case 'ended': {
          enum2 = 1;
          break;
        }
        default: {
          if ((tuple1_1) instanceof Error) {
            console.error(tuple1_1);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of stream-status`);
        }
      }
      dataView(memory0).setInt8(arg3 + 16, enum2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      const {dummy: v3_0 } = e;
      dataView(memory0).setInt32(arg3 + 8, toUint32(v3_0), true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline13(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: blockingWrite(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      const [tuple1_0, tuple1_1] = e;
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(tuple1_0), true);
      const val2 = tuple1_1;
      let enum2;
      switch (val2) {
        case 'open': {
          enum2 = 0;
          break;
        }
        case 'ended': {
          enum2 = 1;
          break;
        }
        default: {
          if ((tuple1_1) instanceof Error) {
            console.error(tuple1_1);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of stream-status`);
        }
      }
      dataView(memory0).setInt8(arg3 + 16, enum2, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      const {dummy: v3_0 } = e;
      dataView(memory0).setInt32(arg3 + 8, toUint32(v3_0), true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
let exports3;
let postReturn0;

function getPerson() {
  const ret = exports1['get-person']();
  const ptr0 = dataView(memory0).getInt32(ret + 0, true);
  const len0 = dataView(memory0).getInt32(ret + 4, true);
  const result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  postReturn0(ret);
  return {
    name: result0,
  };
}

const $init = (async() => {
  const module0 = fetchCompile(new URL('./example.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./example.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAwwLAAECAgADAwQFBQYEBQFwAQsLBzkMATAAAAExAAEBMgACATMAAwE0AAQBNQAFATYABgE3AAcBOAAIATkACQIxMAAKCCRpbXBvcnRzAQAKjQELCQAgAEEAEQAACw0AIAAgASACQQERAQALCwAgACABQQIRAgALCwAgACABQQMRAgALCQAgAEEEEQAACw8AIAAgASACIANBBREDAAsPACAAIAEgAiADQQYRAwALDwAgACABIAIgA0EHEQQACwsAIAAgAUEIEQUACwsAIAAgAUEJEQUACwkAIABBChEGAAsALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjExLjAAgwQEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQHmAwsAMWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS9wcmVvcGVucy1nZXQtZGlyZWN0b3JpZXMBL2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy13cml0ZS12aWEtc3RyZWFtAjBpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXMtYXBwZW5kLXZpYS1zdHJlYW0DJ2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1nZXQtdHlwZQQyaW5kaXJlY3Qtd2FzaTpjbGktYmFzZS9lbnZpcm9ubWVudC1nZXQtZW52aXJvbm1lbnQFHmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtcy13cml0ZQYnaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zLWJsb2NraW5nLXdyaXRlByVhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3dyaXRlCChhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fZ2V0CS5hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fc2l6ZXNfZ2V0CiZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXByb2NfZXhpdA');
  const module3 = base64Compile('AGFzbQEAAAABKQdgAX8AYAN/fn8AYAJ/fwBgBH9/f38AYAR/f39/AX9gAn9/AX9gAX8AAkgMAAEwAAAAATEAAQABMgACAAEzAAIAATQAAAABNQADAAE2AAMAATcABAABOAAFAAE5AAUAAjEwAAYACCRpbXBvcnRzAXABCwsJEQEAQQALCwABAgMEBQYHCAkKAC4JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQGMC4xMS4wABwEbmFtZQAVFHdpdC1jb21wb25lbnQ6Zml4dXBz');
  const instanceFlags0 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    wasi_snapshot_preview1: {
      environ_get: exports0['8'],
      environ_sizes_get: exports0['9'],
      fd_write: exports0['7'],
      proc_exit: exports0['10'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli-base/environment': {
      'get-environment': exports0['4'],
    },
    'wasi:cli-base/exit': {
      exit: trampoline4,
    },
    'wasi:cli-base/stderr': {
      'get-stderr': trampoline3,
    },
    'wasi:cli-base/stdin': {
      'get-stdin': trampoline1,
    },
    'wasi:cli-base/stdout': {
      'get-stdout': trampoline2,
    },
    'wasi:filesystem/preopens': {
      'get-directories': exports0['0'],
    },
    'wasi:filesystem/types': {
      'append-via-stream': exports0['2'],
      'drop-descriptor': trampoline0,
      'get-type': exports0['3'],
      'write-via-stream': exports0['1'],
    },
    'wasi:io/streams': {
      'blocking-write': exports0['6'],
      'drop-input-stream': trampoline5,
      'drop-output-stream': trampoline6,
      write: exports0['5'],
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline7,
      '1': trampoline8,
      '10': exports2.proc_exit,
      '2': trampoline9,
      '3': trampoline10,
      '4': trampoline11,
      '5': trampoline12,
      '6': trampoline13,
      '7': exports2.fd_write,
      '8': exports2.environ_get,
      '9': exports2.environ_sizes_get,
    },
  }));
  postReturn0 = exports1['cabi_post_get-person'];
})();

await $init;

export { getPerson }