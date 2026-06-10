export const schema = `
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_es TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recyclers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  total_items INTEGER NOT NULL DEFAULT 0,
  total_weight INTEGER NOT NULL DEFAULT 0,
  active_months INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS recycler_monthly_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recycler_id TEXT NOT NULL REFERENCES recyclers(id),
  month TEXT NOT NULL,
  items INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS recycler_collections (
  id TEXT PRIMARY KEY,
  recycler_id TEXT NOT NULL REFERENCES recyclers(id),
  date TEXT NOT NULL,
  items INTEGER NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS producers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  monthly_volume INTEGER NOT NULL DEFAULT 0,
  assigned_recycler TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS producer_materials (
  producer_id TEXT NOT NULL REFERENCES producers(id),
  category_id TEXT NOT NULL REFERENCES categories(id),
  PRIMARY KEY (producer_id, category_id)
);

CREATE TABLE IF NOT EXISTS monthly_trends (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  month TEXT NOT NULL,
  items INTEGER NOT NULL,
  weight INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS routes (
  id TEXT PRIMARY KEY,
  recycler_id TEXT NOT NULL REFERENCES recyclers(id),
  visited_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS route_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  route_id TEXT NOT NULL REFERENCES routes(id),
  point_order INTEGER NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  label TEXT NOT NULL
);
`;
