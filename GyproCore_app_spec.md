# GyproCore — Especificación para convertir el Excel en una webapp

## 1. Contexto

**Empresa:** JK Gyproc Art  
**Nombre de la webapp:** GyproCore  
**Objetivo:** transformar el Excel `Copie de Levantamento de Forro.xlsx` en una aplicación web para calcular materiales y presupuesto de trabajos de gyproc / plafonds / faux plafond / teto.

La app debe permitir crear proyectos, registrar zonas o ambientes, ingresar medidas, calcular automáticamente cantidades de materiales y generar un resumen final con costes.

---

## 2. Qué hace actualmente el Excel

El archivo tiene estas hojas principales:

- `Tab Geral`: resumen general del proyecto y materiales.
- `Tab1` a `Tab10`: cálculos por zona/local.
- `Preço`: cálculo económico con precios unitarios y total final.

El flujo actual es:

1. Se define una obra/proyecto.
2. Cada pestaña `Tab1`, `Tab2`, etc. representa una zona o local.
3. En cada zona se ingresan medidas: `Lado1`, `Lado2`, `Subtr.`, espaciamento, cantidad de pavimentos y cantidad de unidades.
4. El Excel calcula perímetro, área, metros lineales de F47, unidades y área total.
5. `Tab Geral` consolida los totales de todas las zonas.
6. `Preço` aplica precios unitarios y calcula el total en R$ y el coste por m².

---

## 3. Modelo de datos principal

### 3.1 Project

```ts
Project {
  id: string;
  companyName: string;      // Ej: JK Gyproc Art
  clientName?: string;
  projectName: string;      // Obra
  address?: string;
  city?: string;
  currency: 'EUR' | 'BRL';
  createdAt: string;
  updatedAt: string;
}
```

### 3.2 Zone / Local

Cada zona reemplaza una hoja tipo `Tab1`, `Tab2`, etc.

```ts
Zone {
  id: string;
  projectId: string;
  name: string;             // Ej: Park Way, Corpo de bombeiros, Corredor
  floorLabel?: string;      // Pavimento, planta o referencia
  spacing: number;          // Espçto / Spc, ej: 0.48 o 0.40
  coefficient: number;      // Coef., normalmente 0 si no aplica
  floorQuantity: number;    // Qtd. Pav.
  unitQuantity: number;     // Qtd. Und.
  calculationType: 'standard' | 'corridor' | 'custom';
}
```

### 3.3 RoomMeasurement

Cada línea de medidas dentro de una zona.

```ts
RoomMeasurement {
  id: string;
  zoneId: string;
  index: number;
  label?: string;
  side1: number;            // Lado1
  side2: number;            // Lado2
  subtract: number;         // Subtr.
  divisor?: number;         // Para cálculo de unid. Ej: 3 o 4
}
```

### 3.4 MaterialPrice

```ts
MaterialPrice {
  id: string;
  materialKey: MaterialKey;
  label: string;
  unit: string;
  unitPrice: number;
}
```

### 3.5 MaterialKey

```ts
type MaterialKey =
  | 'chapa'
  | 'guia'
  | 'f47'
  | 'tirante'
  | 'suporteNivelador'
  | 't25'
  | 'mm'
  | 'massa'
  | 'fita';
```

---

## 4. Fórmulas detectadas en el Excel

### 4.1 Cálculos por línea

Para cada línea de medidas:

```ts
perimeter = ((side1 + side2) * 2) - subtract;
```

```ts
spacingValue = perimeter > 0 ? zone.spacing : 0;
```

Cálculo estándar de F47 en metros lineales:

```ts
f47Ml = spacingValue === 0 ? 0 : (side2 / spacingValue) * side1;
```

En algunas zonas tipo corredor, el Excel usa una fórmula más fuerte:

```ts
f47Ml = spacingValue === 0
  ? 0
  : (side1 * side2) + ((side2 / spacingValue) * side1);
```

Área:

```ts
area = side1 * side2;
```

Unidades:

```ts
units = f47Ml / divisor;
```

El divisor puede variar según la línea: en el Excel aparecen casos con `/3` y `/4`.

---

## 5. Cálculos por zona

Para cada zona:

```ts
zoneArea = sum(room.area) * (1 + zone.coefficient) * zone.unitQuantity;
```

