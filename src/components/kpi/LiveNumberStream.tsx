"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const METRICS = [
  { label: "UST 10Y",        value: "4.28%",   delta: "+0.04", up: true  },
  { label: "SOFR",           value: "5.31%",   delta: "+0.00", up: false },
  { label: "VNQ",            value: "$87.42",  delta: "+0.6%", up: true  },
  { label: "BBB CRE",        value: "+182bp",  delta: "-4",    up: true  },
  { label: "Industrial Vac", value: "6.8%",    delta: "-20bp", up: true  },
  { label: "Office Vac",     value: "18.4%",   delta: "+15bp", up: false },
  { label: "MF NOI YoY",     value: "+2.4%",   delta: "+30bp", up: true  },
  { label: "Cap Rate",       value: "6.7%",    delta: "+10bp", up: false },
  { label: "EQIX",           value: "$928.30", delta: "+0.9%", up: true  },
];

export default function LiveNumberStream() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx(j => (j + 1) % METRICS.length), 1800);
    return () => clearInterval(i);
  }, []);
  const cur = METRICS[idx];
  return (
    <div className="relative h-24 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-paper/55">{cur.label}</div>
          <div className="mt-1 font-display text-4xl font-medium text-gold-soft">{cur.value}</div>
          <div className={`mt-1 font-mono text-xs ${cur.up ? "text-emerald-300" : "text-rose-300"}`}>
            {cur.up ? "▲" : "▼"} {cur.delta}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
