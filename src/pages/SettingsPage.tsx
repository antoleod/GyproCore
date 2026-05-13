import { useState } from "react";
import { useProjectStore } from "../stores/projectStore";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { exportProjectToExcel } from "../services/excelExporter";

export function SettingsPage() {
  const exportSnapshot = useProjectStore((state) => state.exportSnapshot);
  const importSnapshot = useProjectStore((state) => state.importSnapshot);
  const globalCurrency = useProjectStore((state) => state.globalCurrency);
  const setGlobalCurrency = useProjectStore((state) => state.setGlobalCurrency);
  const { project, zones, totals, pricedMaterials, grandTotal, pricePerSquareMeter } = useProjectCalculations();
  const [payload, setPayload] = useState("");

  const handleExportExcel = () => {
    exportProjectToExcel({
      project,
      zones,
      totals,
      pricedMaterials,
      grandTotal,
      pricePerSquareMeter,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Ajustes</h1>
        <p className="mt-1 text-sm text-slate-400">Configure sua moeda, faça backup e restaure dados.</p>
      </div>

      {/* Currency Selector */}
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">Moeda Global</h2>
        <div className="flex flex-wrap gap-2">
          {(["BRL", "EUR", "USD"] as const).map((currency) => (
            <button
              key={currency}
              onClick={() => setGlobalCurrency(currency)}
              className={`min-h-[44px] flex items-center rounded-lg px-4 text-sm font-semibold transition ${
                globalCurrency === currency
                  ? "bg-amber-500 text-slate-950"
                  : "border border-white/10 text-white hover:bg-white/5"
              }`}
            >
              {currency === "BRL" ? "🇧🇷 Real (BRL)" : currency === "EUR" ? "🇪🇺 Euro (EUR)" : "🇺🇸 Dólar (USD)"}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Moeda selecionada: <span className="font-semibold text-white">{globalCurrency}</span>
        </p>
      </section>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">Exportar Dados</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleExportExcel} className="min-h-[44px] flex items-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 transition">
            Exportar Excel
          </button>
          <button className="min-h-[44px] flex items-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-slate-950 hover:bg-amber-600 transition" onClick={() => setPayload(exportSnapshot())}>
            Exportar JSON
          </button>
          <button className="min-h-[44px] flex items-center rounded-lg border border-white/10 px-4 text-sm text-white hover:bg-white/5 transition" onClick={() => importSnapshot(payload)}>
            Importar JSON
          </button>
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">Backup/Restore JSON</h2>
        <textarea className="w-full rounded-lg border border-white/10 bg-slate-900 p-3 font-mono text-xs text-slate-200 outline-none" rows={6} placeholder="Cole o JSON aqui para restaurar ou exporte acima" value={payload} onChange={(event) => setPayload(event.target.value)} />
        <p className="mt-2 text-xs text-slate-400">
          {payload.length > 0 ? `${payload.length} caracteres` : "Exporte acima para copiar, ou cole um backup anterior"}
        </p>
      </section>
    </div>
  );
}
