import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Building2 } from "lucide-react";
import { cn } from "../lib/utils";
import gaiarecLogo from "../assets/gaiarec_logo.png";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/recyclers", label: "Recicladores", icon: Users },
  { to: "/producers", label: "Productores", icon: Building2 },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-primary-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-primary-700">
        <div className="flex items-center gap-3">
          <img src={gaiarecLogo} alt="Gaiarec" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-bold text-lg leading-tight">Gaiarec</h1>
            <p className="text-xs text-primary-300">Asociación de Recicladores</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-700 text-white"
                  : "text-primary-200 hover:bg-primary-800 hover:text-white"
              )
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-primary-700">
        <p className="text-xs text-primary-400 text-center">Demo Dashboard v1.0</p>
      </div>
    </aside>
  );
}
