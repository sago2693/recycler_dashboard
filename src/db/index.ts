import initSqlJs, { Database } from "sql.js";
import sqlWasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import { schema } from "./schema";
import { seed } from "./seed";

let db: Database | null = null;

export async function initDb(): Promise<void> {
  const SQL = await initSqlJs({ locateFile: () => sqlWasmUrl });
  db = new SQL.Database();
  db.run(schema);
  seed(db);
}

export function getDb(): Database {
  if (!db) throw new Error("Database not initialized. Call initDb() first.");
  return db;
}
