"use client";
// Scoreboard of live-incrementing pipeline counters (platform-wide ops).
import { useEffect, useState } from "react";

type Counter = { label: string; base: number; rate: [number, number] };

const COUNTERS: Counter[] = [
  { label: "Listings scanned", base: 1_285_407, rate: [3, 18] },
  { label: "Data points pulled", base: 2_668_906, rate: [8, 40] },
  { label: "OMs parsed", base: 8_431, rate: [0, 2] },
  { label: "Underwritten", base: 5_102, rate: [0, 1] },
  { label: "Emails sent", base: 2_742, rate: [0, 1] },
  { label: "Zooms set", base: 99, rate: [0, 1] },
  { label: "LOIs out", base: 313, rate: [0, 1] },
  { label: "Sources online", base: 1_787, rate: [0, 0] },
];

const TICK_MS = 1800;

export default function OpsCounters() {
  const [vals, setVals] = useState<number[]>(COUNTERS.map((c) => c.base));

  useEffect(() => {
    const t = setInterval(() => {
      setVals((prev) =>
        prev.map((v, i) => {
          const [lo, hi] = COUNTERS[i].rate;
          return v + lo + Math.floor(Math.random() * (hi - lo + 1));
        })
      );
    }, TICK_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {COUNTERS.map((c, i) => (
        <div key={c.label} className="relative rounded-xl border border-paper/10 bg-paper/[0.03] px-3 py-3">
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 animate-livepulse rounded-full bg-emerald-300" />
          <div className="font-mono text-lg font-semibold tabular-nums text-gold">{vals[i].toLocaleString()}</div>
          <div className="mt-1 text-[9px] uppercase tracking-wider text-paper/55">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
