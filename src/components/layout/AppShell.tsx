import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Calculator, FileText, LayoutDashboard, Settings } from "lucide-react";
import { useT } from "../../hooks/useT";

function NavItems() {
  const t = useT();
  return [
    { to: "/", label: t.nav_dashboard, icon: LayoutDashboard },
    { to: "/workspace", label: t.nav_workspace, icon: Calculator },
    { to: "/pricing", label: t.nav_pricing, icon: BarChart3 },
    { to: "/report", label: t.nav_report, icon: FileText },
    { to: "/settings", label: t.nav_settings, icon: Settings },
  ];
}

export function AppShell({ children }: { children: ReactNode }) {
  const t = useT();
  const navItems = NavItems();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 backdrop-blur md:inset-x-auto md:left-0 md:top-0 md:h-screen md:w-64 md:border-r md:border-t-0">
        <div className="hidden px-6 py-7 md:block">
          <p className="text-lg font-semibold tracking-tight text-white">GyproCore</p>
          <p className="mt-1 text-xs text-slate-400">{t.sidebar_tagline}</p>
        </div>
        <nav className="nav-bottom grid grid-cols-5 gap-1 p-2 md:grid-cols-1 md:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg px-2 py-3 text-xs transition md:flex-row md:px-3 md:text-sm ${
                    isActive ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-[10px] md:text-xs">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <main className="pb-20 md:ml-64 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
