import { useState } from "react";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useProjectStore } from "../stores/projectStore";
import { useT } from "../hooks/useT";
import { MeasurementCard } from "../components/workspace/MeasurementCard";
import { ZoneHeader } from "../components/workspace/ZoneHeader";
import { CollapsibleSection } from "../components/ui/CollapsibleSection";
import { Layers, X } from "lucide-react";
import { calculateMeasurement } from "../engine/measurementCalculations";
import type { CalculatedZone } from "../types/calculation";
import type { RoomMeasurement } from "../types/project";

export function WorkspacePage() {
  const t = useT();
  const { zones } = useProjectCalculations();
  const updateMeasurement = useProjectStore((state) => state.updateMeasurement);
  const updateZone = useProjectStore((state) => state.updateZone);
  const addMeasurement = useProjectStore((state) => state.addMeasurement);
  const deleteMeasurement = useProjectStore((state) => state.deleteMeasurement);

  const [expandedZones, setExpandedZones] = useState<Set<string>>(new Set());
  const [draftZoneId, setDraftZoneId] = useState<string | null>(null);
  const [draftMeasurement, setDraftMeasurement] = useState<RoomMeasurement | null>(null);

  const handleAddMeasurement = (zoneId: string) => {
    const zone = zones.find((item) => item.zone.id === zoneId);
    if (!zone) return;

    setDraftZoneId(zoneId);
    setDraftMeasurement({
      id: "draft-measurement",
      zoneId,
      index: zone.measurements.length + 1,
      label: "",
      side1: 0,
      side2: 0,
      subtract: 0,
      divisor: 3,
    });
    setExpandedZones((prev) => new Set(prev).add(zoneId));
  };

  const closeDraft = () => {
    setDraftZoneId(null);
    setDraftMeasurement(null);
  };

  const saveDraft = () => {
    if (!draftZoneId || !draftMeasurement) return;

    addMeasurement(draftZoneId);
    const createdMeasurement = useProjectStore
      .getState()
      .measurements.filter((measurement) => measurement.zoneId === draftZoneId)
      .sort((a, b) => b.index - a.index)[0];

    if (createdMeasurement) {
      updateMeasurement(createdMeasurement.id, {
        label: draftMeasurement.label,
        side1: draftMeasurement.side1,
        side2: draftMeasurement.side2,
        subtract: draftMeasurement.subtract,
        divisor: draftMeasurement.divisor,
      });
    }

    closeDraft();
  };

  const draftZone = draftZoneId ? zones.find((zone) => zone.zone.id === draftZoneId) : undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{t.workspace_heading}</h1>
        <p className="mt-2 text-slate-400">
          {t.workspace_subtitle}
        </p>
      </div>

      {zones.map((zone) => (
        <div key={zone.zone.id} className="space-y-5">
          {/* Zone Parameters Header */}
          <ZoneHeader
            zone={zone}
            onUpdateZone={updateZone}
            onAddMeasurement={handleAddMeasurement}
          />

          {/* Zone Summary */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">{t.workspace_summary_totalArea}</p>
              <p className="text-xl font-bold text-white">{zone.totalArea.toFixed(2)} m²</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">{t.workspace_summary_guides}</p>
              <p className="text-xl font-bold text-white">{zone.totalGuides.toFixed(2)} ml</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">{t.workspace_summary_f47}</p>
              <p className="text-xl font-bold text-white">{zone.totalF47.toFixed(2)} ml</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">{t.workspace_summary_measurements}</p>
              <p className="text-xl font-bold text-amber-300">{zone.measurements.length}</p>
            </div>
          </div>

          {/* Measurements - collapsible on mobile */}
          <CollapsibleSection
            title={`${zone.measurements.length} ${zone.measurements.length === 1 ? t.workspace_measurement_one : t.workspace_measurement_plural}`}
            icon={<Layers size={16} />}
            defaultOpen={zone.measurements.length === 0 || expandedZones.has(zone.zone.id)}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-2">
              {zone.measurements.map((measurement) => (
                <MeasurementCard
                  key={measurement.id}
                  measurement={measurement}
                  onUpdate={updateMeasurement}
                  onDelete={deleteMeasurement}
                />
              ))}
            </div>
          </CollapsibleSection>
        </div>
      ))}

      {draftZone && draftMeasurement ? (
        <MeasurementDraftModal
          zone={draftZone}
          measurement={draftMeasurement}
          onChange={setDraftMeasurement}
          onClose={closeDraft}
          onSave={saveDraft}
        />
      ) : null}
    </div>
  );
}

function MeasurementDraftModal({
  zone,
  measurement,
  onChange,
  onClose,
  onSave,
}: {
  zone: CalculatedZone;
  measurement: RoomMeasurement;
  onChange: (measurement: RoomMeasurement) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const calculated = calculateMeasurement(measurement, zone.zone);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-black/50">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Adicionar piece</p>
            <p className="text-xs text-slate-400">{zone.zone.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/5"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <MeasurementCard
          measurement={calculated}
          onUpdate={(_, patch) => onChange({ ...measurement, ...patch })}
          onDelete={onClose}
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/5"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
