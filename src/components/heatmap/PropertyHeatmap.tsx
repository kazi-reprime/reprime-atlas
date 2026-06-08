"use client";
import { useMemo, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { useEffect } from "react";
import { METROS } from "@/lib/sample-data";
import { PALETTE } from "@/lib/constants";

type Mode = "volume" | "capRate" | "vacancy";

const MODE_CONFIG: Record<Mode, { label: string; key: "absorption" | "capRate" | "vacancy"; unit: string }> = {
  volume: { label: "Volume", key: "absorption", unit: "M sf" },
  capRate: { label: "Cap rate", key: "capRate", unit: "%" },
  vacancy: { label: "Vacancy", key: "vacancy", unit: "%" },
};

function colorRamp(v: number, mode: Mode): string {
  const norm =
    mode === "vacancy" ? Math.min(1, v / 25)
    : mode === "capRate" ? Math.min(1, (v - 5) / 4)
    : Math.min(1, Math.max(0, (v + 2) / 6));
  const r = Math.round(232 + (255 - 232) * norm * 0.2);
  const g = Math.round(118 - 60 * norm);
  const b = Math.round(58 - 30 * norm);
  return `rgb(${r},${g},${b})`;
}

export default function PropertyHeatmap() {
  const [mode, setMode] = useState<Mode>("vacancy");
  const [hover, setHover] = useState<string | null>(null);
  const [usGeo, setUsGeo] = useState<any>(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then((r) => r.json())
      .then((t: any) => setUsGeo(t))
      .catch(() => {});
  }, []);

  const proj = useMemo(() => geoAlbersUsa().scale(1200).translate([500, 305]), []);
  const path = useMemo(() => geoPath(proj), [proj]);

  const items = useMemo(
    () =>
      METROS.map((m) => {
        const p = proj([m.lon, m.lat]);
        if (!p) return null;
        const v = m[MODE_CONFIG[mode].key];
        const r = mode === "volume" ? Math.max(8, Math.abs(v) * 5 + 10) : Math.max(8, v * 1.6);
        return { ...m, x: p[0], y: p[1], v, r };
      }).filter(Boolean) as Array<(typeof METROS)[0] & { x: number; y: number; v: number; r: number }>,
    [mode, proj]
  );

  const states = useMemo(() => {
    if (!usGeo) return [];
    const f: any = feature(usGeo, usGeo.objects.states as any);
    return (f.features ?? []) as any[];
  }, [usGeo]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(Object.keys(MODE_CONFIG) as Mode[]).map((k) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={`rounded-full border px-3.5 py-1 text-[11px] uppercase tracking-wider transition ${
                mode === k
                  ? "border-orange bg-orange text-navy-deep"
                  : "border-paper/20 bg-paper/5 text-paper/60 hover:bg-paper/10"
              }`}
            >
              {MODE_CONFIG[k].label}
            </button>
          ))}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
          25 markets · circle size = {MODE_CONFIG[mode].label.toLowerCase()}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
        <svg viewBox="0 0 1000 600" className="block h-full w-full">
          <g>
            {states.map((s, i) => (
              <path key={i} d={path(s) ?? ""} fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth={0.6} />
            ))}
          </g>
          {items.map((it) => {
            const active = hover === it.id;
            return (
              <g key={it.id} onMouseEnter={() => setHover(it.id)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
                <circle cx={it.x} cy={it.y} r={it.r * 1.6} fill={colorRamp(it.v, mode)} opacity={0.12} />
                <circle cx={it.x} cy={it.y} r={it.r} fill={colorRamp(it.v, mode)} opacity={active ? 0.95 : 0.7} />
                <text x={it.x} y={it.y - it.r - 5} textAnchor="middle" fontSize={9} fontFamily="ui-monospace" fill="#FAFAF7">
                  {it.name}
                </text>
                <text x={it.x} y={it.y + 3} textAnchor="middle" fontSize={11} fontFamily="ui-monospace" fontWeight={600} fill="#FAFAF7">
                  {it.v.toFixed(1)}
                </text>
                {active && (
                  <text x={it.x} y={it.y + it.r + 14} textAnchor="middle" fontSize={9} fontFamily="ui-monospace" fill={PALETTE.gold}>
                    {MODE_CONFIG[mode].label} · {it.v.toFixed(1)}{MODE_CONFIG[mode].unit}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
