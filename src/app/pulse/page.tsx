"use client";
import { useEffect, useState } from "react";
import LiveGauge from "@/components/gauges/LiveGauge";
import GlassCard from "@/components/ui/GlassCard";
import SampleBadge from "@/components/ui/SampleBadge";
import LiveHealthDots from "@/components/signals/LiveHealthDots";

type Reading = {
  label: string; display: string; sub: string; value: number; color: "orange" | "gold" | "copper" | "emerald" | "rose";
};

const BASE: Reading[] = [
  { label: "10Y Treasury",    display: "4.28%",  sub: "UST10Y",        value: 0.74, color: "orange" },
  { label: "SOFR overnight",  display: "5.31%",  sub: "SOFR",          value: 0.86, color: "copper" },
  { label: "BBB CRE spread",  display: "182bp",  sub: "vs UST",        value: 0.52, color: "gold" },
  { label: "Industrial vac.", display: "6.8%",   sub: "national",      value: 0.32, color: "emerald" },
  { label: "Office vac.",     display: "18.4%",  sub: "national",      value: 0.79, color: "rose" },
  { label: "MF NOI YoY",      display: "+2.4%",  sub: "YoY",           value: 0.42, color: "emerald" },
  { label: "Cap rate avg.",   display: "6.7%",   sub: "all sectors",   value: 0.55, color: "gold" },
  { label: "VNQ price",       display: "$87.42", sub: "REIT ETF",      value: 0.62, color: "orange" },
];

export default function PulsePage() {
  const [tick, setTick] = useState(0);
  const [vals, setVals] = useState(BASE);

  useEffect(() => {
    const i = setInterval(() => {
      setTick((t) => t + 1);
      setVals((vs) =>
        vs.map((r) => ({
          ...r,
          value: Math.max(0.08, Math.min(0.96, r.value + (Math.random() - 0.5) * 0.07)),
        }))
      );
    }, 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative mesh-cool-dark text-paper noise">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Live pulse</div>
              <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">
                Every signal,<br /><span className="text-gold-soft">at a glance.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-paper/70">
                Eight synchronized gauges over the live rate environment, CRE fundamentals, and capital-market posture. Updates every 2.5 seconds with smooth tweening between readings. The synthetic walk is illustrative; in production each gauge binds to a single Supabase view or live API series.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LiveHealthDots />
              <SampleBadge dark />
            </div>
          </div>

          {/* Synchronized gauge grid */}
          <div className="mt-12">
            <GlassCard variant="dark" noise shimmer className="px-6 py-10">
              <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
                {vals.map((r) => (
                  <LiveGauge key={r.label} {...r} />
                ))}
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-paper/10 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-paper/45">
                  tick #{tick} · next refresh in 2.5s · ease-out-cubic 600ms
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-orange" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-orange">streaming</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Lower band: 3 supporting glass cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <GlassCard variant="gold" className="text-ink">
              <div className="text-[10px] uppercase tracking-wider text-copper">Cadence</div>
              <div className="mt-2 font-display text-3xl font-medium">2.5s</div>
              <p className="mt-1 text-xs text-slate-700">Push interval. Production cadence is driven by the slowest upstream feed in the synchronization set.</p>
            </GlassCard>
            <GlassCard variant="cream">
              <div className="text-[10px] uppercase tracking-wider text-copper">Tween</div>
              <div className="mt-2 font-display text-3xl font-medium">cubic-out</div>
              <p className="mt-1 text-xs text-slate-700">Each ring eases over 600ms toward its new value. Reduced-motion users see instant snaps instead.</p>
            </GlassCard>
            <GlassCard variant="dark">
              <div className="text-[10px] uppercase tracking-wider text-gold-soft">Sync set</div>
              <div className="mt-2 font-display text-3xl font-medium text-paper">8</div>
              <p className="mt-1 text-xs text-paper/65">Gauges share a single tick — every refresh updates them as a coherent snapshot, not staggered polls.</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
