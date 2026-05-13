import { Plus } from "lucide-react";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useProjectStore } from "../stores/projectStore";
import { formatNumber } from "../utils/format";

const numberValue = (value: string) => Number.parseFloat(value) || 0;

export function WorkspacePage() {
  const { zones } = useProjectCalculations();
  const updateMeasurement = useProjectStore((state) => state.updateMeasurement);
  const addMeasurement = useProjectStore((state) => state.addMeasurement);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Workspace de estimativa</h1>
        <p className="mt-1 text-sm text-slate-400">Edite medidas e veja perimetro, area, F47 e unidades recalcularem em tempo real.</p>
      </div>

      {zones.map((zone) => (
        <section key={zone.zone.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{zone.zone.name}</h2>
              <p className="text-sm text-slate-400">
                {zone.zone.calculationType} · espacamento {zone.zone.spacing} · {formatNumber(zone.totalArea)} m2
              </p>
            </div>
            <button
              type="button"
              onClick={() => addMeasurement(zone.zone.id)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/5"
            >
              <Plus size={16} />
              Linha
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[860px] w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-2">#</th>
                  <th className="px-2">Local</th>
                  <th className="px-2">Lado 1</th>
                  <th className="px-2">Lado 2</th>
                  <th className="px-2">Subtr.</th>
                  <th className="px-2">Perimetro</th>
                  <th className="px-2">Spc</th>
                  <th className="px-2">F47 ml</th>
                  <th className="px-2">Unid.</th>
                  <th className="px-2">Area</th>
                </tr>
              </thead>
              <tbody>
                {zone.measurements.map((measurement) => (
                  <tr key={measurement.id} className="bg-slate-900">
                    <td className="rounded-l-lg px-2 py-2 text-slate-400">{measurement.index}</td>
                    <td className="px-2 py-2">
                      <input className="field w-36" value={measurement.label ?? ""} onChange={(event) => updateMeasurement(measurement.id, { label: event.target.value })} />
                    </td>
                    <td className="px-2 py-2"><input className="field w-20" type="number" value={measurement.side1} onChange={(event) => updateMeasurement(measurement.id, { side1: numberValue(event.target.value) })} /></td>
                    <td className="px-2 py-2"><input className="field w-20" type="number" value={measurement.side2} onChange={(event) => updateMeasurement(measurement.id, { side2: numberValue(event.target.value) })} /></td>
                    <td className="px-2 py-2"><input className="field w-20" type="number" value={measurement.subtract} onChange={(event) => updateMeasurement(measurement.id, { subtract: numberValue(event.target.value) })} /></td>
                    <td className="px-2 py-2 text-slate-200">{formatNumber(measurement.perimeter)}</td>
                    <td className="px-2 py-2 text-slate-400">{measurement.spacingValue}</td>
                    <td className="px-2 py-2 text-slate-200">{formatNumber(measurement.f47Ml)}</td>
                    <td className="px-2 py-2 text-slate-200">{formatNumber(measurement.units)}</td>
                    <td className="rounded-r-lg px-2 py-2 font-medium text-white">{formatNumber(measurement.area)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
