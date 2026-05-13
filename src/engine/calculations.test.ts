import { describe, expect, it } from "vitest";
import { calculateCorridorF47, calculatePerimeter, calculateStandardF47, calculateUnits } from "./measurementCalculations";
import { calculateDerivedMaterials, calculateProjectTotals, calculateZone } from "./projectCalculations";
import { calculateGrandTotal, calculateMaterialQuantities, calculatePricePerSquareMeter, priceMaterials } from "./materialCalculations";
import { defaultPrices, demoMeasurements, demoZones } from "../services/demoData";

describe("measurement calculations", () => {
  it("calculates perimeter with subtraction", () => {
    expect(calculatePerimeter(10, 5, 2)).toBe(28);
  });

  it("calculates standard and corridor F47", () => {
    expect(calculateStandardF47(10, 4.8, 0.48)).toBe(100);
    expect(calculateCorridorF47(10, 4.8, 0.48)).toBe(148);
  });

  it("guards invalid unit divisors", () => {
    expect(calculateUnits(90, 3)).toBe(30);
    expect(calculateUnits(90, 0)).toBe(0);
  });
});

describe("material calculations", () => {
  it("derives materials from area using extracted Excel coefficients", () => {
    expect(calculateDerivedMaterials(100)).toEqual({
      tirante: 202,
      suporteNivelador: 202,
      t25: 1500,
      mm: 30,
      massaKg: 45,
      fitaMl: 140,
    });
  });

  it("calculates price per square meter safely", () => {
    expect(calculatePricePerSquareMeter(10076.86, 602.6802)).toBe(16.72);
    expect(calculatePricePerSquareMeter(100, 0)).toBe(0);
  });

  it("matches the supplied workbook sample totals", () => {
    const zones = demoZones.map((zone) => calculateZone(zone, demoMeasurements));
    const totals = calculateProjectTotals(zones);
    const priced = priceMaterials(calculateMaterialQuantities(totals), defaultPrices);

    expect(totals.totalArea).toBeCloseTo(602.6802, 4);
    expect(totals.totalGuides).toBeCloseTo(550.12, 2);
    expect(totals.totalF47).toBeCloseTo(1457.5231, 4);
    expect(calculateGrandTotal(priced)).toBeCloseTo(10076.86, 2);
    expect(calculatePricePerSquareMeter(calculateGrandTotal(priced), totals.totalArea)).toBe(16.72);
  });
});
