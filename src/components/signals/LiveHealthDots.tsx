"use client";
import { useEffect, useState } from "react";
import { getHealth } from "@/lib/reprime-api";

export default function LiveHealthDots() {
  const [state, setState] = useState<"loading" | "ok" | "warn" | "err">("loading");
  const [ts, setTs] = useState<string | null>(null);
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const start = performance.now();
      const r = await getHealth({ cache: "no-store" });
      if (cancelled) return;
      const latency = Math.round(performance.now() - start);
      setMs(latency);
      setTs(new Date().toLocaleTimeString());
      setState(r?.ok === true ? "ok" : r ? "warn" : "err");
    };
    tick();
    const i = setInterval(tick, 30_000);
    return () => { cancelled = true; clearInterval(i); };
  }, []);

  const color =
    state === "ok" ? "bg-emerald-300"
    : state === "warn" ? "bg-orange"
    : state === "err" ? "bg-rose-300"
    : "bg-paper/30";

  const label =
    state === "ok" ? "RePrime Data Platform · OK"
    : state === "warn" ? "Degraded"
    : state === "err" ? "Unreachable"
    : "Probing…";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-navy-deep/70 px-3 py-1.5 backdrop-blur">
      <span className={`h-2 w-2 rounded-full ${color} animate-livepulse`} />
      <span className="text-[11px] font-medium text-paper">{label}</span>
      {ms !== null && <span className="font-mono text-[10px] text-paper/50">· {ms}ms</span>}
      {ts && <span className="font-mono text-[10px] text-paper/40">· {ts}</span>}
    </div>
  );
}
