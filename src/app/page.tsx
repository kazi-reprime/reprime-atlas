import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, Database, Globe2, Layers, Sparkles } from "lucide-react";
import HeroGlobe from "@/components/globe/HeroGlobe";
import MiniGlobe from "@/components/globe/MiniGlobe";
import DepthMap3D from "@/components/depth/DepthMap3D";
import AnimatedKpiCard from "@/components/kpi/AnimatedKpiCard";
import LiveNumberStream from "@/components/kpi/LiveNumberStream";
import FloatingOverlay from "@/components/animation/FloatingOverlay";
import BloombergTicker from "@/components/ticker/BloombergTicker";
import ChordCapitalFlow from "@/components/charts/ChordCapitalFlow";
import SampleBadge from "@/components/ui/SampleBadge";
import { fetchLiveStats } from "@/lib/supabase-queries";
import { REPRIME_FEATURED_DEAL, REPRIME_PORTFOLIO } from "@/lib/reprime-data";
import { fmtUSD } from "@/lib/utils";

const CAPABILITIES = [
  { icon: Globe2,   title: "Capital flow",   href: "/visualize#globe",  body: "Animated arcs + particle streams across 15 hubs. 16 active deal corridors." },
  { icon: Activity, title: "Market signals", href: "/terminal#t=markets", body: "Sector treemap + 25-market heatmap + Treasury curve + spreads + donuts." },
  { icon: Database, title: "Source ops",     href: "/terminal#t=signals", body: "22 live endpoints + 1,155-source catalog with source-flow Sankey." },
  { icon: Layers,   title: "Metro depth",    href: "/visualize#metros",  body: "25 US metros, 3D extruded skyline, 4-metric switcher." },
];

