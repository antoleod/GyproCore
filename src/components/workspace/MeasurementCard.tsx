import { Trash2 } from "lucide-react";
import { CalculatedMeasurement } from "../../types/calculation";
import { formatNumber } from "../../utils/format";

interface MeasurementCardProps {
  measurement: CalculatedMeasurement;
  onUpdate: (id: string, patch: Partial<CalculatedMeasurement>) => void;
  onDelete: (id: string) => void;
}

const numberValue = (value: string) => Number.parseFloat(value) || 0;

export function MeasurementCard({ measurement, onUpdate, onDelete }: MeasurementCardProps) {
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
            placeholder="Nome do local"
            value={measurement.label ?? ""}
            onChange={(e) => onUpdate(measurement.id, { label: e.target.value })}
          />
        </div>
        <button
          onClick={() => onDelete(measurement.id)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition"
          type="button"
          title="Eliminar medida"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Measurements - vertical layout for mobile */}
      <div className="space-y-2">
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase text-slate-500">Lado 1 (m)</span>
          <input
            className="field w-full text-center"
            type="number"
            inputMode="decimal"
            step="0.01"
            value={measurement.side1}
            onChange={(e) => onUpdate(measurement.id, { side1: numberValue(e.target.value) })}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase text-slate-500">Lado 2 (m)</span>
          <input
            className="field w-full text-center"
            type="number"
            inputMode="decimal"
            step="0.01"
            value={measurement.side2}
            onChange={(e) => onUpdate(measurement.id, { side2: numberValue(e.target.value) })}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium uppercase text-slate-500">Subtrair (m)</span>
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
          <p className="text-xs font-medium uppercase text-slate-500">Periferique</p>
          <p className="text-lg font-semibold text-amber-300">{formatNumber(measurement.perimeter)} m</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">TOTAL M²</p>
          <p className="text-lg font-semibold text-white">{formatNumber(measurement.area)} m²</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">Plagyp</p>
          <p className="text-sm text-slate-200">{formatNumber(measurement.f47Ml)} ml</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">Unidades</p>
          <p className="text-sm text-slate-200">{formatNumber(measurement.units)}</p>
        </div>
      </div>
    </div>
  );
}
