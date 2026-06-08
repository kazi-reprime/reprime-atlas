"use client";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { searchAddress } from "@/lib/reprime-api";

const EXAMPLES = [
  "8400 NW 36th St, Doral, FL 33166",
  "1 World Trade Center, New York, NY 10007",
  "300 Massachusetts Ave, Boston, MA 02115",
  "1660 Lincoln St, Denver, CO 80264",
];

export default function AddressSearch() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function go(addr?: string) {
    const target = addr ?? q;
    if (!target.trim()) return;
    if (addr) setQ(addr);
    setLoading(true);
    setErr(null);
    setResult(null);
    try {
      const r = await searchAddress(target);
      if (!r) setErr("RePrime /api/search returned no result. The endpoint may be cold or rate-limited.");
      else setResult(r);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => { e.preventDefault(); go(); }}
        className="flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-4 py-2.5 backdrop-blur"
      >
        <Search size={16} className="text-paper/60" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter a US street address…"
          className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-1.5 text-xs font-medium text-navy-deep hover:bg-orange-soft disabled:opacity-50"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : null}
          Fan out
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((e) => (
          <button
            key={e}
            onClick={() => go(e)}
            className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1 text-[11px] text-paper/70 transition hover:bg-paper/10"
          >
            {e}
          </button>
        ))}
      </div>

      {err && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {err}
        </div>
      )}

      {result && (
        <div className="rounded-lg border border-paper/10 bg-navy-deep/70 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-wider text-orange">Result</div>
            <div className="font-mono text-[10px] text-paper/50">{result.address ?? q}</div>
          </div>
          <pre className="overflow-auto rounded bg-ink/60 p-4 font-mono text-[11px] text-paper/85">
            {JSON.stringify(result, null, 2).slice(0, 4000)}
          </pre>
        </div>
      )}
    </div>
  );
}
