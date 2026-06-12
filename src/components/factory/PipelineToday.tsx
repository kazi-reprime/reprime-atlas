"use client";
// The Pipeline — Today: properties stream in, the brain processes, LOIs go
// out. Three live columns mirroring the platform terminal's pipeline section.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SampleBadge from "@/components/ui/SampleBadge";
import { type Deal, makeDeal } from "./factory-data";

const PUSH_MS = 2100;
const MAX_ROWS = 7;

export default function PipelineToday() {
  const [propsIn, setPropsIn] = useState<Deal[]>([]);
  const [loisOut, setLoisOut] = useState<Deal[]>([]);
  const [processing, setProcessing] = useState<Deal | null>(null);
  const [counts, setCounts] = useState({ in: 1297, done: 1134, lois: 388 });

  useEffect(() => {
    setPropsIn(Array.from({ length: 5 }, makeDeal));
    setLoisOut(Array.from({ length: 3 }, makeDeal));
    setProcessing(makeDeal());
    const t = setInterval(() => {
      const roll = Math.random();
      if (roll < 0.5) {
        setPropsIn((p) => [makeDeal(), ...p].slice(0, MAX_ROWS));
        setCounts((c) => ({ ...c, in: c.in + 1 }));
      } else if (roll < 0.8) {
        setProcessing(makeDeal());
        setCounts((c) => ({ ...c, done: c.done + 1 }));
      } else {
        setLoisOut((p) => [makeDeal(), ...p].slice(0, MAX_ROWS - 2));
        setCounts((c) => ({ ...c, lois: c.lois + 1 }));
      }
    }, PUSH_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl border border-paper/10 bg-paper/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-copper" />
          The Pipeline · Today — raw address in, executed offer out
        </div>
        <SampleBadge dark />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <Column title={`${counts.in.toLocaleString()} properties in`} sub="commercial only · sourced nationwide">
          <Stream rows={propsIn} render={(d) => (
            <>
              <span className="truncate text-paper/85">{d.address}, {d.state}</span>
              <span className="truncate text-paper/50">{d.type} · {d.sf.toLocaleString()} SF · {d.city}</span>
            </>
          )} />
        </Column>

        <Column title={`${counts.done.toLocaleString()} processed`} sub="read · underwritten · diligenced · scored">
          {processing && (
            <motion.div key={processing.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-gold/25 bg-navy-deep/50 p-4">
              <div className="text-[10px] uppercase tracking-wider text-gold">Now processing</div>
              <div className="mt-1 truncate text-sm text-paper">{processing.state} · {processing.type}</div>
              <div className="mt-0.5 text-[11px] text-paper/55">{processing.below}% below · cap {processing.cap}%</div>
              <div className="mt-3 space-y-1.5 font-mono text-[10px] text-paper/60">
                <div className="flex justify-between"><span>THROUGHPUT</span><span className="text-emerald-300">{12 + (processing.id % 5)} docs/sec</span></div>
                <div className="flex justify-between"><span>DECISION LATENCY</span><span className="text-emerald-300">0.3s</span></div>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-copper to-gold"
                  initial={{ width: "10%" }}
                  animate={{ width: "92%" }}
                  transition={{ duration: PUSH_MS / 1000, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </Column>

        <Column title={`${counts.lois.toLocaleString()} LOIs & offers out`} sub="fast close · not subject to financing">
          <Stream rows={loisOut} render={(d) => (
            <>
              <span className="truncate text-paper/85">LOI · {d.type}, {d.state}</span>
              <span className="truncate text-paper/50">{d.badge} · {d.below}% below · cap {d.cap}% · {d.broker}</span>
            </>
          )} />
        </Column>
      </div>
    </div>
  );
}

function Column({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-base font-semibold tabular-nums text-paper">{title}</div>
      <div className="mb-3 text-[10px] uppercase tracking-wider text-paper/45">{sub}</div>
      {children}
    </div>
  );
}

function Stream({ rows, render }: { rows: Deal[]; render: (d: Deal) => React.ReactNode }) {
  return (
    <div className="space-y-1.5 overflow-hidden">
      <AnimatePresence initial={false}>
        {rows.map((d) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col rounded-lg border border-paper/[0.07] bg-paper/[0.03] px-3 py-1.5 text-[11px]"
          >
            {render(d)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
