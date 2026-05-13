import { useState } from "react";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useProjectStore } from "../stores/projectStore";
import { MeasurementCard } from "../components/workspace/MeasurementCard";
import { ZoneHeader } from "../components/workspace/ZoneHeader";
import { CollapsibleSection } from "../components/ui/CollapsibleSection";
import { Layers } from "lucide-react";

export function WorkspacePage() {
  const { zones } = useProjectCalculations();
  const updateMeasurement = useProjectStore((state) => state.updateMeasurement);
  const updateZone = useProjectStore((state) => state.updateZone);
  const addMeasurement = useProjectStore((state) => state.addMeasurement);
  const deleteMeasurement = useProjectStore((state) => state.deleteMeasurement);

  const [expandedZones, setExpandedZones] = useState<Set<string>>(new Set());

  const handleAddMeasurement = (zoneId: string) => {
    addMeasurement(zoneId);
    // Expand the zone section when adding a measurement
    setExpandedZones((prev) => new Set(prev).add(zoneId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Estimativa de Forro</h1>
        <p className="mt-2 text-slate-400">
          Edite as medidas de cada local. Perímetro, área, F47 e quantidades são calculadas em tempo real.
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
              <p className="text-xs font-medium uppercase text-slate-500">Área Total</p>
              <p className="text-xl font-bold text-white">{zone.totalArea.toFixed(2)} m²</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">Guias</p>
              <p className="text-xl font-bold text-white">{zone.totalGuides.toFixed(2)} ml</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">F47</p>
              <p className="text-xl font-bold text-white">{zone.totalF47.toFixed(2)} ml</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-slate-500">Medidas</p>
              <p className="text-xl font-bold text-amber-300">{zone.measurements.length}</p>
            </div>
          </div>

          {/* Measurements - collapsible on mobile */}
          <CollapsibleSection
            title={`${zone.measurements.length} ${zone.measurements.length === 1 ? "Medida" : "Medidas"}`}
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
    </div>
  );
}
