import { Edit2, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";
import { StatCard } from "../components/ui/StatCard";
import { useT } from "../hooks/useT";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useProjectStore } from "../stores/projectStore";
import { formatCurrency, formatNumber } from "../utils/format";
import { InlineEditField } from "../components/ui/InlineEditField";
import type { MaterialKey } from "../types/material";

export function PricingPage() {
  const t = useT();
  const { project, pricedMaterials, grandTotal, pricePerSquareMeter } = useProjectCalculations();
  const updatePrice = useProjectStore((state) => state.updatePrice);
  const updateMaterialLabel = useProjectStore((state) => state.updateMaterialLabel);
  const deleteMaterial = useProjectStore((state) => state.deleteMaterial);
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [tempLabel, setTempLabel] = useState("");

  const handleStartEditLabel = (key: string, currentLabel: string) => {
    setEditingLabel(key);
    setTempLabel(currentLabel);
  };

  const handleSaveLabel = (key: string) => {
    if (tempLabel.trim()) {
      updateMaterialLabel(key as MaterialKey, tempLabel.trim());
    }
    setEditingLabel(null);
  };

  const handleCancelLabel = () => {
    setEditingLabel(null);
    setTempLabel("");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">{t.pricing_heading}</h1>
        <p className="mt-1 text-sm text-slate-400">
          {t.pricing_subtitle}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label={t.pricing_stats_grandTotal} value={formatCurrency(grandTotal, project.currency)} />
        <StatCard label={t.pricing_stats_priceM2} value={formatCurrency(pricePerSquareMeter, project.currency)} />
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Edit2 size={16} />
          {t.pricing_editHint}
        </div>

        <div className="grid gap-3">
          {pricedMaterials.map((item) => (
            <div
              key={item.key}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-4 space-y-4 sm:space-y-0"
            >
              {/* Material name row */}
              <div className="flex items-start justify-between gap-3 sm:items-center">
                {editingLabel === item.key ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={tempLabel}
                      onChange={(e) => setTempLabel(e.target.value)}
                      className="flex-1 rounded-lg border border-amber-400 bg-slate-950 px-3 py-2 text-sm text-amber-300 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveLabel(item.key);
                        if (e.key === "Escape") handleCancelLabel();
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveLabel(item.key)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-emerald-600 px-3 font-semibold text-white hover:bg-emerald-700 transition"
                      type="button"
                    >
                      {t.pricing_btn_save}
                    </button>
                    <button
                      onClick={handleCancelLabel}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-white/10 px-3 text-slate-400 hover:bg-white/5 transition"
                      type="button"
                    >
                      {t.pricing_btn_cancel}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <button
                        onClick={() => handleStartEditLabel(item.key, item.label)}
                        className="group text-left"
                        type="button"
                      >
                        <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                          {item.label}
                        </p>
                      </button>
                      <p className="mt-1 text-xs text-slate-400">
                        {formatNumber(item.purchaseQuantity)} {item.purchaseUnit}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMaterial(item.key)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition"
                      title={t.pricing_btn_deleteMaterial}
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Price and total row */}
              <div className="grid grid-cols-2 gap-3 sm:flex sm:items-end sm:gap-3">
                <div className="flex-1">
                  <InlineEditField
                    label={t.pricing_label_unitPrice.replace("{currency}", project.currency)}
                    value={item.unitPrice}
                    onChange={(val) => updatePrice(item.key, val as number)}
                    type="number"
                    step="0.01"
                  />
                </div>

                <div className="rounded-lg border border-white/10 bg-slate-950 p-2 sm:min-w-40">
                  <p className="text-xs uppercase text-slate-400">{t.pricing_label_total}</p>
                  <p className="text-lg font-semibold text-amber-300">
                    {formatCurrency(item.total, project.currency)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {pricedMaterials.length === 0 && (
        <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.02] p-8 text-center">
          <p className="text-sm text-slate-400">{t.pricing_empty}</p>
        </div>
      )}
    </div>
  );
}