```ts
zoneGuides = sum(room.perimeter) * (1 + zone.coefficient) * zone.unitQuantity;
```

```ts
zoneF47 = sum(room.f47Ml) * (1 + zone.coefficient) * zone.unitQuantity;
```

El Excel muestra también una columna `Pav.` y `Total`, donde el total multiplica por `Qtd. Pav.`.

```ts
zoneTotalArea = zoneArea * zone.floorQuantity;
zoneTotalGuides = zoneGuides * zone.floorQuantity;
zoneTotalF47 = zoneF47 * zone.floorQuantity;
```

---

## 6. Consolidado general de materiales

En `Tab Geral`, el Excel suma las zonas y calcula materiales derivados a partir del área total.

### 6.1 Materiales principales

```ts
totalArea = sum(zone.totalArea);
totalGuides = sum(zone.totalGuides);
totalF47 = sum(zone.totalF47);
```

### 6.2 Materiales derivados

Según el Excel:

```ts
tirante = totalArea * 2.02;
suporteNivelador = tirante;
t25 = totalArea * 15;
mm = t25 * 0.02;
massaKg = totalArea * 0.45;
fitaMl = totalArea * 1.4;
```

### 6.3 Unidades de compra usadas en `Preço`

En la hoja `Preço`:

```ts
chapaQty = totalArea;
guiaQty = totalGuides;
f47Qty = totalF47;
tiranteQty = tirante;
suporteNiveladorQty = suporteNivelador;
t25Qty = t25 / 1000;
mmQty = mm;
massaQty = massaKg / 20;
fitaQty = fitaMl / 150;
```

Notas:

- `T25` se divide entre 1000.
- `Massa` se divide entre 20, probablemente sacos/baldes de 20 kg.
- `Fita` se divide entre 150, probablemente rollos de 150 ml.

---

## 7. Cálculo de precios

Para cada material:

```ts
materialTotal = quantity * unitPrice;
```

Total general:

```ts
grandTotal = sum(materialTotal);
```

Precio por m²:

```ts
pricePerSquareMeter = grandTotal / totalArea;
```

En el Excel actual, el ejemplo da aproximadamente:

- Área total: `602.6802 m²`
- Total general: `10076.86`
- Precio por m²: `16.72`

---

## 8. Pantallas de la webapp

### 8.1 Dashboard

Debe mostrar:

- Total de proyectos.
- Proyectos recientes.
- Total estimado de presupuestos.
- Botón grande: `Nuevo cálculo`.

### 8.2 Nuevo proyecto

Formulario:

- Nombre de empresa: por defecto `JK Gyproc Art`.
- Nombre de obra.
- Cliente.
- Dirección.
- Ciudad.
- Moneda: EUR / BRL.

### 8.3 Zonas / Ambientes

Cada proyecto debe permitir crear varias zonas.

Campos:

- Nombre de zona.
- Espaciamento.
- Coeficiente.
- Cantidad de pavimentos.
- Cantidad de unidades.
- Tipo de cálculo: estándar / corredor / personalizado.

### 8.4 Medidas de una zona

Tabla editable tipo Excel, pero más limpia:

| # | Local | Lado 1 | Lado 2 | Subtr. | Perímetro | Spc | F47 ml | Unid. | Área |
|---|-------|--------|--------|--------|-----------|-----|--------|-------|------|

Campos editables:

- Local
- Lado 1
- Lado 2
- Subtr.
- Divisor de unidad

Campos calculados automáticamente:

- Perímetro
- Spc
- F47 ml
- Unid.
- Área

### 8.5 Materiales

Debe mostrar el resumen de cantidades:

| Material | Unidad | Cantidad |
|----------|--------|----------|
| Chapa | m² | calculado |
| Guia | ml | calculado |
| F47 | ml | calculado |
| Tirante | und | calculado |
| Sp. Niv. | und | calculado |
| T25 | und / caja | calculado |
| MM | und | calculado |
| Massa | kg / saco | calculado |
| Fita | ml / rollo | calculado |

### 8.6 Precios

Tabla editable de precios unitarios:

| Material | Unidad compra | Cantidad | Precio unitario | Total |
|----------|---------------|----------|-----------------|-------|

Debe permitir:

- Editar precios unitarios.
- Guardar lista de precios como plantilla.
- Duplicar presupuesto.
- Cambiar moneda.

