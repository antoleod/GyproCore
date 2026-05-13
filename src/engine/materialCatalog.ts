import type { MaterialDefinition } from "../types/material";

export const materialCatalog: MaterialDefinition[] = [
  { key: "chapa", label: "Chapa", unit: "m2", purchaseUnit: "m2" },
  { key: "guia", label: "Guia", unit: "ml", purchaseUnit: "ml" },
  { key: "f47", label: "F47", unit: "ml", purchaseUnit: "ml" },
  { key: "tirante", label: "Tirante", unit: "und", purchaseUnit: "und" },
  { key: "suporteNivelador", label: "Suporte nivelador", unit: "und", purchaseUnit: "und" },
  { key: "t25", label: "Parafuso T25", unit: "und", purchaseUnit: "milheiro" },
  { key: "mm", label: "Parafuso MM", unit: "und", purchaseUnit: "und" },
  { key: "massa", label: "Massa", unit: "kg", purchaseUnit: "saco 20kg" },
  { key: "fita", label: "Fita", unit: "ml", purchaseUnit: "rolo 150ml" },
];
