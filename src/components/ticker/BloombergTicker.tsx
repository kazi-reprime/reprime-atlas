"use client";
import { useEffect, useState } from "react";

type Deal = { kind: "Reviewed" | "Sourced" | "Advised"; asset: string; value: string; cap: string; time: string };

const SEED: Deal[] = [
  { kind: "Reviewed", asset: "Industrial portfolio · DFW + PHX", value: "$412M", cap: "6.4%", time: "12:42" },
  { kind: "Sourced", asset: "Class A office · Boston Seaport", value: "$285M", cap: "5.8%", time: "12:38" },
  { kind: "Advised", asset: "Multifamily · Austin metro", value: "$167M", cap: "5.2%", time: "12:31" },
  { kind: "Reviewed", asset: "Data center · NoVA cluster", value: "$840M", cap: "5.0%", time: "12:24" },
  { kind: "Sourced", asset: "Grocery-anchored retail · Tampa", value: "$48M", cap: "6.9%", time: "12:18" },
  { kind: "Advised", asset: "Cold-storage industrial · Inland Empire", value: "$226M", cap: "5.6%", time: "12:11" },
  { kind: "Reviewed", asset: "Sun Belt MF portfolio · 1,840 units", value: "$394M", cap: "5.4%", time: "12:04" },
  { kind: "Sourced", asset: "Suburban office reposition · Atlanta", value: "$92M", cap: "8.1%", time: "11:57" },
  { kind: "Reviewed", asset: "Self-storage roll-up · Southeast", value: "$118M", cap: "6.0%", time: "11:48" },
  { kind: "Advised", asset: "Life sciences · Cambridge", value: "$372M", cap: "5.1%", time: "11:39" },
];

const kindColor: Record<Deal["kind"], string> = {
  Reviewed: "text-emerald-300 border-emerald-300/40",
  Sourced: "text-gold border-gold/40",
  Advised: "text-orange border-orange/40",
};

export default function BloombergTicker() {
  const [feed, setFeed] = useState(SEED);
  useEffect(() => {
    const t = setInterval(() => {
      setFeed((f) => {
        const next = [...f];
        const moved = next.pop();
        if (moved) next.unshift({ ...moved, time: nowHHMM() });
        return next;
      });
    }, 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-lg border border-paper/10 bg-navy-deep/85 backdrop-blur">
      <div className="flex items-center justify-between border-b border-paper/10 px-4 py-2">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-orange">
          <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-orange" /> Deal feed · live
        </div>
        <div className="font-mono text-[10px] text-paper/40">streaming · 4.2s cycle · Sample</div>
      </div>
      <div className="max-h-[440px] overflow-hidden">
        <ul className="divide-y divide-paper/5">
          {feed.map((d, i) => (
            <li
              key={`${d.asset}-${i}`}
              className="grid grid-cols-12 items-center gap-3 px-4 py-2.5 text-xs transition"
              style={{ opacity: 1 - i * 0.04 }}
            >
              <span className={`col-span-2 rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${kindColor[d.kind]}`}>
                {d.kind}
              </span>
              <span className="col-span-6 truncate text-paper">{d.asset}</span>
              <span className="col-span-2 font-mono text-gold-soft">{d.value}</span>
              <span className="col-span-1 font-mono text-paper/70">{d.cap}</span>
              <span className="col-span-1 text-right font-mono text-[10px] text-paper/40">{d.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
