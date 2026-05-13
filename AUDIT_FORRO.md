# Audit - Levantamento de Forro

**Fecha del Audit:** 13 de Mayo, 2026  
**Archivo:** `Copie de Levantamento de Forro.xlsx`  
**Estado General:** ⚠️ Crítico - Necesita reestructuración

---

## 📊 Resumen Ejecutivo

El archivo Excel contiene un levantamiento de materiales para un proyecto de construcción (forros/drywall) de la **Antares Engenharia**. La estructura es **problemática** para procesamiento automatizado:

- ✅ **12 hojas** con datos de proyectos
- ✅ **233 filas** totales de datos
- ❌ **Estructura inconsistente** - columnas genéricas (`__EMPTY`, `__EMPTY_1`, etc.)
- ❌ **Headers mezclados** con datos en Tab1-Tab9
- ❌ **No apto** para consumo directo por aplicación

---

## 🔍 Análisis Detallado por Hoja

### 1. **Tab Geral** - Información General ✓
**Estado:** Bueno  
**Propósito:** Datos maestros del proyecto

| Campo | Valor |
|-------|-------|
| Empresa | Antares Engenharia Ltda |
| Obra | Comfort Tag Flat |
| Endereço | Setor Hoteleiro - Projeção D |
| Cidade | Taguatinga / DF |

**Observaciones:**
- Estructura clave-valor funcional
- Contiene metadatos del proyecto
- Debe servir como referencia para todas las demás hojas

---

### 2. **Tab1-Tab9** - Levantamiento por Ubicación ❌
**Estado:** Crítico  
**Propósito:** Datos de materiales por ubicación/área

**Problemas Identificados:**

#### a) Nombres de Columnas Inválidos
```
__EMPTY       → Etiqueta (Emp., Obr., Loc., etc.)
__EMPTY_1     → Valor
__EMPTY_4     → Parámetro (Espçto, Coef., Qtd. Pav.)
__EMPTY_5     → Valor numérico
__EMPTY_8     → Descripción (Pav., Guías)
__EMPTY_9     → Total
```

#### b) Estructura de Datos Inconsistente

**Patrón actual (Tab1 como ejemplo):**
```
Emp.:          | Antares Engenharia Ltda
Obr.:          | comfort Tag Flat
Loc.:          | Park Way
Espçto         | 0.48
Coef.          | 0
Qtd. Pav.      | 1
```

**Problema:** Headers y datos mezclados en columnas genéricas.

#### c) Tipos de Datos Mixtos
- Columnas que contienen `string` y `number`
- Ejemplo: `__EMPTY` tiene "Emp.:" (string) y luego números (number)
- Dificulta validación y procesamiento

#### d) Estadísticas por Hoja
| Hoja | Filas | Observación |
|------|-------|------------|
| Tab1 | 31 | Comfort Tag Flat - Park Way |
| Tab2 | 57 | Comfort Tag Flat - Corpo de Bombeiros |
| Tab3 | 10 | Comfort Tag Flat - 1 ao 8 pav apts 9,10,11 |
| Tab4 | 11 | Comfort Tag Flat - 9 pav apts 1,2,16,17 |
| Tab5 | 11 | Comfort Tag Flat - 9 pav aptos 3,4,12 |
| Tab6 | 10 | Comfort Tag Flat - 9 pav aptos 5a10,13a15 |
| Tab7 | 11 | Comfort Tag Flat - 9 pav aptos 11 |
| Tab8 | 23 | Comfort Tag Flat - Corredor |
| Tab9 | 23 | Comfort Tag Flat - Corredor |

---

### 3. **Tab10** - Proyecto Adicional ⚠️
**Estado:** Incompleto  
**Propósito:** Segundo proyecto (Via Empreendimentos / Corpo de Bombeiros)

**Problemas:**
- Misma estructura problemática de Tab1-Tab9
- Empresa diferente pero sin hoja "Geral" asociada
- Posible error de consolidación

---

### 4. **Preço** - Tabla de Precios ✓
**Estado:** Aceptable  
**Propósito:** Precios unitarios y cantidades totales

**Estructura:**
```
TOTAL M²: 602.68
Quat. Metro (Cantidades):
  - Chapa: 602.68 m²
  - Guia: 550.12 ml
  - F47: 1,457.52 ml
  - Tirante: 1,217.41 und
  - Sp. Niv.: 1,217.41 und
  - T25: 9.04 und
  - MM: 180.80 und
  - Massa: 13.56 kg
  - Fita: 5.63 ml

R$ Unit. (Preços):
  - Chapa: R$ 7.60
  - Guia: R$ 1.54
  - F47: R$ 1.61
  - ...
```