### 8.7 Resumen / Presupuesto

Debe generar una vista profesional:

- Datos de JK Gyproc Art.
- Datos del cliente.
- Datos de la obra.
- Tabla de materiales.
- Total final.
- Precio por m².
- Notas.
- Exportar PDF.

---

## 9. UX/UI recomendada

Estilo visual:

- Profesional, moderno y simple.
- Colores sugeridos:
  - Fondo principal: `#0F172A`
  - Paneles: `#111827`
  - Acento: `#F59E0B` o `#D97706`
  - Texto claro: `#F8FAFC`
  - Texto secundario: `#94A3B8`

Look & feel:

- “Construction premium dashboard”.
- Cards compactas.
- Tablas limpias.
- Botones grandes en móvil.
- Cálculos visibles en tiempo real.
- Alertas si faltan medidas, precios o si el área es 0.

---

## 10. Stack recomendado

### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- Zustand para estado local
- React Hook Form para formularios
- Zod para validación
- Recharts para gráficos simples

### Backend opcional

Primera versión puede ser local-first sin backend.

Para versión más seria:

- Node.js + Express
- SQLite o PostgreSQL
- Prisma ORM
- Export PDF con `pdf-lib`, `puppeteer` o `react-pdf`

### Persistencia inicial recomendada

Para MVP:

```ts
localStorage + export/import JSON
```

Después:

```ts
SQLite/PostgreSQL + login de usuarios
```

---

## 11. Estructura de carpetas recomendada

```txt
gyprocore/
  src/
    app/
      App.tsx
      router.tsx
    components/
      ui/
      layout/
      tables/
    features/
      projects/
      zones/
      measurements/
      materials/
      pricing/
      reports/
    lib/
      calculations/
        measurementCalculations.ts
        materialCalculations.ts
        priceCalculations.ts
      export/
        pdfExport.ts
      storage/
        localStorageDb.ts
    stores/
      projectStore.ts
      priceStore.ts
    types/
      project.ts
      material.ts
      calculation.ts
    styles/
      globals.css
```

---

## 12. Funciones de cálculo base

### measurementCalculations.ts

```ts
export function calculatePerimeter(side1: number, side2: number, subtract = 0): number {
  return ((side1 + side2) * 2) - subtract;
}

export function calculateArea(side1: number, side2: number): number {
  return side1 * side2;
}

export function calculateStandardF47(side1: number, side2: number, spacing: number): number {
  if (!spacing || spacing <= 0) return 0;
  return (side2 / spacing) * side1;
}

export function calculateCorridorF47(side1: number, side2: number, spacing: number): number {
  if (!spacing || spacing <= 0) return 0;
  return (side1 * side2) + ((side2 / spacing) * side1);
}

export function calculateUnits(f47Ml: number, divisor = 3): number {
  if (!divisor || divisor <= 0) return 0;
  return f47Ml / divisor;
}
```

### materialCalculations.ts

```ts
export function calculateDerivedMaterials(totalArea: number) {
  const tirante = totalArea * 2.02;
  const suporteNivelador = tirante;
  const t25 = totalArea * 15;
  const mm = t25 * 0.02;
  const massaKg = totalArea * 0.45;
  const fitaMl = totalArea * 1.4;

  return {
    tirante,
    suporteNivelador,
    t25,
    mm,
    massaKg,
    fitaMl,
  };
}
```

### priceCalculations.ts

```ts
export function calculateMaterialTotal(quantity: number, unitPrice: number): number {
  return quantity * unitPrice;
}

export function calculateGrandTotal(items: { total: number }[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function calculatePricePerSquareMeter(grandTotal: number, totalArea: number): number {
  if (!totalArea || totalArea <= 0) return 0;
  return grandTotal / totalArea;
}
```

---

## 13. Reglas importantes

1. Nunca hardcodear los valores del Excel como datos finales.
2. Las fórmulas deben estar centralizadas en `/lib/calculations`.
3. Cada cálculo debe poder testearse individualmente.
4. La app debe recalcular en tiempo real cuando cambian medidas o precios.
5. El usuario debe poder duplicar un proyecto.
6. El usuario debe poder exportar PDF.
7. Debe existir import/export JSON para guardar backups.
8. Los precios unitarios deben poder cambiarse sin tocar la lógica de cálculo.
9. El cálculo tipo corredor debe ser seleccionable, no automático invisible.
10. El sistema debe avisar cuando una zona no tiene medidas válidas.

