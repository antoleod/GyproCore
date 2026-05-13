import { StatCard } from "../components/ui/StatCard";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { useProjectStore } from "../stores/projectStore";
import { formatCurrency, formatNumber } from "../utils/format";

export function PricingPage() {
  const { project, pricedMaterials, grandTotal, pricePerSquareMeter } = useProjectCalculations();
  const updatePrice = useProjectStore((state) => state.updatePrice);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Precos</h1>
        <p className="mt-1 text-sm text-slate-400">Ajuste precos unitarios sem alterar a logica de calculo.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Total geral" value={formatCurrency(grandTotal, project.currency)} />
        <StatCard label="Preco por m2" value={formatCurrency(pricePerSquareMeter, project.currency)} />
      </div>

      <section className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.04]">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="bg-slate-900 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Material</th>
              <th className="px-4 py-3">Unidade compra</th>
              <th className="px-4 py-3 text-right">Qtd.</th>
              <th className="px-4 py-3 text-right">Preco unit.</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {pricedMaterials.map((item) => (
              <tr key={item.key}>
                <td className="px-4 py-3 font-medium text-white">{item.label}</td>
                <td className="px-4 py-3 text-slate-400">{item.purchaseUnit}</td>
                <td className="px-4 py-3 text-right text-slate-200">{formatNumber(item.purchaseQuantity)}</td>
                <td className="px-4 py-3 text-right">
                  <input
                    className="field ml-auto w-24 text-right"
                    type="number"
                    value={item.unitPrice}
                    onChange={(event) => updatePrice(item.key, Number.parseFloat(event.target.value) || 0)}
                  />
                </td>
                <td className="px-4 py-3 text-right font-medium text-white">{formatCurrency(item.total, project.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
