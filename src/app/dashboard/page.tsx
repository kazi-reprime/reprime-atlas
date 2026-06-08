import BloombergTicker from "@/components/ticker/BloombergTicker";
import TreasuryCurve from "@/components/charts/TreasuryCurve";
import SpreadHistory from "@/components/charts/SpreadHistory";
import CompositionDonuts from "@/components/charts/CompositionDonuts";
import LiveHealthDots from "@/components/signals/LiveHealthDots";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import HeroGlobe from "@/components/globe/HeroGlobe";
import SampleBadge from "@/components/ui/SampleBadge";
import { REPRIME_STATS, REPRIME_PORTFOLIO } from "@/lib/reprime-data";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <section className="bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Command center</div>
              <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Executive dashboard</h1>
              <p className="mt-3 max-w-2xl text-paper/70">
                Live system status, capital markets, deal feed, and portfolio composition on one canvas. Refreshes per-component.
              </p>
            </div>
            <LiveHealthDots />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="h-[360px] overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
                <HeroGlobe interactive />
              </div>
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
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <KpiTile label="Live sources" value={REPRIME_STATS.live_search_layers.toString()} sub="govt + market" />
                <KpiTile label="Catalog" value={REPRIME_STATS.cataloged_sources.toLocaleString()} sub={`across ${REPRIME_STATS.category_count} categories`} />
                <KpiTile label="Portfolio" value={REPRIME_PORTFOLIO.total_label} sub={`${REPRIME_PORTFOLIO.deals.length} positions`} />
                <KpiTile label="Free-tier" value={REPRIME_STATS.by_tier.free.toLocaleString()} sub="no key required" />
              </div>
              <BloombergTicker />
              <CompositionDonuts />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  const numMatch = value.match(/^([0-9,.]+)(.*)$/);
  const numericPart = numMatch ? parseFloat(numMatch[1].replace(/,/g, "")) : null;
  const suffix = numMatch ? numMatch[2] : "";
  return (
    <div className="rounded-lg border border-paper/10 bg-paper/5 p-4">
      <div className="text-[10px] uppercase tracking-wider text-paper/50">{label}</div>
      <div className="mt-1 font-display text-3xl font-medium text-gold-soft">
        {numericPart !== null ? <AnimatedCounter to={numericPart} suffix={suffix} /> : value}
      </div>
      <div className="mt-0.5 text-[10px] text-paper/50">{sub}</div>
    </div>
  );
}
