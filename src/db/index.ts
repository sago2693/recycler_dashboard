import initSqlJs, { Database } from "sql.js";
import { schema } from "./schema";
import { seed } from "./seed";

let db: Database | null = null;

export async function initDb(): Promise<void> {
  const SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  db = new SQL.Database();
  db.run(schema);
  seed(db);
}

export function getDb(): Database {
  if (!db) throw new Error("Database not initialized. Call initDb() first.");
  return db;
}
