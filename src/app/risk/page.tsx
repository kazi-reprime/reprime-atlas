"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import SampleBadge from "@/components/ui/SampleBadge";
import type { RiskMode } from "@/components/risk/RiskSurface3D";

const RiskSurface3D = dynamic(() => import("@/components/risk/RiskSurface3D"), { ssr: false, loading: () => <div className="h-[520px] w-full bg-navy-deep" /> });

const MODES: Array<{ k: RiskMode; label: string; body: string }> = [
  { k: "climate", label: "Climate", body: "Hazard exposure (flood, wildfire, hurricane corridor) derived from FEMA NFIP, NOAA ACIS, and USGS feeds. Hot zones in coastal Florida and the Gulf basin." },
  { k: "credit", label: "Credit", body: "BBB / BB CRE spread surface against the metro footprint. Wider spread = higher refinancing cost. Sourced from FRED + Treasury curves." },
  { k: "vacancy", label: "Vacancy", body: "Office and multifamily vacancy by metro, smoothed against the national mean. Persistent elevation in tech-heavy western metros." },
];

export default function RiskPage() {
  const [mode, setMode] = useState<RiskMode>("climate");
  const current = MODES.find((m) => m.k === mode)!;
  return (
    <section className="bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Risk surfaces</div>
              <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Where the exposure lives.</h1>
              <p className="mt-3 max-w-2xl text-paper/70">{current.body}</p>
            </div>
            <SampleBadge dark />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.k}
                onClick={() => setMode(m.k)}
                className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition ${
                  mode === m.k
                    ? "border-orange bg-orange text-navy-deep"
                    : "border-paper/20 bg-paper/5 text-paper/70 hover:bg-paper/10"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="mt-6 h-[560px] w-full overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
            <RiskSurface3D mode={mode} />
          </div>
        </div>
      </div>
    </section>
  );
}
