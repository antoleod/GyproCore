import { Minus, Plus, Trash2 } from "lucide-react";
import { useT } from "../../hooks/useT";
import { CalculatedMeasurement } from "../../types/calculation";
import { formatNumber } from "../../utils/format";

interface MeasurementCardProps {
  measurement: CalculatedMeasurement;
  onUpdate: (id: string, patch: Partial<CalculatedMeasurement>) => void;
  onDelete: (id: string) => void;
}

const numberValue = (value: string) => Number.parseFloat(value) || 0;
const clampNumber = (value: number) => Math.max(0, Math.round(value * 100) / 100);

export function MeasurementCard({ measurement, onUpdate, onDelete }: MeasurementCardProps) {
  const t = useT();

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 space-y-3">
      {/* Header with index and delete */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 flex-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300">
            {measurement.index}
          </span>
          <input
            className="field flex-1"
            placeholder={t.card_placeholder_name}
            value={measurement.label ?? ""}
            onChange={(e) => onUpdate(measurement.id, { label: e.target.value })}
          />
        </div>
        <button
          onClick={() => onDelete(measurement.id)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition"
          type="button"
          title={t.card_btn_delete}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Measurements - vertical layout for mobile */}
      <div className="space-y-2">
        <DimensionStepper
          label={t.card_label_side1}
          value={measurement.side1}
          onChange={(value) => onUpdate(measurement.id, { side1: value })}
        />
        <DimensionStepper
          label={t.card_label_side2}
          value={measurement.side2}
          onChange={(value) => onUpdate(measurement.id, { side2: value })}
        />
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase text-slate-500">{t.card_label_subtract}</span>
          <input
            className="field w-full text-center"
            type="number"
            inputMode="decimal"
            step="0.01"
            value={measurement.subtract}
            onChange={(e) => onUpdate(measurement.id, { subtract: numberValue(e.target.value) })}
          />
        </label>
      </div>

      {/* Results - always visible */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">{t.card_result_perimeter}</p>
          <p className="text-lg font-semibold text-amber-300">{formatNumber(measurement.perimeter)} m</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">{t.card_result_area}</p>
          <p className="text-lg font-semibold text-white">{formatNumber(measurement.area)} m²</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">{t.card_result_f47}</p>
          <p className="text-sm text-slate-200">{formatNumber(measurement.f47Ml)} ml</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">{t.card_result_units}</p>
          <p className="text-sm text-slate-200">{formatNumber(measurement.units)}</p>
        </div>
      </div>
    </div>
  );
}

function DimensionStepper({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const adjust = (delta: number) => onChange(clampNumber(value + delta));

  return (
    <label className="space-y-1">
      <span className="text-xs font-medium uppercase text-slate-500">{label}</span>
      <div className="grid grid-cols-[44px_1fr_44px] gap-2">
        <button
          className="flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-200 hover:bg-white/5"
          type="button"
          onClick={() => adjust(-0.1)}
          aria-label={`Diminuir ${label}`}
        >
          <Minus size={16} />
        </button>
        <input
          className="field w-full text-center text-lg font-semibold"
          type="number"
          inputMode="decimal"
          step="0.01"
          value={value}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => onChange(numberValue(event.target.value))}
        />
        <button
          className="flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-200 hover:bg-white/5"
          type="button"
          onClick={() => adjust(0.1)}
          aria-label={`Aumentar ${label}`}
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {[0.1, 0.5, 1, 2].map((increment) => (
          <button
            key={increment}
            className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5"
            type="button"
            onClick={() => adjust(increment)}
          >
            +{increment}
          </button>
        ))}
      </div>
    </label>
  );
}
