import CapitalFlowField from "@/components/flow/CapitalFlowField";
import SampleBadge from "@/components/ui/SampleBadge";

export const metadata = { title: "Capital flow field" };

export default function FlowPage() {
  return (
    <section className="relative bg-navy-deep text-paper">
      <div className="absolute inset-0">
        <CapitalFlowField />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/80 pointer-events-none" />
      <div className="pointer-events-none relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-6 py-16">
        <div className="max-w-xl pointer-events-auto">
          <div className="text-xs uppercase tracking-wider text-orange">Module · Flow</div>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Where capital wants to go.</h1>
          <p className="mt-4 text-paper/70">
            A live particle field weighted by 13 US capital hubs. Streamers flow toward the metros where institutional capital is concentrating. Speed → orange · slack → gold. Inspired by Earth Nullschool and Windy, applied to CRE deal flow.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SampleBadge dark />
            <span className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1 text-[11px] uppercase tracking-wider text-paper/60">
              900 particles · 60fps
            </span>
          </div>
        </div>
        <div className="pointer-events-auto grid w-full grid-cols-2 gap-px bg-paper/10 sm:grid-cols-4 md:max-w-2xl">
          <Stat label="Hubs" value="13" />
          <Stat label="Particles" value="900" />
          <Stat label="Color ramp" value="gold→orange" />
          <Stat label="Refresh" value="continuous" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-navy-deep/85 backdrop-blur px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-paper/50">{label}</div>
      <div className="mt-0.5 font-mono text-sm text-gold-soft">{value}</div>
    </div>
  );
}
