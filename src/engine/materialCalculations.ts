import type { MaterialPrice, MaterialQuantity, PricedMaterial } from "../types/material";
import type { ProjectTotals } from "../types/calculation";
import { materialCatalog } from "./materialCatalog";
import { round } from "./measurementCalculations";

export function calculateMaterialQuantities(totals: ProjectTotals): MaterialQuantity[] {
  const values = {
    chapa: { rawQuantity: totals.totalArea, purchaseQuantity: totals.totalArea },
    guia: { rawQuantity: totals.totalGuides, purchaseQuantity: totals.totalGuides },
    f47: { rawQuantity: totals.totalF47, purchaseQuantity: totals.totalF47 },
    tirante: { rawQuantity: totals.tirante, purchaseQuantity: totals.tirante },
    suporteNivelador: { rawQuantity: totals.suporteNivelador, purchaseQuantity: totals.suporteNivelador },
    t25: { rawQuantity: totals.t25, purchaseQuantity: totals.t25 / 1000 },
    mm: { rawQuantity: totals.mm, purchaseQuantity: totals.mm },
    massa: { rawQuantity: totals.massaKg, purchaseQuantity: totals.massaKg / 20 },
    fita: { rawQuantity: totals.fitaMl, purchaseQuantity: totals.fitaMl / 150 },
  };

  return materialCatalog.map((material) => ({
    ...material,
    rawQuantity: round(values[material.key].rawQuantity),
    purchaseQuantity: round(values[material.key].purchaseQuantity),
  }));
}

export function calculateMaterialTotal(quantity: number, unitPrice: number): number {
  return quantity * unitPrice;
}

export function priceMaterials(quantities: MaterialQuantity[], prices: MaterialPrice[]): PricedMaterial[] {
  return quantities.map((quantity) => {
    const price = prices.find((item) => item.materialKey === quantity.key);
    const unitPrice = price?.unitPrice ?? 0;
    return {
      ...quantity,
      unitPrice,
      total: calculateMaterialTotal(quantity.purchaseQuantity, unitPrice),
    };
  });
}

export function calculateGrandTotal(items: { total: number }[]): number {
  return round(items.reduce((sum, item) => sum + item.total, 0), 2);
}

export function calculatePricePerSquareMeter(grandTotal: number, totalArea: number): number {
  if (!totalArea || totalArea <= 0) return 0;
  return round(grandTotal / totalArea, 2);
}
