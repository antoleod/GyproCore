# GyproCore Excel Analysis

## Source Status

The workbook `Copie de Levantamento de Forro.xlsx` was inspected directly after it became available in the workspace. The workbook has 12 sheets and 891 detected formulas.

## Discovered Workbook Shape

- `Tab Geral`: project-level material consolidation.
- `Tab1` to `Tab10`: per-zone calculation tabs.
- `Preco`: pricing, purchase-unit conversion, grand total, and price per square meter.

## Sheet Inventory

| Sheet | Range | Formula count | Purpose |
| --- | --- | ---: | --- |
| `Tab Geral` | `A1:K30` | 109 | Consolidates zone totals and derived materials. |
| `Tab1` | `A1:L50` | 132 | Zone: Park Way. |
| `Tab2` | `A1:L58` | 262 | Zone: Corpo de bombeiros. |
| `Tab3` to `Tab9` | mostly `A1:L50` | 28 to 93 each | Mostly configured zone templates; cached totals are zero in the supplied workbook. |
| `Tab10` | `A1:L50` | 91 | Corridor zone using the stronger F47 formula. |
| `Preco` | `A1:K8` | 22 | Purchase quantities, unit prices, total, and price per m2. |

## Business Rules Captured

- A project contains zones. Each former `TabN` maps to one zone.
- Zone inputs: spacing, coefficient, floor quantity, unit quantity, and calculation type.
- Measurement inputs: label, side 1, side 2, subtraction, and unit divisor.
- Per line:
  - `perimeter = ((side1 + side2) * 2) - subtract`
  - `area = side1 * side2`
  - standard F47: `(side2 / spacing) * side1`
  - corridor F47: `(side1 * side2) + ((side2 / spacing) * side1)`
  - units: `f47Ml / divisor`
- Per zone:
  - area, guides, and F47 are summed, multiplied by coefficient and unit quantity, then multiplied by floor quantity.
- Project material derivations:
  - `tirante = totalArea * 2.02`
  - `suporteNivelador = tirante`
  - `t25 = totalArea * 15`
  - `mm = t25 * 0.02`
  - `massaKg = totalArea * 0.45`
  - `fitaMl = totalArea * 1.4`
- Purchase conversions:
  - T25 by 1000
  - Massa by 20
  - Fita by 150

## Confirmed Excel Sample Totals

The cached workbook results are:

- Total area: `602.6802 m2`
- Total guides: `550.12 ml`
- Total F47: `1457.5231166666667 ml`
- Tirante: `1217.414004`
- Suporte nivelador: `1217.414004`
- T25: `9040.203`
- MM: `180.80406`
- Massa: `271.20609 kg`
- Fita: `843.75228 ml`
- Grand total: `10076.861934318335`
- Price per m2: `16.720081287419653`

The initial app demo now uses the active workbook rows from `Tab1`, `Tab2`, and `Tab10`, plus the workbook unit prices:

- Chapa `7.60`
- Guia `1.54`
- F47 `1.61`
- Tirante `0.38`
- Suporte nivelador `0.86`
- T25 `24.81`
- MM `0.38`
- Massa `30.43`
- Fita `15.55`

## Architecture Roadmap

1. Calculation engine: pure TypeScript functions in `src/engine`, covered by unit tests.
2. Local-first data layer: Zustand persisted to localStorage for MVP, with models shaped for SQLite/PostgreSQL migration.
3. UI shell: mobile-first React Router pages for dashboard, workspace, materials, pricing, report, and settings.
4. Import/export: JSON snapshot for backups and future migration.
5. PDF phase: replace the current report preview action with generated quotations.
6. Database phase: introduce Express + SQLite/Prisma behind the same typed domain model.

## Workbook Validation Needed Later

For the next reverse-engineering pass:

- Compare calculated app demo totals with workbook totals after adding all non-zero workbook zones.
- Confirm if coefficients are always decimal multipliers.
- Identify every divisor rule for `/3` and `/4`.
- Check whether `Subtr.` can exceed perimeter and how Excel handles negatives.
- Verify whether `Preco!K3` and `Tab Geral!K8` are intentionally unused or represent a missing material column.
- Verify hidden pricing rows, taxes, labor, margins, rounding, and currency behavior.