**Observaciones:**
- Headers claros y consistentes
- Datos numéricos limpios
- Listo para consumo directo

---

## 🚨 Problemas Críticos

| Prioridad | Problema | Impacto | Solución |
|-----------|----------|--------|----------|
| 🔴 CRÍTICO | Nombres de columnas genéricos | Imposible procesar automáticamente | Reestructurar con headers claros |
| 🔴 CRÍTICO | Headers mezclados con datos | No se puede hacer parsing | Separar headers de datos |
| 🟠 ALTO | Tipos de datos mixtos | Validación fallará | Normalizar tipos de datos |
| 🟠 ALTO | Tab10 sin metadatos | Origen de datos desconocido | Crear hoja Geral para Tab10 |
| 🟡 MEDIO | Ubicaciones sin ID único | Dificulta relacionamiento | Agregar ID_LOCATION |
| 🟡 MEDIO | Espacios en blanco inconsistentes | Parsing manual requerido | Limpiar datos |

---

## 📋 Estructura Recomendada para la Webapp

### Normalización Propuesta

#### 1. **Tabla: projects** (de Tab Geral)
```json
{
  "id": "uuid",
  "company": "Antares Engenharia Ltda",
  "project_name": "Comfort Tag Flat",
  "address": "Setor Hoteleiro - Projeção D",
  "city": "Taguatinga / DF",
  "created_at": "ISO 8601",
  "updated_at": "ISO 8601"
}
```

#### 2. **Tabla: locations** (de Tab1-Tab10)
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "location_name": "Park Way",
  "spacing": 0.48,
  "coefficient": 0,
  "floors": 1,
  "total_area": 241.57,
  "total_guides": 311.82,
  "created_at": "ISO 8601"
}
```

#### 3. **Tabla: materials** (de Preço)
```json
{
  "id": "uuid",
  "material_code": "CHAPA",
  "material_name": "Chapa",
  "unit": "m²",
  "unit_price": 7.60,
  "quantity": 602.68,
  "subtotal": 4580.37
}
```

#### 4. **Tabla: material_assignments** (relacional)
```json
{
  "id": "uuid",
  "location_id": "uuid",
  "material_id": "uuid",
  "quantity_required": 45.2,
  "waste_factor": 1.1,
  "total_quantity": 49.72
}
```

---

## 💡 Recomendaciones

### Inmediatas (Sprint 1)
1. ✅ Crear estructura normalizada en base de datos
2. ✅ Parser robusto para Excel actual
3. ✅ Validación de datos en importación
4. ✅ Interfaz mobile-first para edición

### Corto Plazo (Sprint 2)
1. ✅ Exportar a Excel con estructura mejorada
2. ✅ Dashboard de análisis de costos
3. ✅ Historial de cambios
4. ✅ Reportes PDF

### Mediano Plazo
1. 🔄 Integración con ERP
2. 🔄 Control de compras
3. 🔄 Seguimiento de costos vs presupuesto

---

## 🎯 Casos de Uso Identificados

### 1. **Importación y Validación**
- Cargar Excel existente
- Validar estructura y datos
- Mostrar errores/warnings
- Confirmar importación

### 2. **Consulta de Levantamientos**
- Listar todos los proyectos
- Ver detalles de cada ubicación
- Consultar materiales por ubicación
- Calcular totales

### 3. **Edición de Datos**
- Modificar espaciamiento
- Ajustar coeficientes
- Actualizar precios
- Agregar nuevas ubicaciones

### 4. **Exportación**
- Excel con estructura limpia
- PDF con reportes
- CSV para integración
- JSON para API

---

## 📱 Requisitos para la Webapp

- **Framework:** React + TypeScript
- **Estilos:** Tailwind CSS
- **Estado:** Zustand
- **Routing:** React Router
- **Formularios:** React Hook Form
- **Excel:** XLSX library
- **Responsive:** Mobile-first design
- **Exportación:** XLSX + PDF

---

## 🔄 Próximos Pasos

1. [ ] Crear estructura de BD (TypeScript interfaces)
2. [ ] Implementar parser robusto
3. [ ] Diseñar componentes móviles
4. [ ] Crear flujo de importación
5. [ ] Desarrollar vista de datos
6. [ ] Implementar exportación a Excel
7. [ ] Testing e2e de importación/exportación

