import { useState } from "react";
import { useProjectStore } from "../stores/projectStore";

export function SettingsPage() {
  const exportSnapshot = useProjectStore((state) => state.exportSnapshot);
  const importSnapshot = useProjectStore((state) => state.importSnapshot);
  const [payload, setPayload] = useState("");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Ajustes</h1>
        <p className="mt-1 text-sm text-slate-400">Backup local em JSON enquanto a versao SQLite/PostgreSQL nao entra.</p>
      </div>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950" onClick={() => setPayload(exportSnapshot())}>
            Exportar JSON
          </button>
          <button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5" onClick={() => importSnapshot(payload)}>
            Importar JSON
          </button>
        </div>
        <textarea className="mt-4 min-h-80 w-full rounded-lg border border-white/10 bg-slate-900 p-3 font-mono text-xs text-slate-200 outline-none" value={payload} onChange={(event) => setPayload(event.target.value)} />
      </section>
    </div>
  );
}
