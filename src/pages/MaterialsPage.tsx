import { StatCard } from "../components/ui/StatCard";
import { useT } from "../hooks/useT";
import { useProjectCalculations } from "../hooks/useProjectCalculations";
import { formatNumber } from "../utils/format";

export function MaterialsPage() {
  const t = useT();
  const { totals, quantities } = useProjectCalculations();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">{t.materials_heading}</h1>
        <p className="mt-1 text-sm text-slate-400">{t.materials_subtitle}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label={t.materials_stat_area} value={`${formatNumber(totals.totalArea)} m2`} />
        <StatCard label={t.materials_stat_guides} value={`${formatNumber(totals.totalGuides)} ml`} />
        <StatCard label={t.materials_stat_f47} value={`${formatNumber(totals.totalF47)} ml`} />
      </div>

      <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">{t.materials_table_material}</th>
              <th className="px-4 py-3">{t.materials_table_unit}</th>
              <th className="px-4 py-3 text-right">{t.materials_table_techQty}</th>
              <th className="px-4 py-3 text-right">{t.materials_table_purchase}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {quantities.map((item) => (
              <tr key={item.key}>
                <td className="px-4 py-3 font-medium text-white">{item.label}</td>
                <td className="px-4 py-3 text-slate-400">{item.unit}</td>
                <td className="px-4 py-3 text-right text-slate-200">{formatNumber(item.rawQuantity)}</td>
                <td className="px-4 py-3 text-right text-slate-200">
                  {formatNumber(item.purchaseQuantity)} {item.purchaseUnit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
