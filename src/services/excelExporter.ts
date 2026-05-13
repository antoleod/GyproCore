import * as XLSX from "xlsx";
import { Project, Zone } from "../types/project";
import { PricedMaterial, MaterialQuantity } from "../types/material";
import { ProjectTotals, CalculatedZone } from "../types/calculation";

interface ExportData {
  project: Project;
  zones: CalculatedZone[];
  totals: ProjectTotals;
  pricedMaterials: PricedMaterial[];
  grandTotal: number;
  pricePerSquareMeter: number;
}

export function exportProjectToExcel(data: ExportData) {
  const { project, zones, totals, pricedMaterials, grandTotal, pricePerSquareMeter } = data;

  const wb = XLSX.utils.book_new();

  // Sheet 1: Projeto
  const projectData = [
    ["Informações do Projeto"],
    [],
    ["Empresa", project.companyName],
    ["Projeto", project.projectName],
    ["Cliente", project.clientName || "-"],
    ["Endereço", project.address || "-"],
    ["Cidade", project.city || "-"],
    ["Moeda", project.currency],
  ];
  const wsProject = XLSX.utils.aoa_to_sheet(projectData);
  XLSX.utils.book_append_sheet(wb, wsProject, "Projeto");

  // Sheet 2: Zonas
  const zonesData: (string | number)[][] = [
    ["Zona", "Espaçamento", "Coeficiente", "Qtd Pisos", "Área (m²)", "Guias (ml)", "F47 (ml)"],
  ];
  zones.forEach((zone) => {
    zonesData.push([
      zone.zone.name,
      zone.zone.spacing,
      zone.zone.coefficient,
      zone.zone.floorQuantity,
      Number(zone.totalArea.toFixed(2)),
      Number(zone.totalGuides.toFixed(2)),
      Number(zone.totalF47.toFixed(2)),
    ]);
  });
  const wsZones = XLSX.utils.aoa_to_sheet(zonesData);
  XLSX.utils.book_append_sheet(wb, wsZones, "Zonas");

  // Sheet 3: Materiais
  const materialsData: (string | number)[][] = [
    [
      "Material",
      "Unidade Técnica",
      "Quantidade Técnica",
      "Unidade Compra",
      "Quantidade Compra",
      "Preço Unitário",
      "Total",
    ],
  ];
  pricedMaterials.forEach((item) => {
    materialsData.push([
      item.label,
      item.unit,
      Number(item.rawQuantity.toFixed(3)),
      item.purchaseUnit,
      Number(item.purchaseQuantity.toFixed(3)),
      Number(item.unitPrice.toFixed(2)),
      Number(item.total.toFixed(2)),
    ]);
  });
  const wsMaterials = XLSX.utils.aoa_to_sheet(materialsData);
  XLSX.utils.book_append_sheet(wb, wsMaterials, "Materiais");

  // Sheet 4: Resumo
  const summaryData: (string | number | null)[][] = [
    ["RESUMO GERAL"],
    [],
    ["Métrica", "Valor"],
    ["Área Total (m²)", Number(totals.totalArea.toFixed(2))],
    ["Guias (ml)", Number(totals.totalGuides.toFixed(2))],
    ["F47 (ml)", Number(totals.totalF47.toFixed(2))],
    ["Tirante (und)", Number(totals.tirante.toFixed(2))],
    ["Suporte Nivelador (und)", Number(totals.suporteNivelador.toFixed(2))],
    ["T25 (Milheiros)", Number((totals.t25 / 1000).toFixed(3))],
    ["Montante (und)", Number(totals.mm.toFixed(2))],
    ["Massa (Sacos x20kg)", Number((totals.massaKg / 20).toFixed(2))],
    ["Fita (Rollos x150ml)", Number((totals.fitaMl / 150).toFixed(2))],
    [],
    ["CUSTOS"],
    ["Total", Number(grandTotal.toFixed(2))],
    ["Preço/m²", Number(pricePerSquareMeter.toFixed(2))],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Resumo");

  // Configurar ancho de columnas
  wsProject["!cols"] = [{ wch: 20 }, { wch: 30 }];
  wsZones["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
  wsMaterials["!cols"] = [
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];
  wsSummary["!cols"] = [{ wch: 25 }, { wch: 20 }];

  // Descargar
  const fileName = `${project.projectName}-${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
