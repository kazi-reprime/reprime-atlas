"use client";
import { useMemo, useState } from "react";
import { LIVE_SOURCES, CATALOG_FAMILIES } from "@/lib/sample-data";
import SampleBadge from "@/components/ui/SampleBadge";
import { Search } from "lucide-react";

export default function SourcesPage() {
  const [q, setQ] = useState("");
  const all = useMemo(() => [
    ...LIVE_SOURCES.map((s) => ({ name: s.name, family: s.family, kind: "live" as const })),
    ...CATALOG_FAMILIES.flatMap((f) =>
      Array.from({ length: Math.min(20, f.count) }, (_, i) => ({
        name: `${f.name.split(" ")[0]} #${i + 1}`,
        family: f.name,
        kind: "catalog" as const,
      }))
    ),
  ], []);
  const filtered = useMemo(() => {
    if (!q.trim()) return all;
    const t = q.toLowerCase();
    return all.filter((s) => s.name.toLowerCase().includes(t) || s.family.toLowerCase().includes(t));
  }, [q, all]);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange">Catalog</div>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Source explorer</h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              Curated CRE-adjacent data sources. 22 are wired live to the address fan-out; the rest are registered in the catalog and surface progressively as their connectors land.
            </p>
          </div>
          <SampleBadge />
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-paper px-4 py-2.5">
          <Search size={16} className="text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by source name or family…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <span className="font-mono text-xs text-slate-500">{filtered.length} of {all.length}</span>
        </div>

        <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
          {filtered.slice(0, 120).map((s, i) => (
            <div key={`${s.name}-${i}`} className="group bg-paper p-4 transition hover:bg-slate-100/70">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{s.name}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${
                    s.kind === "live" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {s.kind}
                </span>
              </div>
              <div className="mt-1 font-mono text-[11px] text-slate-500">{s.family}</div>
            </div>
          ))}
        </div>
        {filtered.length > 120 && (
          <div className="mt-4 text-center text-xs text-slate-500">+ {filtered.length - 120} more — refine your filter to narrow.</div>
        )}
      </div>
    </section>
  );
}
