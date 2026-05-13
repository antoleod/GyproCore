import type { Currency } from "./material";

export type CalculationType = "standard" | "corridor" | "custom";

export interface Project {
  id: string;
  slug: string;
  companyName: string;
  clientName?: string;
  projectName: string;
  address?: string;
  city?: string;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
}

export interface Zone {
  id: string;
  projectId: string;
  name: string;
  floorLabel?: string;
  spacing: number;
  coefficient: number;
  floorQuantity: number;
  unitQuantity: number;
  calculationType: CalculationType;
}

export interface RoomMeasurement {
  id: string;
  zoneId: string;
  index: number;
  label?: string;
  side1: number;
  side2: number;
  subtract: number;
  divisor?: number;
}
