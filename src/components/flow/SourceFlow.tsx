"use client";
import { useMemo } from "react";
import { PALETTE } from "@/lib/constants";

// 3-column source-family → use-case → asset-type flow.
// Custom SVG (no d3-sankey dep). Curved Bezier ribbons weighted by volume.

const FAMILIES = [
  { id: "fed", name: "Federal economic", count: 218 },
  { id: "census", name: "Census + demo", count: 184 },
  { id: "labor", name: "Labor + employment", count: 167 },
  { id: "property", name: "Property records", count: 273 },
  { id: "climate", name: "Climate + risk", count: 189 },
  { id: "rents", name: "REITs + capital", count: 121 },
];
const USES = [
  { id: "macro", name: "Macro thesis" },
  { id: "market", name: "Market selection" },
  { id: "asset", name: "Asset diligence" },
  { id: "risk", name: "Risk overlay" },
];
const ASSETS = [
  { id: "mf", name: "Multifamily" },
  { id: "ind", name: "Industrial" },
  { id: "off", name: "Office" },
  { id: "ret", name: "Retail" },
  { id: "mix", name: "Mixed-Use" },
];

const FLOW_FU: Array<[string, string, number]> = [
  ["fed", "macro", 60], ["fed", "market", 35], ["fed", "risk", 25],
  ["census", "market", 80], ["census", "asset", 60], ["census", "macro", 25],
  ["labor", "market", 75], ["labor", "macro", 50], ["labor", "asset", 30],
  ["property", "asset", 120], ["property", "market", 90], ["property", "risk", 40],
  ["climate", "risk", 110], ["climate", "asset", 50], ["climate", "market", 25],
  ["rents", "asset", 45], ["rents", "market", 50], ["rents", "macro", 25],
];
const FLOW_UA: Array<[string, string, number]> = [
  ["macro", "mf", 30], ["macro", "ind", 28], ["macro", "off", 22], ["macro", "ret", 18], ["macro", "mix", 22],
  ["market", "mf", 65], ["market", "ind", 60], ["market", "off", 45], ["market", "ret", 38], ["market", "mix", 42],
  ["asset", "mf", 90], ["asset", "ind", 80], ["asset", "off", 60], ["asset", "ret", 45], ["asset", "mix", 50],
  ["risk", "mf", 30], ["risk", "ind", 35], ["risk", "off", 50], ["risk", "ret", 30], ["risk", "mix", 25],
];

const W = 1000, H = 520;
const COL_X = [60, 480, 920];
const NODE_W = 16;

