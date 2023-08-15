use std::{
    ffi::{c_void, CStr, CString},
    mem::size_of,
};

// src/lib.rs
use rusqlite::{
    bypass_sqlite_initialization,
    ffi::{
        sqlite3, sqlite3_file, sqlite3_initialize, sqlite3_int64, sqlite3_io_methods,
        sqlite3_malloc, sqlite3_open_v2, sqlite3_snprintf, sqlite3_vfs, sqlite3_vfs_find,
        sqlite3_vfs_register, SQLITE_ERROR, SQLITE_OK,
    },
    OpenFlags,
};
use sqlite3_wasm_vfs::vfs::{imports::vfs_open, types::OpenFlags as VfsOpenFlags};

// Use a procedural macro to generate bindings for the world we specified in
// `host.wit`
wit_bindgen::generate!("vfs");

use crate::sqlite3_wasm_vfs::vfs::imports::log;

// Define a custom type and implement the generated `Host` trait for it which
// represents implementing all the necessary exported interfaces for this
// component.
struct MyVfs;

impl Default for VfsOpenFlags {
    fn default() -> Self {
        Self::empty()
    }
}

const INST_MAX_PATHNAME: i32 = 512;

#[no_mangle]
extern "C" fn x_full_pathname(
    _vfs: *mut sqlite3_vfs,
    src: *const i8,
    n_out: i32,
    dest: *mut i8,
) -> i32 {
    if n_out < 0 {
        return SQLITE_ERROR;
    }
    let fmt_str = match CString::new("%s") {
        Ok(s) => s,
        Err(_) => {
            return SQLITE_ERROR;
        }
    };
    unsafe {
        sqlite3_snprintf(n_out, dest, fmt_str.as_ptr(), src);
    }
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_open(
    _vfs: *mut sqlite3_vfs,
    name: *const i8,
    file: *mut sqlite3_file,
    flags: i32,
    out_flags: *mut i32,
) -> i32 {
    let name = unsafe {
        match CStr::from_ptr(name).to_str() {
            Ok(s) => s,
            Err(err) => {
                log(format!("Error reading name: {err}").as_str());
                return SQLITE_ERROR;
            }
        }
    };
    let file_id = file as i32;
    let flags = flags.try_into().unwrap_or(0);
    let in_flags = VfsOpenFlags::from_bits(flags).unwrap_or_default();
    let ret_flags = match vfs_open(name, file_id, in_flags) {
        Ok(f) => f,
        Err(err) => {
            log(format!("vfs_open error: {err}").as_str());
            return SQLITE_ERROR;
        }
    };
    unsafe {
        (*out_flags) = ret_flags.bits() as i32;
    };
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_delete(_vfs: *mut sqlite3_vfs, name: *const i8, _sync_dir: i32) -> i32 {
    unsafe {
        let name = CStr::from_ptr(name).to_str().unwrap_or("");
        log(format!("x_delete: {name}").as_str());
    }
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_access(
    _vfs: *mut sqlite3_vfs,
    name: *const i8,
    _flags: i32,
    _out: *mut i32,
) -> i32 {
    unsafe {
        let name = CStr::from_ptr(name).to_str().unwrap_or("");
        log(format!("x_access: {name}").as_str());
    }
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_close(_file: *mut sqlite3_file) -> i32 {
    log("x_close");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_read(
    _file: *mut sqlite3_file,
    _buf: *mut c_void,
    _i_amt: i32,
    _offset: sqlite3_int64,
) -> i32 {
    log("x_read");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_write(
    _file: *mut sqlite3_file,
    _buf: *const c_void,
    _i_amt: i32,
    _offset: sqlite3_int64,
) -> i32 {
    log("x_write");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_truncate(_file: *mut sqlite3_file, _size: sqlite3_int64) -> i32 {
    log("x_write");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_sync(_file: *mut sqlite3_file, _flags: i32) -> i32 {
    log("x_sync");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_file_size(_file: *mut sqlite3_file, _size: *mut sqlite3_int64) -> i32 {
    log("x_sync");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_lock(_file: *mut sqlite3_file, _flags: i32) -> i32 {
    log("x_lock");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_unlock(_file: *mut sqlite3_file, _flags: i32) -> i32 {
    log("x_unlock");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_check_reserved_lock(_file: *mut sqlite3_file, _flags: *mut i32) -> i32 {
    log("x_check_reserved_lock");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_file_control(_file: *mut sqlite3_file, _flags: i32, _out: *mut c_void) -> i32 {
    log("x_file_control");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_sector_size(_file: *mut sqlite3_file) -> i32 {
    log("x_file_control");
    return SQLITE_OK;
}

#[no_mangle]
extern "C" fn x_device_characteristics(_file: *mut sqlite3_file) -> i32 {
    log("x_device_characteristics");
    return SQLITE_OK;
}

impl Vfs for MyVfs {
    fn sqlite_open(path: String, vfs: String) -> Result<i32, i32> {
        let filename = match CString::new(path.as_str()) {
            Ok(fname) => fname,
            Err(err) => {
                log(format!("Error getting path: {err}").as_str());
                return Err(SQLITE_ERROR);
            }
        };
        let vfs_name = match CString::new(vfs) {
            Ok(vname) => vname,
            Err(err) => {
                log(format!("Error getting path: {err}").as_str());
                return Err(SQLITE_ERROR);
            }
        };
        unsafe {
            let mut db_ptr: *mut sqlite3 = std::ptr::null_mut();
            let flags = OpenFlags::default().bits();
            let res = sqlite3_open_v2(filename.as_ptr(), &mut db_ptr, flags, vfs_name.as_ptr());
            if res != SQLITE_OK {
                log(format!("Error opening database: {res}").as_str());
                return Err(res);
            }
            log("Successfully opened connection.");
            Ok(db_ptr as i32)
        }
    }

    fn debug_vfs(raw_vfs_ptr: i32) {
        unsafe {
            let vfs = raw_vfs_ptr as *const sqlite3_vfs;
            let name_ptr = (*vfs).zName;
            let name = CStr::from_ptr(name_ptr).to_str();
            let found_vfs = sqlite3_vfs_find(CStr::from_ptr(name_ptr).as_ptr()).to_owned();
            log(format!("vfs name: {:?}", name).as_str());
            log(format!("found vfs: {:?}", found_vfs).as_str());
            let found_vfs_name = CStr::from_ptr((*found_vfs).zName).to_str();
            log(format!("found vfs name: {:?}", found_vfs_name).as_str());
        }
    }

    fn register_vfs(name: String) {
        log(format!("registering VFS: {name}").as_str());
        let name = match CString::new(name.as_str()) {
            Ok(cstr) => cstr,
            Err(err) => {
                log(format!("Error parsing {name}: {err}").as_str());
                return;
            }
        };
        log(format!("registering VFS: {:?}", &name.to_str()).as_str());
        let name_ptr = unsafe {
            let len = name.as_c_str().to_bytes_with_nul().len() as i32;
            let raw_ptr = sqlite3_malloc(len) as *mut i8;
            sqlite3_snprintf(len, raw_ptr, name.as_ptr());
            raw_ptr as *const i8
        };

        let default_vfs = unsafe { sqlite3_vfs_find(std::ptr::null()).to_owned() };

        let _io_methods = sqlite3_io_methods {
            iVersion: 1,
            xClose: Some(x_close),
            xRead: Some(x_read),
            xWrite: Some(x_write),
            xTruncate: Some(x_truncate),
            xSync: Some(x_sync),
            xFileSize: Some(x_file_size),
            xLock: Some(x_lock),
            xUnlock: Some(x_unlock),
            xCheckReservedLock: Some(x_check_reserved_lock),
            xFileControl: Some(x_file_control),
            xSectorSize: Some(x_sector_size),
            xDeviceCharacteristics: Some(x_device_characteristics),
            xShmMap: None,
            xShmLock: None,
            xShmBarrier: None,
            xShmUnmap: None,
            xFetch: None,
            xUnfetch: None,
        };
        unsafe {
            let raw_vfs_ptr = sqlite3_malloc(std::mem::size_of::<sqlite3_vfs>() as i32);
            let vfs = raw_vfs_ptr as *mut sqlite3_vfs;
            (*vfs) = sqlite3_vfs {
                iVersion: 1,
                szOsFile: size_of::<sqlite3_file>() as i32,
                mxPathname: INST_MAX_PATHNAME,
                pNext: std::ptr::null_mut(),
                zName: name_ptr,
                pAppData: std::ptr::null_mut(),
                xOpen: Some(x_open),
                xDelete: Some(x_delete),
                xAccess: Some(x_access),
                xFullPathname: Some(x_full_pathname),
                // pass through to default
                xCurrentTimeInt64: None,
                xCurrentTime: None,
                xDlOpen: None,
                xDlError: None,
                xDlSym: None,
                xDlClose: None,
                xRandomness: None,
                xSleep: None,
                xGetLastError: None,
                xSetSystemCall: None,
                xGetSystemCall: None,
                xNextSystemCall: None,
            };
            (*vfs).xCurrentTimeInt64 = (*default_vfs).xCurrentTimeInt64;
            (*vfs).xCurrentTime = (*default_vfs).xCurrentTime;
            (*vfs).xDlOpen = (*default_vfs).xDlOpen;
            (*vfs).xDlError = (*default_vfs).xDlError;
            (*vfs).xDlSym = (*default_vfs).xDlSym;
            (*vfs).xDlClose = (*default_vfs).xDlClose;
            (*vfs).xRandomness = (*default_vfs).xRandomness;
            (*vfs).xSleep = (*default_vfs).xSleep;
            (*vfs).xGetLastError = (*default_vfs).xGetLastError;
            (*vfs).xSetSystemCall = (*default_vfs).xSetSystemCall;
            (*vfs).xGetSystemCall = (*default_vfs).xGetSystemCall;
            (*vfs).xNextSystemCall = (*default_vfs).xNextSystemCall;
            let res = sqlite3_vfs_register(vfs, 0);
            if res != SQLITE_OK {
                log("Error registering custom VFS.");
            } else {
                log("Successfully registered custom VFS.");
            }
        }
    }

    fn init() {
        unsafe {
            assert_eq!(
                sqlite3_initialize(),
                SQLITE_OK,
                "Could not initialize SQLite"
            );
            bypass_sqlite_initialization();
        }
    }
}

// The following macro is generated by wit-bindgen and is always named `export_{world_name}`
export_vfs!(MyVfs);
