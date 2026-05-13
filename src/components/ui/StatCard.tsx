import type { ReactNode } from "react";

export function StatCard({ label, value, detail }: { label: string; value: ReactNode; detail?: string }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-slate-950/20">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {detail ? <p className="mt-1 text-sm text-slate-400">{detail}</p> : null}
    </section>
  );
}
