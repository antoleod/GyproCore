import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { StatCard } from "../components/ui/StatCard";
import { useT } from "../hooks/useT";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useProjectStore } from "../stores/projectStore";
import { formatCurrency, formatNumber } from "../utils/format";

export function DashboardPage() {
  const t = useT();
  const projectCount = useProjectStore((state) => state.projects.length);
  const { project, totals, grandTotal, pricePerSquareMeter, zones } = useProjectCalculations();

  const [showHero, setShowHero] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="space-y-6">
      {/* Hero section */}
      {showHero && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-amber-400">{t.dashboard_hero_brand}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl">{t.dashboard_hero_title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                {t.dashboard_hero_subtitle}
              </p>
            </div>
            <Link
              to="/projects/new"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              <Calculator size={18} />
              {t.dashboard_hero_cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.section>
      )}

      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowHero(!showHero)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.08] transition"
          title={showHero ? t.dashboard_toggle_hideHero : t.dashboard_toggle_showHero}
        >
          {showHero ? <Eye size={14} /> : <EyeOff size={14} />}
          {showHero ? t.dashboard_toggle_hideHero : t.dashboard_toggle_showHero}
        </button>
        <button
          onClick={() => setShowStats(!showStats)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.08] transition"
          title={showStats ? t.dashboard_toggle_hideStats : t.dashboard_toggle_showStats}
        >
          {showStats ? <Eye size={14} /> : <EyeOff size={14} />}
          {showStats ? t.dashboard_toggle_hideStats : t.dashboard_toggle_showStats}
        </button>
        <button
          onClick={() => setShowProjects(!showProjects)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.08] transition"
          title={showProjects ? t.dashboard_toggle_hideProject : t.dashboard_toggle_showProject}
        >
          {showProjects ? <Eye size={14} /> : <EyeOff size={14} />}
          {showProjects ? t.dashboard_toggle_hideProject : t.dashboard_toggle_showProject}
        </button>
      </div>

      {/* Stats cards */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard label={t.dashboard_stats_projects} value={projectCount} detail={t.dashboard_stats_projectsDetail} />
          <StatCard label={t.dashboard_stats_totalArea} value={`${formatNumber(totals.totalArea)} m2`} detail={t.dashboard_stats_totalAreaDetail.replace("{n}", String(zones.length))} />
          <StatCard label={t.dashboard_stats_budget} value={formatCurrency(grandTotal, project.currency)} detail={t.dashboard_stats_budgetDetail} />
          <StatCard label={t.dashboard_stats_priceM2} value={formatCurrency(pricePerSquareMeter, project.currency)} detail={t.dashboard_stats_priceM2Detail} />
        </motion.div>
      )}

      {/* Active project section */}
      {showProjects && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{t.dashboard_activeProject_heading}</h2>
              <p className="text-sm text-slate-400">{project.projectName}</p>
            </div>
            <Link to="/report" className="text-sm font-medium text-amber-400 hover:text-amber-300">
              {t.dashboard_activeProject_link}
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {zones.map((zone) => (
              <div key={zone.zone.id} className="rounded-lg bg-slate-900 p-4">
                <p className="font-medium text-white">{zone.zone.name}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {formatNumber(zone.totalArea)} m2 · {formatNumber(zone.totalF47)} ml F47
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
