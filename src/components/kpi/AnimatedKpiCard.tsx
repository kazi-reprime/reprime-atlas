"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: string;
  sublabel?: string;
  live?: boolean;
};

export default function AnimatedKpiCard({ label, value, prefix = "", suffix = "", decimals = 0, accent = "#E8763A", sublabel, live = false }: Props) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / 1200);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-br from-paper/[0.06] to-paper/[0.02] p-5 backdrop-blur-md"
      style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)` }}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl" style={{ background: accent }} />
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <div className="text-[10px] uppercase tracking-wider text-paper/55">{label}</div>
          {live && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-emerald-300">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-300" /> live
            </span>
          )}
        </div>
        <div className="mt-2 font-display text-3xl font-medium tracking-tight" style={{ color: accent }}>
          {prefix}{n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}
        </div>
        {sublabel && <div className="mt-1 text-[10px] text-paper/45">{sublabel}</div>}
      </div>
    </motion.div>
  );
}
