import { Link } from "react-router-dom";
import { getRecyclers } from "../../db/queries";

export function RecyclersListPage() {
  const recyclers = getRecyclers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recicladores</h1>
        <p className="text-gray-500 mt-1">Todos los recicladores registrados en la asociación</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Nombre</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Estado</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Total Artículos</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Peso Total</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">Meses Activos</th>
              <th className="text-left py-3 px-6 font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {recyclers.map((r) => (
              <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">{r.name}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                    r.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {r.status === "active" ? "activo" : "inactivo"}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-700">{r.totalItems.toLocaleString()}</td>
                <td className="py-4 px-6 text-gray-700">{r.totalWeight} kg</td>
                <td className="py-4 px-6 text-gray-700">{r.activeMonths}</td>
                <td className="py-4 px-6">
                  <Link
                    to={`/recyclers/${r.id}`}
                    className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                  >
                    Ver Perfil →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
