import { useParams, Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Package, Weight, Calendar } from "lucide-react";
import { getRecyclerById, getLastRouteByRecycler } from "../../db/queries";
import { RouteMap } from "../../components/RouteMap";

export function RecyclerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const recycler = id ? getRecyclerById(id) : undefined;
  const route = id ? getLastRouteByRecycler(id) : undefined;

  if (!recycler) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Reciclador no encontrado</p>
        <Link to="/recyclers" className="text-primary-600 hover:underline mt-2 inline-block">
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/recyclers" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{recycler.name}</h1>
          <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full mt-1 ${
            recycler.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}>
            {recycler.status === "active" ? "activo" : "inactivo"}
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Artículos</p>
            <p className="text-2xl font-bold text-gray-900">{recycler.totalItems.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Weight className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Peso Total</p>
            <p className="text-2xl font-bold text-gray-900">{recycler.totalWeight} kg</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Meses Activos</p>
            <p className="text-2xl font-bold text-gray-900">{recycler.activeMonths}</p>
          </div>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recolecciones Mensuales</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={recycler.monthlyHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="items" fill="#22c55e" radius={[4, 4, 0, 0]} name="Artículos Recolectados" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Route Map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Última Ruta Registrada</h2>
        {route ? (
          <>
            <p className="text-xs text-gray-400 mb-3">Fecha: {route.visitedAt}</p>
            <RouteMap points={route.points} />
          </>
        ) : (
          <p className="text-gray-500 text-sm">Sin ruta disponible</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="space-y-3">
          {recycler.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.items} items — {activity.category}
                  </p>
                  <p className="text-xs text-gray-500">{activity.location}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
