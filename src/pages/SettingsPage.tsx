import { useState } from "react";
import { useProjectStore } from "../stores/projectStore";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useT } from "../hooks/useT";
import { exportProjectToExcel } from "../services/excelExporter";

export function SettingsPage() {
  const t = useT();
  const exportSnapshot = useProjectStore((state) => state.exportSnapshot);
  const importSnapshot = useProjectStore((state) => state.importSnapshot);
  const globalCurrency = useProjectStore((state) => state.globalCurrency);
  const setGlobalCurrency = useProjectStore((state) => state.setGlobalCurrency);
  const language = useProjectStore((state) => state.language);
  const setLanguage = useProjectStore((state) => state.setLanguage);
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
        <h1 className="text-2xl font-semibold text-white">{t.settings_heading}</h1>
        <p className="mt-1 text-sm text-slate-400">{t.settings_subtitle}</p>
      </div>

      {/* Language Selector */}
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">{t.settings_language_heading}</h2>
        <div className="flex flex-wrap gap-2">
          {(["pt", "en", "es"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`min-h-[44px] flex items-center rounded-lg px-4 text-sm font-semibold transition ${
                language === lang
                  ? "bg-amber-500 text-slate-950"
                  : "border border-white/10 text-white hover:bg-white/5"
              }`}
            >
              {lang === "pt" ? t.settings_language_pt : lang === "en" ? t.settings_language_en : t.settings_language_es}
            </button>
          ))}
        </div>
      </section>

      {/* Currency Selector */}
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">{t.settings_currency_heading}</h2>
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
              {currency === "BRL" ? t.settings_currency_brl : currency === "EUR" ? t.settings_currency_eur : t.settings_currency_usd}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          {t.settings_currency_selected.replace("{currency}", globalCurrency)}
        </p>
      </section>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">{t.settings_export_heading}</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleExportExcel} className="min-h-[44px] flex items-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 transition">
            {t.settings_export_excel}
          </button>
          <button className="min-h-[44px] flex items-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-slate-950 hover:bg-amber-600 transition" onClick={() => setPayload(exportSnapshot())}>
            {t.settings_export_json}
          </button>
          <button className="min-h-[44px] flex items-center rounded-lg border border-white/10 px-4 text-sm text-white hover:bg-white/5 transition" onClick={() => importSnapshot(payload)}>
            {t.settings_import_json}
          </button>
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-sm font-semibold text-white">{t.settings_backup_heading}</h2>
        <textarea className="w-full rounded-lg border border-white/10 bg-slate-900 p-3 font-mono text-xs text-slate-200 outline-none" rows={6} placeholder={t.settings_backup_placeholder} value={payload} onChange={(event) => setPayload(event.target.value)} />
        <p className="mt-2 text-xs text-slate-400">
          {payload.length > 0 ? t.settings_backup_charCount.replace("{n}", String(payload.length)) : t.settings_backup_hint}
        </p>
      </section>
    </div>
  );
}