---

## 14. MVP recomendado

### Fase 1 — Base funcional

- Crear proyecto.
- Crear zonas.
- Añadir medidas.
- Calcular área, perímetro, F47 y unidades.
- Consolidar materiales.
- Editar precios.
- Ver total general y precio por m².

### Fase 2 — Presupuesto profesional

- Exportar PDF.
- Logo de empresa.
- Datos del cliente.
- Notas comerciales.
- Plantillas de precios.

### Fase 3 — Gestión avanzada

- Historial de proyectos.
- Duplicar presupuesto.
- Comparar versiones.
- Multiusuario.
- Base de datos real.
- Login.

---

## 15. Prompt recomendado para Codex

```md
Actúa como un senior full-stack engineer y product architect.

Quiero construir una webapp llamada GyproCore para JK Gyproc Art. La app debe convertir la lógica del Excel "Copie de Levantamento de Forro.xlsx" en una aplicación moderna para calcular materiales y presupuesto de trabajos de gyproc / falso techo / forro.

Usa React + Vite + TypeScript + Tailwind CSS. Para el MVP usa localStorage y Zustand. No uses backend todavía salvo que sea estrictamente necesario. La app debe ser mobile-first, profesional, rápida y clara.

Implementa el flujo:

1. Dashboard de proyectos.
2. Crear/editar proyecto.
3. Crear zonas o ambientes.
4. Tabla editable de medidas por zona.
5. Cálculo automático de perímetro, área, F47 ml y unidades.
6. Consolidado general de materiales.
7. Tabla editable de precios unitarios.
8. Total general y precio por m².
9. Export/import JSON.
10. Preparar estructura para exportar PDF en una fase posterior.

Fórmulas principales:

- perimeter = ((side1 + side2) * 2) - subtract
- area = side1 * side2
- standardF47 = spacing <= 0 ? 0 : (side2 / spacing) * side1
- corridorF47 = spacing <= 0 ? 0 : (side1 * side2) + ((side2 / spacing) * side1)
- units = f47Ml / divisor
- totalArea = sum(zone areas)
- totalGuides = sum(zone perimeters)
- totalF47 = sum(zone f47)
- tirante = totalArea * 2.02
- suporteNivelador = tirante
- t25 = totalArea * 15
- mm = t25 * 0.02
- massaKg = totalArea * 0.45
- fitaMl = totalArea * 1.4
- t25PurchaseQty = t25 / 1000
- massaPurchaseQty = massaKg / 20
- fitaPurchaseQty = fitaMl / 150
- materialTotal = quantity * unitPrice
- grandTotal = sum(material totals)
- pricePerSquareMeter = grandTotal / totalArea

Importantísimo:

- Centraliza todas las fórmulas en `src/lib/calculations`.
- No mezcles UI con lógica de cálculo.
- Crea tipos TypeScript claros.
- Añade tests unitarios para las fórmulas críticas.
- La UI debe recalcular en tiempo real.
- El usuario debe poder editar precios sin modificar fórmulas.
- Crea datos demo basados en el Excel para validar que el cálculo se parece al resultado actual: área aproximada 602.6802, total aproximado 10076.86 y precio por m² aproximado 16.72.
- Mantén el diseño elegante, oscuro, profesional y usable en móvil.

Entrega:

- Estructura completa del proyecto.
- Componentes principales.
- Stores Zustand.
- Tipos TypeScript.
- Funciones de cálculo.
- Datos demo.
- Validaciones básicas.
- Comandos para ejecutar.
- Explicación breve de archivos creados.
```

---

## 16. Nombre y branding

**Nombre definitivo:** GyproCore  
**Tagline sugerido:** `Calculs précis pour projets Gyproc professionnels.`  
**Alternativa en español:** `Cálculos precisos para proyectos Gyproc profesionales.`  
**Alternativa en portugués:** `Cálculos precisos para projetos de forro e drywall.`

---

## 17. Próxima mejora recomendada

Antes de programar todo, crear primero una pequeña pantalla demo con:

- 1 proyecto.
- 2 zonas.
- 5 líneas de medidas.
- Resumen de materiales.
- Tabla de precios.
- Total final.

Con eso se valida la lógica antes de construir toda la app.
