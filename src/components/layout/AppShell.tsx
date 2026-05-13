import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Calculator, FileText, LayoutDashboard, Package, Settings } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workspace", label: "Calculo", icon: Calculator },
  { to: "/materials", label: "Materiais", icon: Package },
  { to: "/pricing", label: "Precos", icon: BarChart3 },
  { to: "/report", label: "PDF", icon: FileText },
  { to: "/settings", label: "Ajustes", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 backdrop-blur md:inset-x-auto md:left-0 md:top-0 md:h-screen md:w-64 md:border-r md:border-t-0">
        <div className="hidden px-6 py-7 md:block">
          <p className="text-lg font-semibold tracking-tight text-white">GyproCore</p>
          <p className="mt-1 text-xs text-slate-400">Calculs precis pour Gyproc.</p>
        </div>
        <nav className="grid grid-cols-6 gap-1 p-2 md:grid-cols-1 md:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] transition md:flex-row md:px-3 md:text-sm ${
                    isActive ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <main className="pb-24 md:ml-64 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
