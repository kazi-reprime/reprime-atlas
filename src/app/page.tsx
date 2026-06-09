import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, Database, Globe2, Layers } from "lucide-react";
import HeroGlobe from "@/components/globe/HeroGlobe";
import SampleBadge from "@/components/ui/SampleBadge";
import { REPRIME_FEATURED_DEAL } from "@/lib/reprime-data";

const KPIS = [
  { label: "Live sources", value: "22", note: "fan-out APIs" },
  { label: "Catalog entries", value: "1,932", note: "curated CRE sources" },
  { label: "Coverage", value: "50", note: "US states + DC" },
  { label: "Refresh cadence", value: "≤24h", note: "daily ingestion" },
];

const CAPABILITIES = [
  { icon: Globe2, title: "Capital flow", href: "/globe", body: "Animated arcs and particle streams tracing deal flow between metros, sized by volume and sector." },
  { icon: Activity, title: "Market signals", href: "/markets", body: "Sector heatmap, REIT performance, Treasury curve, and credit spreads in one dense terminal-grade canvas." },
  { icon: Database, title: "Source operations", href: "/signals", body: "Live status pulse across 22 government and market endpoints; full catalog explorer over the 1,932 sources." },
  { icon: Layers, title: "Metro depth", href: "/metros", body: "Top US metros as a 3D extruded surface — switch vacancy, cap-rate, absorption, or employment growth and watch the terrain redraw." },
];

export default function Home() {
  return (
    <>
      <section className="relative h-[min(82vh,820px)] overflow-hidden bg-navy-deep text-paper">
        <div className="absolute inset-0">
          <HeroGlobe />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/10 via-navy-deep/30 to-navy-deep" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full glass-gold px-3.5 py-1.5 text-xs uppercase tracking-wider text-paper">
            <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-orange" /> Atlas v1 — live
          </span>
          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            The institutional view of<br /><span className="text-orange">commercial real estate</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/75">
            One canvas. 22 live government and market feeds. A 1,932-source catalog. Built for analysts, allocators, and operators who refuse to chase numbers across forty tabs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/globe" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-copper px-5 py-2.5 text-sm font-medium text-navy-deep shadow-[0_8px_24px_rgba(232,118,58,0.45)] transition hover:from-orange-soft hover:to-orange">
              Enter the Atlas <ArrowRight size={16} />
            </Link>
            <Link href="/pulse" className="inline-flex items-center gap-2 rounded-full glass-gold px-5 py-2.5 text-sm font-medium text-paper transition hover:scale-[1.02]">
              Live pulse · 8 gauges
            </Link>
            <Link href="/sources" className="inline-flex items-center gap-2 rounded-full glass-dark px-5 py-2.5 text-sm font-medium text-paper transition hover:scale-[1.02]">
              Browse 1,155 sources
            </Link>
          </div>
        </div>
      </section>

      <section className="relative border-y border-border mesh-ivory noise overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="bg-paper px-6 py-8">
              <div className="text-xs uppercase tracking-wider text-slate-500">{kpi.label}</div>
              <div className="mt-2 font-display text-4xl font-medium text-ink">{kpi.value}</div>
              <div className="mt-1 text-xs text-slate-500">{kpi.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-wider text-orange">Surfaces</div>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight md:text-5xl">
            Four visualizations.<br />One unified data spine.
          </h2>
          <p className="mt-4 text-slate-700">
            Each surface is bound to the same RePrime data warehouse. Hover anything for source attribution; numbers without a live binding carry a <SampleBadge /> badge.
          </p>
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
      </section>

      <section className="border-t border-border bg-slate-100/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-end gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="text-xs uppercase tracking-wider text-orange">Featured</div>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-tight">Sample deal — illustrative only.</h3>
              <p className="mt-3 text-sm text-slate-700">
                Reviewed assets surface here once they clear our diligence threshold. Live deal data writes to <span className="font-mono text-ink">featured_deal.json</span> on each ingestion cycle.
              </p>
              <SampleBadge className="mt-4" />
            </div>
            <div className="rounded-lg border border-border bg-paper p-6 md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">Multifamily · {REPRIME_FEATURED_DEAL.summary.split(" · ")[1]}</div>
                  <div className="mt-1 font-display text-2xl font-medium">{REPRIME_FEATURED_DEAL.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{REPRIME_FEATURED_DEAL.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-slate-500">Capital stack</div>
                  <div className="font-display text-2xl font-medium text-orange">{REPRIME_FEATURED_DEAL.capital_stack.total}</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-px bg-border md:grid-cols-6">
                {REPRIME_FEATURED_DEAL.metrics.map((m) => (
                  <Stat key={m.label} label={m.label} value={m.value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-br from-navy-deep to-navy text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Access</div>
              <h3 className="mt-3 font-display text-4xl font-medium tracking-tight">Talk to us before you build it yourself.</h3>
              <p className="mt-4 text-paper/70">
                If you&apos;re piecing together CRE intelligence from FRED, Census, BLS, BEA, EIA, and forty broker portals — there&apos;s a faster path.
              </p>
            </div>
            <div className="flex justify-end">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-medium text-navy-deep hover:bg-orange-soft">
                Request access <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative border-y border-border mesh-ivory noise overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <div className="text-xs uppercase tracking-wider text-copper">Showcase render</div>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight">
                One canvas for <span className="bg-gradient-to-r from-orange via-copper to-gold bg-clip-text text-transparent">everything</span>.
              </h2>
              <p className="mt-4 text-slate-700">
                The institutional terminal we wanted before we built it. Globe, deal feed, treasury curve, sector donuts, metro skyline, live source pulse — all on the same dark cinematic surface.
              </p>
              <Link href="/showcase" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-copper px-5 py-2.5 text-sm font-medium text-paper shadow-[0_8px_24px_rgba(232,118,58,0.4)] transition hover:from-copper hover:to-orange">
                See the showcase →
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_rgba(184,115,51,0.25)]">
              <Image
                src="/images/dashboard-hero.jpg"
                alt="RePrime Atlas concept dashboard"
                width={1200}
                height={675}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-sm text-ink">{value}</div>
    </div>
  );
}
