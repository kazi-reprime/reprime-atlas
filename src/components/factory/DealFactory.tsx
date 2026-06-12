"use client";
// Live deal cards — properties advance through the 12-step pipeline in real
// time; completed deals roll out and fresh ones roll in.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SampleBadge from "@/components/ui/SampleBadge";
import { type Deal, DILIGENCE_CHIPS, makeDeal, stageOf } from "./factory-data";

const ADVANCE_MS = 2600;

export default function DealFactory() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    setDeals([makeDeal(), makeDeal(), makeDeal()]);
    const t = setInterval(() => {
      setDeals((prev) => {
        const i = Math.floor(Math.random() * prev.length);
        return prev.map((d, j) => {
          if (j !== i) return d;
          const step = d.step + 1;
          return step > 12 ? makeDeal() : { ...d, step };
        });
      });
    }, ADVANCE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl border border-paper/10 bg-paper/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-orange">
          <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-orange" />
          Deal Factory · In Production
        </div>
        <SampleBadge dark />
      </div>
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {deals.map((d) => <DealCard key={d.id} d={d} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DealCard({ d }: { d: Deal }) {
  const stage = stageOf(d.step);
  const negotiating = d.step >= 10;
  const counterM = +(d.askM * 1.02).toFixed(1);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-paper/10 bg-navy-deep/40 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-sm font-medium text-paper">{d.address}</div>
          <div className="mt-0.5 text-[11px] text-paper/60">
            {d.state} · {d.city} · {d.type} · {d.sf.toLocaleString()} SF
          </div>
        </div>
        <div className="shrink-0 rounded-full glass-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gold">
          {stage} · {d.step}/12
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
        <Metric label="CAP" v={`${d.cap}%`} />
        <Metric label="DSCR" v={`${d.dscr}x`} />
        <Metric label="NOI" v={`$${d.noiM}M`} />
        <Metric label="IRR" v={`${d.irr}%`} />
      </div>

      {/* Pipeline progress */}
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper/10">
        <motion.div
          className="h-full bg-gradient-to-r from-orange to-gold"
          animate={{ width: `${(d.step / 12) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Diligence chips light up as the pipeline advances */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {DILIGENCE_CHIPS.map((c, i) => {
          const done = d.step >= 5 + i;
          return (
            <span
              key={c}
              className={`rounded border px-1.5 py-0.5 text-[10px] tracking-wide transition ${
                done ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-paper/15 text-paper/40"
              }`}
            >
              {c}
            </span>
          );
        })}
        <span className="ml-auto text-[10px] uppercase tracking-wider text-paper/55">
          {d.badge} · {d.below}% below · 30-day close
        </span>
      </div>

      {negotiating && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 rounded-lg border border-paper/10 bg-paper/[0.04] p-3 text-[11px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-paper/75">
            <span>✉ LOI — {d.type}, {d.city}</span>
            <span className="text-paper/55">Re: interested — {d.contact} · {d.broker}</span>
          </div>
          <div className="mt-2 flex items-center gap-4 font-mono">
            <span className="text-paper/70">Ask <span className="text-paper">${d.askM}M</span></span>
            <span className="text-gold">Counter ${counterM}M</span>
            <span className="ml-auto rounded bg-violet-400/15 px-1.5 py-0.5 text-[10px] text-violet-300">ZOOM · THU 2:30 CT</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function Metric({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg bg-paper/[0.04] py-1.5">
      <div className="text-[9px] uppercase tracking-wider text-paper/50">{label}</div>
      <div className="font-mono text-sm text-paper">{v}</div>
    </div>
  );
}
