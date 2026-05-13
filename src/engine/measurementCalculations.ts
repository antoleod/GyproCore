import type { CalculationType, RoomMeasurement, Zone } from "../types/project";
import type { CalculatedMeasurement } from "../types/calculation";

export function round(value: number, digits = 4): number {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function calculatePerimeter(side1: number, side2: number, subtract = 0): number {
  return Math.max(((side1 + side2) * 2) - subtract, 0);
}

export function calculateArea(side1: number, side2: number): number {
  return Math.max(side1 * side2, 0);
}

export function calculateStandardF47(side1: number, side2: number, spacing: number): number {
  if (!spacing || spacing <= 0) return 0;
  return (side2 / spacing) * side1;
}

export function calculateCorridorF47(side1: number, side2: number, spacing: number): number {
  if (!spacing || spacing <= 0) return 0;
  return (side1 * side2) + ((side2 / spacing) * side1);
}

export function calculateF47(side1: number, side2: number, spacing: number, type: CalculationType): number {
  return type === "corridor"
    ? calculateCorridorF47(side1, side2, spacing)
    : calculateStandardF47(side1, side2, spacing);
}

export function calculateUnits(f47Ml: number, divisor = 3): number {
  if (!divisor || divisor <= 0) return 0;
  return f47Ml / divisor;
}

export function calculateMeasurement(measurement: RoomMeasurement, zone: Zone): CalculatedMeasurement {
  const isValid = measurement.side1 > 0 && measurement.side2 > 0;
  const perimeter = isValid ? calculatePerimeter(measurement.side1, measurement.side2, measurement.subtract) : 0;
  const spacingValue = perimeter > 0 ? zone.spacing : 0;
  const f47Ml = isValid ? calculateF47(measurement.side1, measurement.side2, spacingValue, zone.calculationType) : 0;
  const area = isValid ? calculateArea(measurement.side1, measurement.side2) : 0;

  return {
    ...measurement,
    perimeter,
    spacingValue,
    f47Ml,
    units: calculateUnits(f47Ml, measurement.divisor ?? 3),
    area,
    isValid,
  };
}
