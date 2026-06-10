import { useState } from "react";
import { getProducers } from "../../db/queries";
import type { Producer } from "../../db/types";

type FilterType = "all" | "restaurant" | "household";

const estadoStyles: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  pending: "bg-yellow-100 text-yellow-700",
};
const estadoLabel: Record<string, string> = {
  active: "activo",
  inactive: "inactivo",
  pending: "pendiente",
};

function StatusBadge({ status }: { status: Producer["status"] }) {
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${estadoStyles[status]}`}>
      {estadoLabel[status]}
    </span>
  );
}

function ProducerDetail({ producer, onClose }: { producer: Producer; onClose: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{producer.name}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm">
          ✕ Cerrar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Tipo</p>
          <p className="font-medium text-gray-900 capitalize">{producer.type === "restaurant" ? "restaurante" : "hogar"}</p>
        </div>
        <div>
          <p className="text-gray-500">Estado</p>
          <StatusBadge status={producer.status} />
        </div>
        <div>
          <p className="text-gray-500">Dirección</p>
          <p className="font-medium text-gray-900">{producer.address}</p>
        </div>
        <div>
          <p className="text-gray-500">Volumen Mensual</p>
          <p className="font-medium text-gray-900">{producer.monthlyVolume} kg</p>
        </div>
        <div>
          <p className="text-gray-500">Tipos de Material</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {producer.materialTypes.map((m) => (
              <span key={m} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700">{m}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-500">Reciclador Asignado</p>
          <p className="font-medium text-gray-900">{producer.assignedRecycler}</p>
        </div>
      </div>
    </div>
  );
}

export function ProducersPage() {
  const producers = getProducers();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? producers
    : producers.filter((p) => p.type === filter);

  const selectedProducer = producers.find((p) => p.id === selectedId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Productores</h1>
        <p className="text-gray-500 mt-1">Restaurantes y hogares generadores de residuos</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {([
          ["all", "Todos"],
          ["restaurant", "Restaurantes"],
          ["household", "Hogares"],
        ] as [FilterType, string][]).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === value
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Detail View */}
      {selectedProducer && (
        <ProducerDetail producer={selectedProducer} onClose={() => setSelectedId(null)} />
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Nombre</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Tipo</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Volumen Mensual</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Estado</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">{p.name}</td>
                <td className="py-4 px-6 text-gray-700 capitalize">{p.type === "restaurant" ? "Restaurante" : "Hogar"}</td>
                <td className="py-4 px-6 text-gray-700">{p.monthlyVolume} kg</td>
                <td className="py-4 px-6"><StatusBadge status={p.status} /></td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => setSelectedId(p.id)}
                    className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                  >
                    Detalles →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
