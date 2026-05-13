import { useState } from "react";
import { useProjectStore } from "../stores/projectStore";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { exportProjectToExcel } from "../services/excelExporter";

export function SettingsPage() {
  const exportSnapshot = useProjectStore((state) => state.exportSnapshot);
  const importSnapshot = useProjectStore((state) => state.importSnapshot);
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
        <p className="mt-1 text-sm text-slate-400">Backup local em JSON enquanto a versao SQLite/PostgreSQL nao entra.</p>
      </div>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">Exportar Dados</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleExportExcel} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Exportar Excel
          </button>
          <button className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-600" onClick={() => setPayload(exportSnapshot())}>
            Exportar JSON
          </button>
          <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5" onClick={() => importSnapshot(payload)}>
            Importar JSON
          </button>
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">Backup/Restore JSON</h2>
        <textarea className="w-full rounded-lg border border-white/10 bg-slate-900 p-3 font-mono text-xs text-slate-200 outline-none" rows={15} placeholder="Paste JSON here to restore or export above" value={payload} onChange={(event) => setPayload(event.target.value)} />
      </section>
    </div>
  );
}
