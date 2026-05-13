export type Currency = "EUR" | "BRL";

export type MaterialKey =
  | "chapa"
  | "guia"
  | "f47"
  | "tirante"
  | "suporteNivelador"
  | "t25"
  | "mm"
  | "massa"
  | "fita";

export interface MaterialDefinition {
  key: MaterialKey;
  label: string;
  unit: string;
  purchaseUnit: string;
}

export interface MaterialPrice {
  id: string;
  materialKey: MaterialKey;
  label: string;
  unit: string;
  unitPrice: number;
}

export interface MaterialQuantity {
  key: MaterialKey;
  label: string;
  unit: string;
  rawQuantity: number;
  purchaseQuantity: number;
  purchaseUnit: string;
}

export interface PricedMaterial extends MaterialQuantity {
  unitPrice: number;
  total: number;
}
