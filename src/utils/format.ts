import type { Currency } from "../types/material";

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatCurrency(value: number, currency: Currency): string {
  return new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "fr-BE", {
    style: "currency",
    currency,
  }).format(value);
}
