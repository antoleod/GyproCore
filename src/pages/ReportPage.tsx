import { Download } from "lucide-react";
import { useT } from "../hooks/useT";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { formatCurrency, formatNumber } from "../utils/format";
import { exportProjectToExcel } from "../services/excelExporter";

export function ReportPage() {
  const t = useT();
  const { project, zones, totals, pricedMaterials, grandTotal, pricePerSquareMeter } = useProjectCalculations();

  const handleExportExcel = () => {
    exportProjectToExcel({
      project,
      zones,
      totals,
      pricedMaterials,
      grandTotal,
      pricePerSquareMeter,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">{t.report_heading}</h1>
          <p className="mt-1 text-sm text-slate-400">{t.report_subtitle}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button onClick={handleExportExcel} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            <Download size={16} />
            {t.report_btn_excel}
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-600">
            <Download size={16} />
            {t.report_btn_pdf}
          </button>
        </div>
      </div>

      <section className="rounded-lg bg-white p-5 text-slate-950">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:justify-between">
          <div>
            <p className="text-xl font-semibold">{t.report_companyName}</p>
            <p className="text-sm text-slate-600">{project.city}</p>
          </div>
          <div className="text-sm sm:text-right">
            <p className="font-medium">{project.projectName}</p>
            <p className="text-slate-600">{project.clientName}</p>
            <p className="text-slate-600">{project.address}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div><p className="text-xs uppercase text-slate-500">{t.report_stat_area}</p><p className="text-lg font-semibold">{formatNumber(totals.totalArea)} m2</p></div>
          <div><p className="text-xs uppercase text-slate-500">{t.report_stat_total}</p><p className="text-lg font-semibold">{formatCurrency(grandTotal, project.currency)}</p></div>
          <div><p className="text-xs uppercase text-slate-500">{t.report_stat_priceM2}</p><p className="text-lg font-semibold">{formatCurrency(pricePerSquareMeter, project.currency)}</p></div>
        </div>

        <table className="mt-5 w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-2">{t.report_table_material}</th>
              <th className="py-2 text-right">{t.report_table_qty}</th>
              <th className="py-2 text-right">{t.report_table_unit}</th>
              <th className="py-2 text-right">{t.report_table_total}</th>
            </tr>
          </thead>
          <tbody>
            {pricedMaterials.map((item) => (
              <tr key={item.key} className="border-b border-slate-100">
                <td className="py-2">{item.label}</td>
                <td className="py-2 text-right">{formatNumber(item.purchaseQuantity)} {item.purchaseUnit}</td>
                <td className="py-2 text-right">{formatCurrency(item.unitPrice, project.currency)}</td>
                <td className="py-2 text-right font-medium">{formatCurrency(item.total, project.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
