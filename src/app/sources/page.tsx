"use client";
import { useMemo, useState } from "react";
import { LIVE_SOURCES } from "@/lib/sample-data";
import { REPRIME_CATEGORIES, REPRIME_STATS } from "@/lib/reprime-data";
import SampleBadge from "@/components/ui/SampleBadge";
import { Search } from "lucide-react";
import SourceFlow from "@/components/flow/SourceFlow";

export default function SourcesPage() {
  const [q, setQ] = useState("");

  // Synthesize per-category source rows from the REAL category counts.
  const allSources = useMemo(() => {
    const live = LIVE_SOURCES.map((s) => ({
      name: s.name, family: s.family, kind: "live" as const, category: "capital_markets",
    }));
    const cataloged = REPRIME_CATEGORIES.flatMap((c) =>
      Array.from({ length: Math.min(40, c.count) }, (_, i) => ({
        name: `${c.label.split(" ")[0]} source #${i + 1}`,
        family: c.label,
        kind: "catalog" as const,
        category: c.key,
      }))
    );
    return [...live, ...cataloged];
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return allSources;
    const t = q.toLowerCase();
    return allSources.filter((s) => s.name.toLowerCase().includes(t) || s.family.toLowerCase().includes(t));
  }, [q, allSources]);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange">Catalog</div>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Source explorer</h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              {REPRIME_STATS.cataloged_sources.toLocaleString()} curated CRE-adjacent data sources across {REPRIME_STATS.category_count} categories.
              {" "}{REPRIME_STATS.live_search_layers} are wired to the live address fan-out; {REPRIME_STATS.keyless.toLocaleString()} are keyless;
              {" "}{REPRIME_STATS.by_tier.free.toLocaleString()} are free-tier. The rest register in the catalog and surface as their connectors land.
            </p>
          </div>
          <SampleBadge />
        </div>

        {/* Category roll-up — REAL counts */}
        <div className="mt-10">
          <div className="text-[11px] uppercase tracking-wider text-slate-500">By category — live counts from Reprime warehouse</div>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
            {REPRIME_CATEGORIES.map((c) => (
              <div key={c.key} className="rounded border border-border bg-paper p-3 transition hover:border-orange">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">{c.label}</div>
                <div className="mt-1 font-display text-2xl font-medium text-ink">{c.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow visualization — source family → use case → asset type */}
        <div className="mt-12">
          <div className="flex items-baseline justify-between">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Where the data flows · source family → use case → asset type</div>
            <SampleBadge />
          </div>
          <div className="mt-4">
            <SourceFlow />
          </div>
        </div>

        {/* Filter */}
        <div className="mt-10 flex items-center gap-3 rounded-full border border-border bg-paper px-4 py-2.5">
          <Search size={16} className="text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by source name or family…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <span className="font-mono text-xs text-slate-500">{filtered.length} of {allSources.length}</span>
        </div>

        <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
          {filtered.slice(0, 180).map((s, i) => (
            <div key={`${s.name}-${i}`} className="group bg-paper p-4 transition hover:bg-slate-100/70">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{s.name}</span>
                <span className={`rounded px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${
                  s.kind === "live" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}>
                  {s.kind}
                </span>
              </div>
              <div className="mt-1 font-mono text-[11px] text-slate-500">{s.family}</div>
            </div>
          ))}
        </div>
        {filtered.length > 180 && (
          <div className="mt-4 text-center text-xs text-slate-500">+ {filtered.length - 180} more — refine your filter to narrow.</div>
        )}
      </div>
    </section>
  );
}
