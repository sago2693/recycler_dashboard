export interface Category {
  id: string;
  name_es: string;
}

export interface Recycler {
  id: string;
  name: string;
  status: "active" | "inactive";
  totalItems: number;
  totalWeight: number;
  activeMonths: number;
  monthlyHistory: MonthlyData[];
  recentActivity: RecyclerActivity[];
}

export interface MonthlyData {
  month: string;
  items: number;
}

export interface RecyclerActivity {
  id: string;
  date: string;
  items: number;
  category: string;
  location: string;
}

export interface Producer {
  id: string;
  name: string;
  type: "restaurant" | "household";
  address: string;
  status: "active" | "inactive" | "pending";
  monthlyVolume: number;
  materialTypes: string[];
  assignedRecycler: string;
}

export interface MonthlyTrend {
  month: string;
  items: number;
  weight: number;
}

export interface CategoryBreakdown {
  category: string;
  items: number;
  percentage: number;
}

export interface Metrics {
  totalItems: number;
  totalWeight: number;
  activeRecyclers: number;
  monthlyTrends: MonthlyTrend[];
  categoryBreakdown: CategoryBreakdown[];
}

export interface RoutePoint {
  order: number;
  lat: number;
  lng: number;
  label: string;
}

export interface Route {
  id: string;
  recyclerId: string;
  visitedAt: string;
  points: RoutePoint[];
}