export default async function Home() {
  const stats = await fetchLiveStats();
  return (
    <>
      {/* HERO — Globe + floating overlays */}
      <section className="relative h-[min(94vh,900px)] overflow-hidden bg-navy-deep text-paper">
        <div className="absolute inset-0"><HeroGlobe /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/0 via-navy-deep/20 to-navy-deep pointer-events-none" />
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

        {/* floating glass overlays */}
        <FloatingOverlay delay={0.2} className="pointer-events-none absolute left-6 top-24 hidden w-56 md:block">
          <div className="rounded-2xl glass-gold p-4 backdrop-blur-md">
            <div className="text-[10px] uppercase tracking-widest text-paper/70">RLI · Global</div>
            <div className="mt-1 font-display text-3xl font-medium text-gold-soft">88.4</div>
            <div className="font-mono text-[10px] text-emerald-300">▲ +1.2% vs 24h</div>
          </div>
        </FloatingOverlay>

        <FloatingOverlay delay={0.5} className="pointer-events-none absolute right-6 top-32 hidden w-56 md:block">
          <div className="rounded-2xl glass-dark p-4">
            <div className="text-[10px] uppercase tracking-widest text-orange">Active corridors</div>
            <div className="mt-1 font-display text-3xl font-medium text-paper">1,248</div>
            <div className="font-mono text-[10px] text-paper/55">Real-time routing</div>
          </div>
        </FloatingOverlay>

        <FloatingOverlay delay={0.8} className="pointer-events-none absolute right-12 top-72 hidden h-32 w-32 lg:block">
          <div className="h-full w-full overflow-hidden rounded-full border border-orange/30">
            <MiniGlobe color="#E8763A" />
          </div>
        </FloatingOverlay>

        <FloatingOverlay delay={1.1} className="pointer-events-none absolute bottom-32 left-12 hidden w-56 lg:block">
          <div className="rounded-2xl glass-dark p-4">
            <LiveNumberStream />
          </div>
        </FloatingOverlay>

        <FloatingOverlay delay={1.4} className="pointer-events-none absolute bottom-44 right-12 hidden h-32 w-32 lg:block">
          <div className="h-full w-full overflow-hidden rounded-full border border-gold/30">
            <MiniGlobe color="#D4AF37" />
          </div>
        </FloatingOverlay>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full glass-gold px-3.5 py-1.5 text-xs uppercase tracking-wider text-paper">
            <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-orange" />
            {stats.is_live ? `Live · ${stats.sources.toLocaleString()} sources connected` : "Atlas v2 — 4 surfaces, 1 canvas"}
            {stats.is_live && <Sparkles size={12} className="text-emerald-300" />}
          </span>
          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            The institutional view of<br />
            <span className="bg-gradient-to-r from-orange via-copper to-gold bg-clip-text text-transparent">commercial real estate</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/75">
            One canvas. <span className="text-paper">{stats.sources.toLocaleString()}</span> curated sources across <span className="text-paper">{stats.categories}</span> categories. {stats.is_live ? <><span className="text-emerald-300">Live</span> Supabase reads, daily ingest, six 3D surfaces.</> : "Real-time architecture. Daily ingest. Six 3D surfaces."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/visualize#globe" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-copper px-5 py-2.5 text-sm font-medium text-navy-deep shadow-[0_8px_24px_rgba(232,118,58,0.45)] transition hover:from-orange-soft hover:to-orange">
              Enter the Atlas <ArrowRight size={16} />
            </Link>
            <Link href="/terminal" className="inline-flex items-center gap-2 rounded-full glass-gold px-5 py-2.5 text-sm font-medium text-paper transition hover:scale-[1.02]">
              Open Terminal · 7 panels
            </Link>
            <Link href="/info#sources" className="inline-flex items-center gap-2 rounded-full glass-dark px-5 py-2.5 text-sm font-medium text-paper transition hover:scale-[1.02]">
              {stats.sources.toLocaleString()} sources
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE KPI STRIP */}
      <section className="relative border-y border-paper/10 bg-navy-deep py-12 text-paper noise">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-5">
          <AnimatedKpiCard label="Sources catalog" value={stats.sources}        accent="#E8763A" sublabel={`${stats.categories} categories`} live={stats.is_live} />
          <AnimatedKpiCard label="Data records"    value={stats.data_records}   accent="#D4AF37" sublabel="ingested rows" live={stats.is_live} />
          <AnimatedKpiCard label="Live endpoints"  value={22}                   accent="#4edea3" sublabel="govt + market"  />
          <AnimatedKpiCard label="Portfolio AUM"   value={284}    prefix="$" suffix="M" accent="#adc6ff" sublabel={`${REPRIME_PORTFOLIO.deals.length} positions`} />
          <AnimatedKpiCard label="Treasury 10Y"    value={4.28}   suffix="%" decimals={2} accent="#F4A574" sublabel="UST10Y · spot" />
        </div>
      </section>

      {/* Capital flow chord — dense visual centerpiece */}
      <section className="relative bg-navy-deep py-20 text-paper">
        <div className="absolute inset-0 mesh-cool-dark opacity-80 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Capital flow chord</div>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
                Where institutional capital<br /><span className="bg-gradient-to-r from-orange via-copper to-gold bg-clip-text text-transparent">crosses borders.</span>
              </h2>
            </div>
            <SampleBadge dark />
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-paper/10 bg-navy-deep/60 p-6 backdrop-blur-md">
              <ChordCapitalFlow />
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl glass-dark p-5">
                <div className="text-[10px] uppercase tracking-widest text-orange">Largest 24h flow</div>
                <div className="mt-2 font-display text-3xl font-medium text-paper">LDN → NYC</div>
                <div className="mt-1 font-mono text-sm text-gold-soft">$241.5M · velocity High</div>
              </div>
              <div className="rounded-2xl glass-dark p-5">
                <div className="text-[10px] uppercase tracking-widest text-orange">Hubs tracked</div>
                <div className="mt-2 font-display text-3xl font-medium text-paper">10</div>
                <div className="mt-1 font-mono text-sm text-paper/55">across 4 regions</div>
              </div>
              <div className="rounded-2xl glass-dark p-5">
                <div className="text-[10px] uppercase tracking-widest text-orange">Active flow corridors</div>
                <div className="mt-2 font-display text-3xl font-medium text-paper">17</div>
                <div className="mt-1 font-mono text-sm text-paper/55">refreshed every 4.2s</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DepthMap 3D — visual breather */}
      <section className="relative h-[60vh] overflow-hidden bg-navy-deep">
        <div className="absolute inset-0"><DepthMap3D /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep pointer-events-none" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-wider text-orange">3D rendering</div>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-paper md:text-5xl">
              Every signal,<br /><span className="bg-gradient-to-r from-orange via-gold to-orange-soft bg-clip-text text-transparent">rendered in depth.</span>
            </h2>
            <p className="mt-4 max-w-md text-paper/65">
              Six R3F scenes across the site — globe, flow field, metro skyline, risk terrain, depth map, pipeline kanban. Sixty-fps animated geometry, vertex-displaced surfaces, particle systems.
            </p>
          </div>
        </div>
      </section>

      {/* Surfaces grid */}
      <section className="relative border-t border-border bg-paper mesh-ivory noise">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-orange">Four surfaces</div>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight md:text-5xl">One unified data spine.</h2>
            <p className="mt-4 text-slate-700">Each surface composes the same component library — globe, treemap, heatmap, ticker, gauges, terrain. The 4-page architecture keeps everything reachable in two clicks.</p>
          </div>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {CAPABILITIES.map(({ icon: Icon, title, body, href }) => (
              <Link key={title} href={href} className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-ivory to-cream p-8 transition hover:from-cream hover:to-champagne hover:shadow-[0_12px_32px_rgba(184,115,51,0.18)]">
                <Icon size={20} className="text-orange" />
                <div className="mt-4 flex items-baseline gap-2 font-display text-2xl font-medium text-ink">
                  {title}
                  <ArrowRight size={18} className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-slate-700">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured deal */}
      <section className="relative border-t border-border bg-slate-100/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-end gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="text-xs uppercase tracking-wider text-orange">Featured underwrite</div>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-tight">{REPRIME_FEATURED_DEAL.name}</h3>
              <p className="mt-3 text-sm text-slate-700">{REPRIME_FEATURED_DEAL.summary}</p>
              <SampleBadge className="mt-4" />
            </div>
            <div className="rounded-lg border border-border bg-paper p-6 md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">Address</div>
                  <div className="mt-1 font-mono text-sm text-ink">{REPRIME_FEATURED_DEAL.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Capital stack</div>
                  <div className="font-display text-2xl font-medium text-orange">{REPRIME_FEATURED_DEAL.capital_stack.total}</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-px bg-border md:grid-cols-6">
                {REPRIME_FEATURED_DEAL.metrics.map(m => (
                  <div key={m.label} className="bg-paper p-4">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">{m.label}</div>
                    <div className="mt-1 font-mono text-sm text-ink">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live ticker strip */}
      <section className="bg-navy-deep py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-4 flex items-baseline justify-between text-paper">
            <div className="text-xs uppercase tracking-wider text-orange">Live deal feed</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-paper/55">4.2s cycle · sample</div>
          </div>
          <BloombergTicker />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-br from-navy-deep to-navy text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Access</div>
              <h3 className="mt-3 font-display text-4xl font-medium tracking-tight">Talk to us before you build it yourself.</h3>
              <p className="mt-4 text-paper/70">If you&apos;re piecing together CRE intelligence from FRED, Census, BLS, BEA, EIA, and forty broker portals — there&apos;s a faster path.</p>
            </div>
            <div className="flex justify-end">
              <Link href="/info#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-copper px-6 py-3 text-sm font-medium text-navy-deep transition hover:from-copper hover:to-orange">
                Request access <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
