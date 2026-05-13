import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useProjectStore } from "../stores/projectStore";
import { formatCurrency, formatNumber } from "../utils/format";

export function DashboardPage() {
  const projectCount = useProjectStore((state) => state.projects.length);
  const { project, totals, grandTotal, pricePerSquareMeter, zones } = useProjectCalculations();

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-400">JK Gyproc Art</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl">GyproCore</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Plataforma de estimativa para forro, materiais e orcamentos com calculos em tempo real.
            </p>
          </div>
          <Link
            to="/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            <Calculator size={18} />
            Novo calculo
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projetos" value={projectCount} detail="Local-first MVP" />
        <StatCard label="Area total" value={`${formatNumber(totals.totalArea)} m2`} detail={`${zones.length} zonas`} />
        <StatCard label="Orcamento" value={formatCurrency(grandTotal, project.currency)} detail="Materiais calculados" />
        <StatCard label="Preco / m2" value={formatCurrency(pricePerSquareMeter, project.currency)} detail="Baseado no total" />
      </div>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Projeto ativo</h2>
            <p className="text-sm text-slate-400">{project.projectName}</p>
          </div>
          <Link to="/report" className="text-sm font-medium text-amber-400 hover:text-amber-300">
            Ver resumo
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
      </section>
    </div>
  );
}
