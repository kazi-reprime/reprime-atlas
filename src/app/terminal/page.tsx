"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import TerminalTabs, { type TabKey } from "@/components/terminal/TerminalTabs";
import BloombergTicker from "@/components/ticker/BloombergTicker";
import TreasuryCurve from "@/components/charts/TreasuryCurve";
import SpreadHistory from "@/components/charts/SpreadHistory";
import LiveHealthDots from "@/components/signals/LiveHealthDots";
import CompositionDonuts from "@/components/charts/CompositionDonuts";
import SampleBadge from "@/components/ui/SampleBadge";
import { REPRIME_FEATURED_DEAL, REPRIME_PORTFOLIO, REPRIME_STATS } from "@/lib/reprime-data";

const PipelineKanban3D = dynamic(() => import("@/components/pipeline/PipelineKanban3D"), { ssr: false, loading: () => <div className="h-[420px] w-full bg-navy" /> });
const RiskSurface3D = dynamic(() => import("@/components/risk/RiskSurface3D"), { ssr: false, loading: () => <div className="h-[420px] w-full bg-navy" /> });
const PropertyHeatmap = dynamic(() => import("@/components/heatmap/PropertyHeatmap"), { ssr: false });

export default function TerminalPage() {
  const [tab, setTab] = useState<TabKey>("overview");
  return (
    <section className="bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Terminal</div>
              <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Investor terminal</h1>
              <p className="mt-3 max-w-2xl text-paper/70">
                Single-canvas view of pipeline, capital, market, and risk surfaces. Hash-routed tabs (<span className="font-mono text-paper/85">#t=capital</span>) for shareable deep links.
              </p>
            </div>
            <LiveHealthDots />
          </div>

          <div className="mt-8 rounded-lg border border-paper/10 bg-navy-deep/70 backdrop-blur">
            <TerminalTabs active={tab} onChange={setTab} />
            <div className="p-6">
              {tab === "overview" && <Overview />}
              {tab === "pipeline" && <PipelinePanel />}
              {tab === "capital" && <CapitalPanel />}
              {tab === "market" && <MarketPanel />}
              {tab === "risk" && <RiskPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function Overview() {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <BloombergTicker />
          <div className="grid gap-4 sm:grid-cols-4">
            <Kpi label="Live sources" value={REPRIME_STATS.live_search_layers.toString()} />
            <Kpi label="Catalog" value={REPRIME_STATS.cataloged_sources.toLocaleString()} />
            <Kpi label="Portfolio" value={REPRIME_PORTFOLIO.total_label} />
            <Kpi label="Active deals" value={REPRIME_PORTFOLIO.deals.length.toString()} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg border border-paper/10 bg-navy-deep/60 p-5">
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] uppercase tracking-wider text-orange">Featured underwrite</div>
              <SampleBadge dark />
            </div>
            <div className="mt-2 font-display text-xl font-medium text-paper">{REPRIME_FEATURED_DEAL.name}</div>
            <div className="mt-0.5 font-mono text-[10px] text-paper/50">{REPRIME_FEATURED_DEAL.address}</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {REPRIME_FEATURED_DEAL.metrics.slice(0, 6).map((m) => (
                <div key={m.label} className="rounded border border-paper/10 bg-paper/5 p-2">
                  <div className="text-[9px] uppercase tracking-wider text-paper/40">{m.label}</div>
                  <div className="mt-0.5 font-mono text-sm text-paper">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function PipelinePanel() {
    return (
      <div className="space-y-5">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-wider text-orange">3D pipeline kanban</div>
          <SampleBadge dark />
        </div>
        <div className="h-[480px] overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
          <PipelineKanban3D />
        </div>
      </div>
    );
  }
  function CapitalPanel() {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-paper p-5">
          <div className="flex items-baseline justify-between">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Treasury curve</div>
            <SampleBadge />
          </div>
          <TreasuryCurve />
        </div>
        <div className="rounded-lg border border-border bg-paper p-5">
          <div className="flex items-baseline justify-between">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">CRE credit spreads (bp)</div>
            <SampleBadge />
          </div>
          <SpreadHistory />
        </div>
        <CompositionDonuts />
      </div>
    );
  }
  function MarketPanel() {
    return (
      <div className="space-y-5">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-wider text-orange">25-market heatmap</div>
          <SampleBadge dark />
        </div>
        <PropertyHeatmap />
      </div>
    );
  }
  function RiskPanel() {
    return (
      <div className="space-y-5">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-wider text-orange">Climate risk surface</div>
          <SampleBadge dark />
        </div>
        <div className="h-[480px] overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
          <RiskSurface3D mode="climate" />
        </div>
      </div>
    );
  }
  function Kpi({ label, value }: { label: string; value: string }) {
    return (
      <div className="rounded-lg border border-paper/10 bg-paper/5 p-4">
        <div className="text-[10px] uppercase tracking-wider text-paper/50">{label}</div>
        <div className="mt-1 font-display text-2xl font-medium text-gold-soft">{value}</div>
      </div>
    );
  }
}
