import SectorTreemap from "@/components/heatmap/SectorTreemap";
import TreasuryCurve from "@/components/charts/TreasuryCurve";
import SpreadHistory from "@/components/charts/SpreadHistory";
import SampleBadge from "@/components/ui/SampleBadge";
import { SECTORS } from "@/lib/sample-data";

export const metadata = { title: "Markets heatmap" };

export default function MarketsPage() {
  const leaders = [...SECTORS].sort((a, b) => b.change - a.change);
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange">Module B</div>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Markets heatmap</h1>
            <p className="mt-4 max-w-2xl text-slate-700">
              CRE sectors sized by representative market cap, colored by 30-day move. Hover any tile for the constituent REITs that feed it. Live wiring to Finnhub / Alpha Vantage via the data platform&apos;s <span className="font-mono">source_data</span> table.
            </p>
          </div>
          <SampleBadge />
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-paper">
          <SectorTreemap />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-paper p-6">
            <div className="text-xs uppercase tracking-wider text-slate-500">Leaders / laggards</div>
            <ul className="mt-3 space-y-2">
              {leaders.map((s) => (
                <li key={s.name} className="flex items-center justify-between text-sm">
                  <span className="text-ink">{s.name}</span>
                  <span className={`font-mono ${s.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>{s.change > 0 ? "+" : ""}{s.change.toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-paper p-6 md:col-span-2">
            <div className="flex items-baseline justify-between">
              <div className="text-xs uppercase tracking-wider text-slate-500">US Treasury curve</div>
              <SampleBadge />
            </div>
            <TreasuryCurve />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-paper p-6">
          <div className="flex items-baseline justify-between">
            <div className="text-xs uppercase tracking-wider text-slate-500">CRE credit spreads (bp)</div>
            <SampleBadge />
          </div>
          <SpreadHistory />
        </div>
      </div>
    </section>
  );
}
