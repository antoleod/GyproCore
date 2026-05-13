import type { Currency } from "../types/material";

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatCurrency(value: number, currency: Currency): string {
  const locale = currency === "BRL" ? "pt-BR" : currency === "EUR" ? "fr-BE" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