export default function SourceFlow() {
  const layout = useMemo(() => {
    const colHeight = H - 60;
    const layoutCol = (items: Array<{ id: string; name: string; count?: number }>, x: number) => {
      const weights = items.map((it) => it.count ?? 50);
      const total = weights.reduce((a, b) => a + b, 0);
      const gap = 8;
      let y = 30;
      const map = new Map<string, { x: number; y: number; h: number; name: string }>();
      for (let i = 0; i < items.length; i++) {
        const h = ((weights[i] / total) * (colHeight - gap * (items.length - 1)));
        map.set(items[i].id, { x, y, h, name: items[i].name });
        y += h + gap;
      }
      return map;
    };
    const f = layoutCol(FAMILIES, COL_X[0]);
    const usesWithW = USES.map((u) => ({ ...u, count: FLOW_FU.filter(([, t]) => t === u.id).reduce((s, [, , w]) => s + w, 0) }));
    const u = layoutCol(usesWithW, COL_X[1]);
    const assetsWithW = ASSETS.map((a) => ({ ...a, count: FLOW_UA.filter(([, t]) => t === a.id).reduce((s, [, , w]) => s + w, 0) }));
    const a = layoutCol(assetsWithW, COL_X[2]);
    return { f, u, a };
  }, []);

  // Track running y-offset within each node for stacked ribbon attachment
  const ribbonsFU = useMemo(() => {
    const fOff = new Map<string, number>();
    const uOff = new Map<string, number>();
    return FLOW_FU.map(([from, to, w], i) => {
      const fn = layout.f.get(from); const un = layout.u.get(to);
      if (!fn || !un) return null;
      const totalFromOut = FLOW_FU.filter(([s]) => s === from).reduce((a, [, , v]) => a + v, 0);
      const totalToIn = FLOW_FU.filter(([, t]) => t === to).reduce((a, [, , v]) => a + v, 0);
      const hf = (w / totalFromOut) * fn.h;
      const hu = (w / totalToIn) * un.h;
      const y0 = fn.y + (fOff.get(from) ?? 0);
      const y1 = un.y + (uOff.get(to) ?? 0);
      fOff.set(from, (fOff.get(from) ?? 0) + hf);
      uOff.set(to, (uOff.get(to) ?? 0) + hu);
      const mx = (fn.x + NODE_W + un.x) / 2;
      const d = `M${fn.x + NODE_W},${y0} C${mx},${y0} ${mx},${y1} ${un.x},${y1} L${un.x},${y1 + hu} C${mx},${y1 + hu} ${mx},${y0 + hf} ${fn.x + NODE_W},${y0 + hf} Z`;
      return { d, color: i % 3 === 0 ? PALETTE.orange : i % 3 === 1 ? PALETTE.gold : PALETTE.orangeSoft, key: `fu-${i}` };
    }).filter(Boolean) as Array<{ d: string; color: string; key: string }>;
  }, [layout]);

  const ribbonsUA = useMemo(() => {
    const uOff = new Map<string, number>();
    const aOff = new Map<string, number>();
    return FLOW_UA.map(([from, to, w], i) => {
      const un = layout.u.get(from); const an = layout.a.get(to);
      if (!un || !an) return null;
      const totalFromOut = FLOW_UA.filter(([s]) => s === from).reduce((a, [, , v]) => a + v, 0);
      const totalToIn = FLOW_UA.filter(([, t]) => t === to).reduce((a, [, , v]) => a + v, 0);
      const hu = (w / totalFromOut) * un.h;
      const ha = (w / totalToIn) * an.h;
      const y0 = un.y + (uOff.get(from) ?? 0);
      const y1 = an.y + (aOff.get(to) ?? 0);
      uOff.set(from, (uOff.get(from) ?? 0) + hu);
      aOff.set(to, (aOff.get(to) ?? 0) + ha);
      const mx = (un.x + NODE_W + an.x) / 2;
      const d = `M${un.x + NODE_W},${y0} C${mx},${y0} ${mx},${y1} ${an.x},${y1} L${an.x},${y1 + ha} C${mx},${y1 + ha} ${mx},${y0 + hu} ${un.x + NODE_W},${y0 + hu} Z`;
      return { d, color: i % 3 === 0 ? PALETTE.gold : i % 3 === 1 ? PALETTE.orange : PALETTE.orangeSoft, key: `ua-${i}` };
    }).filter(Boolean) as Array<{ d: string; color: string; key: string }>;
  }, [layout]);

  return (
    <div className="overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
        <g style={{ mixBlendMode: "screen" }}>
          {ribbonsFU.map((r) => <path key={r.key} d={r.d} fill={r.color} opacity={0.32} />)}
          {ribbonsUA.map((r) => <path key={r.key} d={r.d} fill={r.color} opacity={0.32} />)}
        </g>
        <g>
          {[...layout.f.entries(), ...layout.u.entries(), ...layout.a.entries()].map(([id, n]) => (
            <g key={id}>
              <rect x={n.x} y={n.y} width={NODE_W} height={n.h} fill={PALETTE.gold} opacity={0.85} />
              <text x={n.x + NODE_W + 6} y={n.y + n.h / 2 + 3} fontSize={11} fontFamily="ui-monospace" fill="#FAFAF7">{n.name}</text>
            </g>
          ))}
        </g>
        <g fontSize={10} fontFamily="ui-monospace" fill="#FAFAF7" opacity={0.55}>
          <text x={COL_X[0]} y={18}>SOURCE FAMILY</text>
          <text x={COL_X[1]} y={18}>USE CASE</text>
          <text x={COL_X[2] - 80} y={18}>ASSET TYPE</text>
        </g>
      </svg>
    </div>
  );
}
