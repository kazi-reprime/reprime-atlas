"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import SampleBadge from "@/components/ui/SampleBadge";
import { EXTENDED_PORTFOLIO, REPRIME_FEATURED_DEAL } from "@/lib/reprime-data";

const typeColor: Record<string, string> = {
  MF: "bg-emerald-100 text-emerald-800",
  Off: "bg-slate-100 text-slate-700",
  Ind: "bg-amber-100 text-amber-800",
  Mix: "bg-violet-100 text-violet-800",
  Ret: "bg-rose-100 text-rose-800",
};
const typeLabel: Record<string, string> = { MF: "Multifamily", Off: "Office", Ind: "Industrial", Mix: "Mixed-Use", Ret: "Retail" };
const TYPES = ["MF", "Ind", "Off", "Mix", "Ret"] as const;

export default function PropertiesPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const deals = useMemo(() => filter ? EXTENDED_PORTFOLIO.filter((d) => d.type === filter) : EXTENDED_PORTFOLIO, [filter]);
  const totalAum = EXTENDED_PORTFOLIO.reduce((s, d) => s + parseFloat(d.value.replace(/[^0-9.]/g, "")), 0);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange">Portfolio</div>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Properties under coverage</h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              Reviewed, sourced, or advised across {EXTENDED_PORTFOLIO.length} positions in {new Set(EXTENDED_PORTFOLIO.map((d) => d.meta.split("·")[2]?.trim())).size}+ metros. ${totalAum.toFixed(0)}M aggregate.
            </p>
          </div>
          <SampleBadge />
        </div>

        {/* Featured underwrite */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-paper shadow-sm">
          <div className="grid gap-0 md:grid-cols-3">
            <div className="bg-gradient-to-br from-navy-deep to-navy p-8 text-paper md:col-span-1">
              <div className="text-[10px] uppercase tracking-wider text-orange">Featured underwrite</div>
              <div className="mt-2 font-display text-2xl font-medium">{REPRIME_FEATURED_DEAL.name}</div>
              <div className="mt-1 flex items-center gap-1 text-sm text-paper/70">
                <MapPin size={12} /> {REPRIME_FEATURED_DEAL.address}
              </div>
              <div className="mt-4 text-xs text-paper/80">{REPRIME_FEATURED_DEAL.summary}</div>
              <SampleBadge dark className="mt-4" />
              <div className="mt-8">
                <div className="text-[10px] uppercase tracking-wider text-paper/50">Capital stack</div>
                <div className="mt-2 space-y-2">
                  {REPRIME_FEATURED_DEAL.capital_stack.tranches.map((t) => (
                    <div key={t.name}>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-paper">{t.name}</span>
                        <span className="font-mono text-paper/70">{t.amount}{t.rate ? ` @ ${t.rate}` : ""}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded bg-paper/10">
                        <div className="h-full bg-orange" style={{ width: `${t.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right font-mono text-sm text-gold-soft">Total {REPRIME_FEATURED_DEAL.capital_stack.total}</div>
              </div>
            </div>
            <div className="p-8 md:col-span-2">
              <div className="grid grid-cols-3 gap-px bg-border md:grid-cols-6">
                {REPRIME_FEATURED_DEAL.metrics.map((m) => (
                  <div key={m.label} className="bg-paper p-4">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">{m.label}</div>
                    <div className="mt-1 font-display text-xl font-medium text-ink">{m.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-wider text-slate-500">Tenant roster</div>
                <div className="mt-3 overflow-hidden rounded border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-left text-[10px] uppercase tracking-wider text-slate-500">
                        <th className="px-3 py-2">Tenant</th>
                        <th className="px-3 py-2">Units</th>
                        <th className="px-3 py-2">Avg rent</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REPRIME_FEATURED_DEAL.tenants.map((t) => (
                        <tr key={t.name} className="border-t border-border">
                          <td className="px-3 py-2 text-ink">{t.name}</td>
                          <td className="px-3 py-2 font-mono text-slate-700">{t.units}</td>
                          <td className="px-3 py-2 font-mono text-slate-700">{t.rent}</td>
                          <td className={`px-3 py-2 font-mono text-xs ${t.status === "Vacant" ? "text-rose-600" : "text-emerald-600"}`}>{t.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-slate-500">Filter:</span>
          <button
            onClick={() => setFilter(null)}
            className={`rounded-full px-3 py-1 text-xs transition ${filter === null ? "bg-ink text-paper" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            All · {EXTENDED_PORTFOLIO.length}
          </button>
          {TYPES.map((t) => {
            const c = EXTENDED_PORTFOLIO.filter((d) => d.type === t).length;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-3 py-1 text-xs transition ${filter === t ? "bg-ink text-paper" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {typeLabel[t]} · {c}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {deals.map((d) => (
            <div key={d.name} className="group bg-paper p-6 transition hover:bg-slate-100/60">
              <div className="flex items-center justify-between">
                <span className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${typeColor[d.type]}`}>{typeLabel[d.type]}</span>
                <span className="font-mono text-xs text-slate-500">{d.cap}</span>
              </div>
              <div className="mt-4 font-display text-xl font-medium text-ink">{d.name}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin size={11} /> {d.meta}</div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div><div className="text-[9px] uppercase tracking-wider text-slate-500">Value</div><div className="mt-0.5 font-mono text-sm text-orange">{d.value}</div></div>
                <div><div className="text-[9px] uppercase tracking-wider text-slate-500">NOI</div><div className="mt-0.5 font-mono text-sm text-ink">{d.noi}</div></div>
                <div><div className="text-[9px] uppercase tracking-wider text-slate-500">DSCR</div><div className="mt-0.5 font-mono text-sm text-ink">{d.dscr}</div></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-slate-100/50 p-6">
          <p className="text-sm text-slate-700">
            Diligence-tier deals surface here automatically once they clear the threshold. Live wiring connects to the RePrime deal-management system via a v2 API.{" "}
            <Link href="/contact" className="text-orange hover:underline">Request access <ArrowRight size={12} className="inline" /></Link>
          </p>
        </div>
      </div>
    </section>
  );
}
