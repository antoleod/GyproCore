import type { RoomMeasurement, Zone } from "./project";

export interface CalculatedMeasurement extends RoomMeasurement {
  perimeter: number;
  spacingValue: number;
  f47Ml: number;
  units: number;
  area: number;
  isValid: boolean;
}

export interface CalculatedZone {
  zone: Zone;
  measurements: CalculatedMeasurement[];
  area: number;
  guides: number;
  f47: number;
  totalArea: number;
  totalGuides: number;
  totalF47: number;
  hasValidMeasurements: boolean;
}

export interface ProjectTotals {
  totalArea: number;
  totalGuides: number;
  totalF47: number;
  tirante: number;
  suporteNivelador: number;
  t25: number;
  mm: number;
  massaKg: number;
  fitaMl: number;
}
