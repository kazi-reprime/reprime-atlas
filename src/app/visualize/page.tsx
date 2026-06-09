"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import HeroGlobe from "@/components/globe/HeroGlobe";
import CapitalFlowField from "@/components/flow/CapitalFlowField";
import MetroSkyline, { type Metric } from "@/components/skyline/MetroSkyline";
import SampleBadge from "@/components/ui/SampleBadge";
import { METRIC_LABELS, METROS } from "@/lib/sample-data";
import { EXTENDED_PORTFOLIO, REPRIME_FEATURED_DEAL } from "@/lib/reprime-data";

const typeColor: Record<string, string> = { MF: "bg-emerald-100 text-emerald-800", Off: "bg-slate-100 text-slate-700", Ind: "bg-amber-100 text-amber-800", Mix: "bg-violet-100 text-violet-800", Ret: "bg-rose-100 text-rose-800" };
const typeLabel: Record<string, string> = { MF: "Multifamily", Off: "Office", Ind: "Industrial", Mix: "Mixed-Use", Ret: "Retail" };

export default function VisualizePage() {
  const [metric, setMetric] = useState<Metric>("vacancy");
  const totalAum = EXTENDED_PORTFOLIO.reduce((s, d) => s + parseFloat(d.value.replace(/[^0-9.]/g, "")), 0);

  return (
    <>
      {/* Section 1: Globe hero */}
      <section id="globe" className="relative h-[88vh] overflow-hidden bg-navy-deep text-paper">
        <div className="absolute inset-0"><HeroGlobe interactive /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/10 via-navy-deep/30 to-navy-deep pointer-events-none" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
          <div className="text-xs uppercase tracking-wider text-orange">Section 01 · Globe</div>
          <h1 className="mt-2 font-display text-6xl font-medium leading-[1.05] tracking-tight">Capital flow globe.</h1>
          <p className="mt-3 max-w-2xl text-paper/70">Real Earth geography, 15 capital hubs with floating labels, animated arcs between major metros, orbiting RePrime logo.</p>
          <SampleBadge dark className="mt-3 w-fit" />
        </div>
      </section>

      {/* Section 2: Flow field */}
      <section id="flow" className="relative h-[80vh] overflow-hidden bg-navy-deep text-paper">
        <div className="absolute inset-0"><CapitalFlowField /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent pointer-events-none" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-20">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange">Section 02 · Flow field</div>
            <h2 className="mt-2 font-display text-5xl font-medium tracking-tight">Where capital wants to go.</h2>
            <p className="mt-3 max-w-xl text-paper/70">900 particles streaming toward 13 US capital hubs. Speed → orange, slack → gold. Earth-Nullschool / Windy inspired.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Metros */}
      <section id="metros" className="relative bg-navy-deep text-paper">
        <div className="bg-grid-dark"><div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Section 03 · Metros</div>
              <h2 className="mt-2 font-display text-5xl font-medium tracking-tight">Metro skyline.</h2>
              <p className="mt-3 max-w-2xl text-paper/70">{METROS.length} US metros as 3D extruded bars over Albers projection. Switch metric → terrain re-extrudes.</p>
            </div>
            <SampleBadge dark />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(METRIC_LABELS) as Metric[]).map(k => (
              <button key={k} onClick={() => setMetric(k)} className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition ${metric===k ? "border-orange bg-orange text-navy-deep" : "border-paper/20 bg-paper/5 text-paper/70 hover:bg-paper/10"}`}>{METRIC_LABELS[k]}</button>
            ))}
          </div>
          <div className="mt-6 h-[520px] w-full overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
            <MetroSkyline metric={metric} />
          </div>
        </div></div>
      </section>

      {/* Section 4: Properties */}
      <section id="properties" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Section 04 · Properties</div>
              <h2 className="mt-2 font-display text-5xl font-medium tracking-tight">Properties under coverage.</h2>
              <p className="mt-3 max-w-2xl text-slate-700">{EXTENDED_PORTFOLIO.length} positions, ${totalAum.toFixed(0)}M aggregate. Featured underwrite: {REPRIME_FEATURED_DEAL.name}.</p>
            </div>
            <SampleBadge />
          </div>

          {/* Featured underwrite */}
          <div className="mt-10 grid gap-0 overflow-hidden rounded-2xl border border-border bg-paper md:grid-cols-3">
            <div className="bg-gradient-to-br from-navy-deep to-navy p-8 text-paper md:col-span-1">
              <div className="text-[10px] uppercase tracking-wider text-orange">Featured underwrite</div>
              <div className="mt-2 font-display text-2xl font-medium">{REPRIME_FEATURED_DEAL.name}</div>
              <div className="mt-1 flex items-center gap-1 text-sm text-paper/70"><MapPin size={12} /> {REPRIME_FEATURED_DEAL.address}</div>
              <SampleBadge dark className="mt-4" />
              <div className="mt-8 space-y-2">
                {REPRIME_FEATURED_DEAL.capital_stack.tranches.map(t => (
                  <div key={t.name}>
                    <div className="flex items-baseline justify-between text-xs"><span className="text-paper">{t.name}</span><span className="font-mono text-paper/70">{t.amount}{t.rate ? ` @ ${t.rate}` : ""}</span></div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded bg-paper/10"><div className="h-full bg-orange" style={{ width: `${t.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 md:col-span-2">
              <div className="grid grid-cols-3 gap-px bg-border md:grid-cols-6">
                {REPRIME_FEATURED_DEAL.metrics.map(m => (
                  <div key={m.label} className="bg-paper p-4">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">{m.label}</div>
                    <div className="mt-1 font-display text-xl font-medium text-ink">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 20-deal grid */}
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {EXTENDED_PORTFOLIO.map(d => (
              <div key={d.name} className="bg-paper p-6 transition hover:bg-slate-100/60">
                <div className="flex items-center justify-between">
                  <span className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${typeColor[d.type]}`}>{typeLabel[d.type]}</span>
                  <span className="font-mono text-xs text-slate-500">{d.cap}</span>
                </div>
                <div className="mt-4 font-display text-xl font-medium text-ink">{d.name}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin size={11} /> {d.meta}</div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                  <div><div className="text-[9px] uppercase tracking-wider text-slate-500">Value</div><div className="font-mono text-orange">{d.value}</div></div>
                  <div><div className="text-[9px] uppercase tracking-wider text-slate-500">NOI</div><div className="font-mono">{d.noi}</div></div>
                  <div><div className="text-[9px] uppercase tracking-wider text-slate-500">DSCR</div><div className="font-mono">{d.dscr}</div></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between rounded-lg border border-border bg-slate-100/50 p-6">
            <p className="text-sm text-slate-700">Diligence-tier deals surface here automatically once they clear the threshold.</p>
            <Link href="/info#contact" className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-navy-deep transition hover:bg-orange-soft">Request access <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
