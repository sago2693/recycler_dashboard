import { getDb } from "./index";
import type { Recycler, Producer, Metrics, Route } from "./types";
import type SqlJs from "sql.js";

function rows<T>(sql: string, params: (string | number)[] = []): T[] {
  const result = getDb().exec(sql, params);
  if (!result.length) return [];
  const { columns, values } = result[0];
  return values.map((row: SqlJs.SqlValue[]) => {
    const obj: Record<string, SqlJs.SqlValue> = {};
    columns.forEach((col: string, i: number) => { obj[col] = row[i]; });
    return obj as unknown as T;
  });
}

export function getRecyclers(): Recycler[] {
  const recyclerRows = rows<{
    id: string; name: string; status: string;
    total_items: number; total_weight: number; active_months: number;
  }>("SELECT id,name,status,total_items,total_weight,active_months FROM recyclers ORDER BY total_items DESC");

  return recyclerRows.map((r) => {
    const history = rows<{ month: string; items: number }>(
      "SELECT month,items FROM recycler_monthly_history WHERE recycler_id=? ORDER BY id",
      [r.id]
    );
    const activity = rows<{ id: string; date: string; items: number; category_id: string; location: string }>(
      "SELECT c.id,c.date,c.items,c.category_id,c.location FROM recycler_collections c WHERE c.recycler_id=? ORDER BY c.date DESC LIMIT 10",
      [r.id]
    );
    const categoryNames = rows<{ id: string; name_es: string }>("SELECT id,name_es FROM categories");
    const catMap: Record<string, string> = {};
    categoryNames.forEach((c) => { catMap[c.id] = c.name_es; });

    return {
      id: r.id,
      name: r.name,
      status: r.status as "active" | "inactive",
      totalItems: r.total_items,
      totalWeight: r.total_weight,
      activeMonths: r.active_months,
      monthlyHistory: history.map((h) => ({ month: h.month, items: h.items })),
      recentActivity: activity.map((a) => ({
        id: a.id,
        date: a.date,
        items: a.items,
        category: catMap[a.category_id] ?? a.category_id,
        location: a.location,
      })),
    };
  });
}

export function getRecyclerById(id: string): Recycler | undefined {
  return getRecyclers().find((r) => r.id === id);
}

export function getProducers(): Producer[] {
  const producerRows = rows<{
    id: string; name: string; type: string; address: string;
    status: string; monthly_volume: number; assigned_recycler: string;
  }>("SELECT id,name,type,address,status,monthly_volume,assigned_recycler FROM producers ORDER BY name");

  const categoryNames = rows<{ id: string; name_es: string }>("SELECT id,name_es FROM categories");
  const catMap: Record<string, string> = {};
  categoryNames.forEach((c) => { catMap[c.id] = c.name_es; });

  return producerRows.map((p) => {
    const materials = rows<{ category_id: string }>(
      "SELECT category_id FROM producer_materials WHERE producer_id=?",
      [p.id]
    );
    return {
      id: p.id,
      name: p.name,
      type: p.type as "restaurant" | "household",
      address: p.address,
      status: p.status as "active" | "inactive" | "pending",
      monthlyVolume: p.monthly_volume,
      materialTypes: materials.map((m) => catMap[m.category_id] ?? m.category_id),
      assignedRecycler: p.assigned_recycler,
    };
  });
}

export function getMetrics(): Metrics {
  const totals = rows<{ total_items: number; total_weight: number; active_recyclers: number }>(
    `SELECT
       (SELECT SUM(total_items) FROM recyclers) as total_items,
       (SELECT SUM(total_weight) FROM recyclers) as total_weight,
       (SELECT COUNT(*) FROM recyclers WHERE status='active') as active_recyclers`
  )[0];

  const trends = rows<{ month: string; items: number; weight: number }>(
    "SELECT month,items,weight FROM monthly_trends ORDER BY id"
  );

  const categoryRows = rows<{ name_es: string; items: number }>(
    `SELECT cat.name_es, SUM(rc.items) as items
     FROM recycler_collections rc
     JOIN categories cat ON cat.id = rc.category_id
     GROUP BY rc.category_id, cat.name_es
     ORDER BY items DESC`
  );

  const totalCatItems = categoryRows.reduce((s, c) => s + c.items, 0);
  const categoryBreakdown = categoryRows.map((c) => ({
    category: c.name_es,
    items: c.items,
    percentage: Math.round((c.items / totalCatItems) * 100),
  }));

  return {
    totalItems: totals?.total_items ?? 0,
    totalWeight: totals?.total_weight ?? 0,
    activeRecyclers: totals?.active_recyclers ?? 0,
    monthlyTrends: trends,
    categoryBreakdown,
  };
}

export function getLastRouteByRecycler(recyclerId: string): Route | undefined {
  const routeRow = rows<{ id: string; recycler_id: string; visited_at: string }>(
    "SELECT id,recycler_id,visited_at FROM routes WHERE recycler_id=? ORDER BY visited_at DESC LIMIT 1",
    [recyclerId]
  )[0];

  if (!routeRow) return undefined;

  const points = rows<{ point_order: number; lat: number; lng: number; label: string }>(
    "SELECT point_order,lat,lng,label FROM route_points WHERE route_id=? ORDER BY point_order",
    [routeRow.id]
  );

  return {
    id: routeRow.id,
    recyclerId: routeRow.recycler_id,
    visitedAt: routeRow.visited_at,
    points: points.map((p) => ({ order: p.point_order, lat: p.lat, lng: p.lng, label: p.label })),
  };
}
