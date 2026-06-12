"use client";
// Source Universe — real catalog stats from the RePrime Data Platform
// (/api/stats), rendered as animated category load bars.
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { REPRIME_API_BASE } from "@/lib/constants";

type Stats = { total: number; categories: number; byCategory: [string, number][] };

const FALLBACK: Stats = {
  total: 1787,
  categories: 14,
  byCategory: [
    ["other", 362], ["capital_markets", 175], ["economic", 161], ["zoning_parcel", 89],
    ["macro_indicator", 79], ["infrastructure", 68], ["hazard_environmental", 67],
    ["news_sentiment", 64], ["housing_re", 63], ["energy", 47], ["israeli", 39], ["demographic", 39],
  ],
};

const label = (k: string) => k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function SourceUniverse() {
  const [stats, setStats] = useState<Stats>(FALLBACK);
  const [isLive, setIsLive] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${REPRIME_API_BASE}/api/stats`, { cache: "force-cache" });
        if (!r.ok) return;
        const j = await r.json();
        const by: Record<string, number> = j.by_category ?? {};
        const entries = Object.entries(by).sort((a, b) => b[1] - a[1]);
        if (!cancelled && entries.length) {
          setStats({ total: j.cataloged_sources ?? FALLBACK.total, categories: j.category_count ?? entries.length, byCategory: entries });
          setIsLive(true);
        }
      } catch {
        // fallback stays — platform unreachable
      }
    })();
    const t = setInterval(() => setPulse((p) => p + 1), 2200);
    return () => { cancelled = true; clearInterval(t); };
  }, []);

  const max = Math.max(...stats.byCategory.map(([, n]) => n));

  return (
    <div className="rounded-2xl border border-paper/10 bg-paper/[0.03] p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gold">
          <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-gold" />
          Source Universe · {stats.total.toLocaleString()} live · {stats.categories} categories
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${isLive ? "bg-emerald-400/15 text-emerald-300" : "bg-paper/10 text-paper/50"}`}>
          {isLive ? "Live catalog" : "Cached"}
        </span>
      </div>
      <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {stats.byCategory.slice(0, 14).map(([k, n], i) => {
          // subtle per-bar shimmer so the panel reads as live
          const jitter = 1 + Math.sin((pulse + i) * 1.7) * 0.015;
          return (
            <div key={k} className="flex items-center gap-3 text-[11px]">
              <span className="w-40 shrink-0 truncate text-paper/65">{label(k)}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full border border-gold/15 bg-paper/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-copper to-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (n / max) * 100 * jitter)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <span className="w-10 shrink-0 text-right font-mono text-gold">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
