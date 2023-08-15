export namespace Filesystem {
  export function readViaStream(this: Descriptor, offset: Filesize): InputStream;
  export function writeViaStream(this: Descriptor, offset: Filesize): OutputStream;
  export function appendViaStream(this: Descriptor): OutputStream;
  export function getFlags(this: Descriptor): DescriptorFlags;
  export function getType(this: Descriptor): DescriptorType;
  export function setSize(this: Descriptor, size: Filesize): void;
  export function sync(this: Descriptor): void;
  export function createDirectoryAt(this: Descriptor, path: string): void;
  export function stat(this: Descriptor): DescriptorStat;
  export function statAt(this: Descriptor, pathFlags: PathFlags, path: string): DescriptorStat;
  export function setTimesAt(this: Descriptor, pathFlags: PathFlags, path: string, dataAccessTimestamp: NewTimestamp, dataModificationTimestamp: NewTimestamp): void;
  export function openAt(this: Descriptor, pathFlags: PathFlags, path: string, openFlags: OpenFlags, flags: DescriptorFlags, modes: Modes): Descriptor;
  export function readlinkAt(this: Descriptor, path: string): string;
  export function removeDirectoryAt(this: Descriptor, path: string): void;
  export function unlinkFileAt(this: Descriptor, path: string): void;
  export function dropDescriptor(this: Descriptor): void;
  export function dropDirectoryEntryStream(this: DirectoryEntryStream): void;
}
export type Descriptor = number;
export type Filesize = bigint;
import type { InputStream } from '../imports/streams';
export { InputStream };
/**
 * # Variants
 * 
 * ## `"access"`
 * 
 * ## `"would-block"`
 * 
 * ## `"already"`
 * 
 * ## `"bad-descriptor"`
 * 
 * ## `"busy"`
 * 
 * ## `"deadlock"`
 * 
 * ## `"quota"`
 * 
 * ## `"exist"`
 * 
 * ## `"file-too-large"`
 * 
 * ## `"illegal-byte-sequence"`
 * 
 * ## `"in-progress"`
 * 
 * ## `"interrupted"`
 * 
 * ## `"invalid"`
 * 
 * ## `"io"`
 * 
 * ## `"is-directory"`
 * 
 * ## `"loop"`
 * 
 * ## `"too-many-links"`
 * 
 * ## `"message-size"`
 * 
 * ## `"name-too-long"`
 * 
 * ## `"no-device"`
 * 
 * ## `"no-entry"`
 * 
 * ## `"no-lock"`
 * 
 * ## `"insufficient-memory"`
 * 
 * ## `"insufficient-space"`
 * 
 * ## `"not-directory"`
 * 
 * ## `"not-empty"`
 * 
 * ## `"not-recoverable"`
 * 
 * ## `"unsupported"`
 * 
 * ## `"no-tty"`
 * 
 * ## `"no-such-device"`
 * 
 * ## `"overflow"`
 * 
 * ## `"not-permitted"`
 * 
 * ## `"pipe"`
 * 
 * ## `"read-only"`
 * 
 * ## `"invalid-seek"`
 * 
 * ## `"text-file-busy"`
 * 
 * ## `"cross-device"`
 */
export type ErrorCode = 'access' | 'would-block' | 'already' | 'bad-descriptor' | 'busy' | 'deadlock' | 'quota' | 'exist' | 'file-too-large' | 'illegal-byte-sequence' | 'in-progress' | 'interrupted' | 'invalid' | 'io' | 'is-directory' | 'loop' | 'too-many-links' | 'message-size' | 'name-too-long' | 'no-device' | 'no-entry' | 'no-lock' | 'insufficient-memory' | 'insufficient-space' | 'not-directory' | 'not-empty' | 'not-recoverable' | 'unsupported' | 'no-tty' | 'no-such-device' | 'overflow' | 'not-permitted' | 'pipe' | 'read-only' | 'invalid-seek' | 'text-file-busy' | 'cross-device';
import type { OutputStream } from '../imports/streams';
export { OutputStream };
export interface DescriptorFlags {
  read?: boolean,
  write?: boolean,
  fileIntegritySync?: boolean,
  dataIntegritySync?: boolean,
  requestedWriteSync?: boolean,
  mutateDirectory?: boolean,
}
/**
 * # Variants
 * 
 * ## `"unknown"`
 * 
 * ## `"block-device"`
 * 
 * ## `"character-device"`
 * 
 * ## `"directory"`
 * 
 * ## `"fifo"`
 * 
 * ## `"symbolic-link"`
 * 
 * ## `"regular-file"`
 * 
 * ## `"socket"`
 */
export type DescriptorType = 'unknown' | 'block-device' | 'character-device' | 'directory' | 'fifo' | 'symbolic-link' | 'regular-file' | 'socket';
export type Device = bigint;
export type Inode = bigint;
export type LinkCount = bigint;
import type { Datetime } from '../imports/wall-clock';
export { Datetime };
export interface DescriptorStat {
  device: Device,
  inode: Inode,
  type: DescriptorType,
  linkCount: LinkCount,
  size: Filesize,
  dataAccessTimestamp: Datetime,
  dataModificationTimestamp: Datetime,
  statusChangeTimestamp: Datetime,
}
export interface PathFlags {
  symlinkFollow?: boolean,
}
export type NewTimestamp = NewTimestampNoChange | NewTimestampNow | NewTimestampTimestamp;
export interface NewTimestampNoChange {
  tag: 'no-change',
}
export interface NewTimestampNow {
  tag: 'now',
}
export interface NewTimestampTimestamp {
  tag: 'timestamp',
  val: Datetime,
}
export interface OpenFlags {
  create?: boolean,
  directory?: boolean,
  exclusive?: boolean,
  truncate?: boolean,
}
export interface Modes {
  readable?: boolean,
  writable?: boolean,
  executable?: boolean,
}
export type DirectoryEntryStream = number;
