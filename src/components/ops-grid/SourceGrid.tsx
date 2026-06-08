import { LIVE_SOURCES, CATALOG_FAMILIES } from "@/lib/sample-data";
import SampleBadge from "@/components/ui/SampleBadge";

const statusColor: Record<"ok" | "warn" | "err", string> = {
  ok: "bg-emerald-300",
  warn: "bg-orange",
  err: "bg-rose-300",
};

export default function SourceGrid() {
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl font-medium text-paper">22 live endpoints</h3>
          <SampleBadge dark />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-paper/60">
          Each cell pulses on the most recent health probe. Latency is the response window for a single fan-out call from the RePrime Data Platform.
        </p>
        <div className="mt-6 grid gap-px bg-paper/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {LIVE_SOURCES.map((s) => (
            <div key={s.id} className="group bg-navy-deep/80 p-4 transition hover:bg-navy/80">
              <div className="flex items-center justify-between">
                <span className={`h-2 w-2 rounded-full ${statusColor[s.status]} animate-livepulse`} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-paper/40">{s.lastIngest} ago</span>
              </div>
              <div className="mt-3 text-sm font-medium text-paper">{s.name}</div>
              <div className="mt-0.5 font-mono text-[11px] text-paper/50">{s.family}</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="font-mono text-[11px] text-paper/60">{s.latencyMs}ms</div>
                <div className="h-px flex-1 bg-paper/10">
                  <div className="h-full bg-orange/60" style={{ width: `${Math.min(100, (s.latencyMs / 1500) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl font-medium text-paper">1,932-source catalog</h3>
          <SampleBadge dark />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-paper/60">
          Curated CRE-adjacent data sources grouped by family. Full searchable explorer at <span className="font-mono text-paper/80">/sources</span>.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {CATALOG_FAMILIES.map((f) => (
            <div key={f.name} className="rounded border border-paper/10 bg-paper/5 px-4 py-4">
              <div className="text-[11px] uppercase tracking-wider text-paper/50">{f.name}</div>
              <div className="mt-1 font-display text-3xl font-medium text-gold-soft">{f.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
