import dynamic from "next/dynamic";
import SampleBadge from "@/components/ui/SampleBadge";
import { ARCS, HUBS } from "@/lib/sample-data";

const HeroGlobe = dynamic(() => import("@/components/globe/HeroGlobe"), { ssr: false });

export const metadata = { title: "Capital-flow globe" };

export default function GlobePage() {
  const totalFlow = ARCS.reduce((s, a) => s + a.weight, 0);
  return (
    <section className="relative min-h-screen bg-navy-deep text-paper">
      <div className="absolute inset-0">
        <HeroGlobe interactive />
      </div>
      <div className="absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" />
      <div className="pointer-events-none relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-16">
        <div className="max-w-xl pointer-events-auto">
          <div className="text-xs uppercase tracking-wider text-orange">Module A</div>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Capital-flow globe</h1>
          <p className="mt-4 text-paper/70">
            Animated great-circle arcs between {HUBS.length} major capital hubs, weighted by deal volume. Drag to rotate; scroll to zoom. Designed to ingest live deal-flow data from the RePrime warehouse in v2.
          </p>
          <SampleBadge dark className="mt-4" />
        </div>
        <div className="pointer-events-auto grid w-full grid-cols-2 gap-px bg-paper/10 sm:grid-cols-4 md:max-w-2xl">
          <Stat label="Hubs" value={HUBS.length.toString()} />
          <Stat label="Active arcs" value={ARCS.length.toString()} />
          <Stat label="Weighted flow" value={totalFlow.toFixed(1)} />
          <Stat label="Refresh" value="≤24h" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-navy-deep/85 backdrop-blur px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-paper/50">{label}</div>
      <div className="mt-0.5 font-display text-2xl font-medium text-gold-soft">{value}</div>
    </div>
  );
}
