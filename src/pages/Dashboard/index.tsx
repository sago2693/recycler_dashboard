import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Package, Weight, Users, TrendingUp } from "lucide-react";
import { getMetrics } from "../../db/queries";
import { getRecyclers } from "../../db/queries";

const COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444"];

function StatCard({ title, value, icon: Icon, subtitle }: {
  title: string; value: string | number; icon: React.ElementType; subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const metrics = getMetrics();
  const topRecyclers = getRecyclers().slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel General</h1>
        <p className="text-gray-500 mt-1">Métricas de recolección de la asociación</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Artículos Recolectados"
          value={metrics.totalItems.toLocaleString()}
          icon={Package}
          subtitle="Histórico"
        />
        <StatCard
          title="Peso Total"
          value={`${metrics.totalWeight.toLocaleString()} kg`}
          icon={Weight}
          subtitle="Histórico"
        />
        <StatCard
          title="Recicladores Activos"
          value={metrics.activeRecyclers}
          icon={Users}
        />
        <StatCard
          title="Este Mes"
          value={metrics.monthlyTrends[11].items.toLocaleString()}
          icon={TrendingUp}
          subtitle="Artículos en mayo 2026"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trends */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tendencia Mensual de Recolección</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="items" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} name="Artículos" />
              <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Peso (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown — no slice labels, only legend + tooltip */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={metrics.categoryBreakdown}
                dataKey="items"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
              >
                {metrics.categoryBreakdown.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, _name, props) =>
                  [`${(value as number).toLocaleString()} artículos (${props.payload.percentage}%)`]
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Recyclers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Recicladores</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Posición</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Nombre</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Total Artículos</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Peso Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Estado</th>
              </tr>
            </thead>
            <tbody>
              {topRecyclers.map((r, i) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">#{i + 1}</td>
                  <td className="py-3 px-4 text-gray-900">{r.name}</td>
                  <td className="py-3 px-4 text-gray-700">{r.totalItems.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700">{r.totalWeight} kg</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      r.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {r.status === "active" ? "activo" : "inactivo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
