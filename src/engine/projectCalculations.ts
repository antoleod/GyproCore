import type { CalculatedZone, ProjectTotals } from "../types/calculation";
import type { RoomMeasurement, Zone } from "../types/project";
import { calculateMeasurement, round } from "./measurementCalculations";

export function calculateZone(zone: Zone, measurements: RoomMeasurement[]): CalculatedZone {
  const calculated = measurements
    .filter((measurement) => measurement.zoneId === zone.id)
    .sort((a, b) => a.index - b.index)
    .map((measurement) => calculateMeasurement(measurement, zone));

  const coefficientMultiplier = 1 + zone.coefficient;
  const quantityMultiplier = coefficientMultiplier * zone.unitQuantity;
  const area = calculated.reduce((sum, item) => sum + item.area, 0) * quantityMultiplier;
  const guides = calculated.reduce((sum, item) => sum + item.perimeter, 0) * quantityMultiplier;
  const f47 = calculated.reduce((sum, item) => sum + item.f47Ml, 0) * quantityMultiplier;

  return {
    zone,
    measurements: calculated,
    area: round(area),
    guides: round(guides),
    f47: round(f47),
    totalArea: round(area * zone.floorQuantity),
    totalGuides: round(guides * zone.floorQuantity),
    totalF47: round(f47 * zone.floorQuantity),
    hasValidMeasurements: calculated.some((measurement) => measurement.isValid),
  };
}

export function calculateDerivedMaterials(totalArea: number) {
  const tirante = totalArea * 2.02;
  const suporteNivelador = tirante;
  const t25 = totalArea * 15;
  const mm = t25 * 0.02;
  const massaKg = totalArea * 0.45;
  const fitaMl = totalArea * 1.4;

  return {
    tirante: round(tirante),
    suporteNivelador: round(suporteNivelador),
    t25: round(t25),
    mm: round(mm),
    massaKg: round(massaKg),
    fitaMl: round(fitaMl),
  };
}

export function calculateProjectTotals(zones: CalculatedZone[]): ProjectTotals {
  const totalArea = round(zones.reduce((sum, zone) => sum + zone.totalArea, 0));
  const totalGuides = round(zones.reduce((sum, zone) => sum + zone.totalGuides, 0));
  const totalF47 = round(zones.reduce((sum, zone) => sum + zone.totalF47, 0));

  return {
    totalArea,
    totalGuides,
    totalF47,
    ...calculateDerivedMaterials(totalArea),
  };
}
