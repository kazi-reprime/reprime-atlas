import Image from "next/image";
import ConceptCard from "@/components/showcase/ConceptCard";
import GlassCard from "@/components/ui/GlassCard";
import SampleBadge from "@/components/ui/SampleBadge";

export const metadata = { title: "Showcase" };

export default function ShowcasePage() {
  return (
    <section className="relative mesh-cool-dark text-paper noise">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange">Showcase</div>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">
              The Atlas, <span className="text-gold-soft">visualized.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-paper/70">
              One concept render of the institutional terminal, plus four panel-level studies of the surfaces underneath. The hero render is a single composite; the four cards below break out the live elements you can interact with across the site.
            </p>
          </div>
          <SampleBadge dark />
        </div>

        {/* HERO IMAGE — user-uploaded composite */}
        <figure className="mt-12 relative overflow-hidden rounded-3xl border border-paper/10 shadow-[0_30px_80px_rgba(9,21,51,0.55)]">
          <Image
            src="/images/dashboard-hero.jpg"
            alt="RePrime Atlas — dashboard concept render"
            width={1920}
            height={1080}
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="block h-auto w-full"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-transparent p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-orange">Composite concept</div>
                <div className="mt-1 font-display text-2xl font-medium">Live intelligence platform · single canvas</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full glass-gold px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-paper">Globe + terminal</span>
                <span className="rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-paper">Deal feed</span>
                <span className="rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-paper">Donuts + spirals</span>
                <span className="rounded-full glass-dark px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-paper">Curve + spreads</span>
              </div>
            </div>
          </figcaption>
        </figure>

        {/* Panel studies — 4 SVG-rendered concept cards in the same visual language */}
        <div className="mt-14">
          <div className="text-[11px] uppercase tracking-wider text-slate-500">Panel studies · same visual language</div>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">Four surfaces, one canvas.</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ConceptCard
            variant="globe"
            title="Capital flow globe"
            caption="Animated great-circle arcs between 13 hubs. Live at /globe and /flow. Inspired by Earth Nullschool + OEC."
          />
          <ConceptCard
            variant="terminal"
            title="Executive terminal"
            caption="Tickers + KPIs + 5-tab terminal at /terminal. Bloomberg-grade density on dark cinematic glass."
          />
          <ConceptCard
            variant="deal-feed"
            title="Live deal feed"
            caption="4.2-second cycle — Reviewed / Sourced / Advised. Live at /signals and /dashboard."
          />
          <ConceptCard
            variant="metro"
            title="Metro skyline"
            caption="25 US metros as 3D extruded bars with 4-metric switcher. Live at /metros."
          />
        </div>

        {/* Footer band */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <GlassCard variant="gold">
            <div className="text-[10px] uppercase tracking-wider text-copper">Hero render</div>
            <div className="mt-2 font-display text-3xl font-medium">Gemini</div>
            <p className="mt-1 text-xs text-slate-700">User-supplied composite concept. Optimized at 1920w / JPEG 80% for fast LCP.</p>
          </GlassCard>
          <GlassCard variant="cream">
            <div className="text-[10px] uppercase tracking-wider text-copper">Panel studies</div>
            <div className="mt-2 font-display text-3xl font-medium">Inline SVG</div>
            <p className="mt-1 text-xs text-slate-700">Pure SVG, no raster — sharp at any DPR, indexable by search engines, zero asset weight.</p>
          </GlassCard>
          <GlassCard variant="dark">
            <div className="text-[10px] uppercase tracking-wider text-gold-soft">Brand palette</div>
            <div className="mt-2 font-display text-3xl font-medium text-paper">Navy → copper → gold</div>
            <p className="mt-1 text-xs text-paper/65">Same tokens drive the SVG cards, the R3F scenes on /globe, and the hero image — visual coherence across raster and vector.</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
