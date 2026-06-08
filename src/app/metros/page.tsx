"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { METRIC_LABELS, METROS } from "@/lib/sample-data";
import SampleBadge from "@/components/ui/SampleBadge";
import type { Metric } from "@/components/skyline/MetroSkyline";

const MetroSkyline = dynamic(() => import("@/components/skyline/MetroSkyline"), { ssr: false, loading: () => <div className="h-full w-full bg-navy-deep" /> });

export default function MetrosPage() {
  const [metric, setMetric] = useState<Metric>("vacancy");
  return (
    <section className="relative bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <div className="text-xs uppercase tracking-wider text-orange">Module D</div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Metro skyline</h1>
              <p className="mt-3 max-w-2xl text-paper/70">
                {METROS.length} top US metros rendered as 3D extruded bars over an Albers USA projection. Switch metric to re-extrude the terrain. Drag to rotate, scroll to zoom.
              </p>
            </div>
            <SampleBadge dark />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(METRIC_LABELS) as Metric[]).map((k) => (
              <button
                key={k}
                onClick={() => setMetric(k)}
                className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition ${
                  metric === k
                    ? "border-orange bg-orange text-navy-deep"
                    : "border-paper/20 bg-paper/5 text-paper/70 hover:bg-paper/10"
                }`}
              >
                {METRIC_LABELS[k]}
              </button>
            ))}
          </div>

          <div className="mt-6 h-[560px] w-full overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
            <MetroSkyline metric={metric} />
          </div>

          <div className="mt-6 mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {METROS.slice(0, 10).map((m) => (
              <div key={m.id} className="rounded border border-paper/10 bg-paper/5 px-3 py-2">
                <div className="text-xs text-paper/60">{m.name}</div>
                <div className="font-mono text-sm text-paper">{m[metric].toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
