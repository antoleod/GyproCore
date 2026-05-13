import { useMemo } from "react";
import { calculateMaterialQuantities, calculateGrandTotal, calculatePricePerSquareMeter, priceMaterials } from "../engine/materialCalculations";
import { calculateProjectTotals, calculateZone } from "../engine/projectCalculations";
import { useProjectStore } from "../stores/projectStore";

export function useProjectCalculations() {
  const { activeProjectId, projects, zones, measurements, prices } = useProjectStore();

  return useMemo(() => {
    const project = projects.find((item) => item.id === activeProjectId) ?? projects[0];
    const projectZones = zones.filter((zone) => zone.projectId === project?.id);
    const calculatedZones = projectZones.map((zone) => calculateZone(zone, measurements));
    const totals = calculateProjectTotals(calculatedZones);
    const quantities = calculateMaterialQuantities(totals);
    const pricedMaterials = priceMaterials(quantities, prices);
    const grandTotal = calculateGrandTotal(pricedMaterials);
    const pricePerSquareMeter = calculatePricePerSquareMeter(grandTotal, totals.totalArea);

    return {
      project,
      zones: calculatedZones,
      totals,
      quantities,
      pricedMaterials,
      grandTotal,
      pricePerSquareMeter,
    };
  }, [activeProjectId, projects, zones, measurements, prices]);
}
