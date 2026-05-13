import { Plus, Settings } from "lucide-react";
import { useState } from "react";
import { useT } from "../../hooks/useT";
import { CalculatedZone } from "../../types/calculation";
import { formatNumber } from "../../utils/format";
import { InlineEditField } from "../ui/InlineEditField";
import { CollapsibleSection } from "../ui/CollapsibleSection";

interface ZoneHeaderProps {
  zone: CalculatedZone;
  onUpdateZone: (id: string, patch: Partial<CalculatedZone["zone"]>) => void;
  onAddMeasurement: (zoneId: string) => void;
}

export function ZoneHeader({ zone, onUpdateZone, onAddMeasurement }: ZoneHeaderProps) {
  const t = useT();

  return (
    <div className="space-y-3">
      {/* Main zone header */}
      <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 space-y-3">
        {/* Zone name and add button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <input
              className="field w-full"
              placeholder={t.zone_placeholder_name}
              value={zone.zone.name}
              onChange={(e) => onUpdateZone(zone.zone.id, { name: e.target.value })}
            />
          </div>
          <button
            type="button"
            onClick={() => onAddMeasurement(zone.zone.id)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition whitespace-nowrap"
          >
            <Plus size={16} />
            {t.zone_btn_add}
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-slate-400">
            <span className="text-white font-semibold">{formatNumber(zone.totalArea)} m²</span>
            <span className="mx-1">·</span>
            <span>{zone.zone.calculationType}</span>
            <span className="mx-1">·</span>
            <span className="text-white font-semibold">{formatNumber(zone.totalGuides)} ml</span>
          </p>
        </div>
      </div>

      {/* Collapsible parameters */}
      <CollapsibleSection
        title={t.zone_params_sectionTitle}
        icon={<Settings size={16} />}
        variant="amber"
        defaultOpen={false}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="space-y-2">
            <InlineEditField
              label={t.zone_params_spacing}
              value={zone.zone.spacing}
              onChange={(val) => onUpdateZone(zone.zone.id, { spacing: val as number })}
              type="number"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <InlineEditField
              label={t.zone_params_coef}
              value={zone.zone.coefficient * 100}
              onChange={(val) => onUpdateZone(zone.zone.id, { coefficient: (val as number) / 100 })}
              type="number"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <InlineEditField
              label={t.zone_params_floors}
              value={zone.zone.floorQuantity}
              onChange={(val) => onUpdateZone(zone.zone.id, { floorQuantity: val as number })}
              type="number"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <InlineEditField
              label={t.zone_params_units}
              value={zone.zone.unitQuantity}
              onChange={(val) => onUpdateZone(zone.zone.id, { unitQuantity: val as number })}
              type="number"
              step="1"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
