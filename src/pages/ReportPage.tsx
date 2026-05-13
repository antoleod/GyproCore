import { Download } from "lucide-react";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { formatCurrency, formatNumber } from "../utils/format";

export function ReportPage() {
  const { project, totals, pricedMaterials, grandTotal, pricePerSquareMeter } = useProjectCalculations();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Resumo / Presupuesto</h1>
          <p className="mt-1 text-sm text-slate-400">Preview pronto para evoluir para exportacao PDF.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950">
          <Download size={16} />
          Exportar PDF
        </button>
      </div>

      <section className="rounded-lg bg-white p-5 text-slate-950">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:justify-between">
          <div>
            <p className="text-xl font-semibold">JK Gyproc Art</p>
            <p className="text-sm text-slate-600">{project.city}</p>
          </div>
          <div className="text-sm sm:text-right">
            <p className="font-medium">{project.projectName}</p>
            <p className="text-slate-600">{project.clientName}</p>
            <p className="text-slate-600">{project.address}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div><p className="text-xs uppercase text-slate-500">Area</p><p className="text-lg font-semibold">{formatNumber(totals.totalArea)} m2</p></div>
          <div><p className="text-xs uppercase text-slate-500">Total</p><p className="text-lg font-semibold">{formatCurrency(grandTotal, project.currency)}</p></div>
          <div><p className="text-xs uppercase text-slate-500">Preco/m2</p><p className="text-lg font-semibold">{formatCurrency(pricePerSquareMeter, project.currency)}</p></div>
        </div>

        <table className="mt-5 w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-2">Material</th>
              <th className="py-2 text-right">Qtd.</th>
              <th className="py-2 text-right">Unit.</th>
              <th className="py-2 text-right">Total</th>
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
