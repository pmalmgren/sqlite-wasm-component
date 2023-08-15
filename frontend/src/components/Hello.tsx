import { useEffect, useState } from "react";
import { init, registerVfs, sqliteOpen } from "../wasm/sqlite-component";

const DB = "path.db";

export default function Hello() {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (initialized) {
      return;
    }
    init();
    registerVfs("test");
    setInitialized(true);
  }, [setInitialized, initialized]);
  useEffect(() => {
    if (initialized) {
      sqliteOpen("path.db", "test");
    }
  }, [initialized]);

  return (<h1>Hello SQLite!</h1>);
}