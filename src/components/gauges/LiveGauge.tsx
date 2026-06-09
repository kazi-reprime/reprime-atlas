"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value: number;        // 0..1 representing fill
  display: string;      // text inside ring (e.g. "4.28%")
  sub?: string;         // small subtext (e.g. "10Y UST")
  color?: "orange" | "gold" | "copper" | "emerald" | "rose";
  size?: number;
};

const COLOR_MAP: Record<NonNullable<Props["color"]>, { stroke: string; glow: string }> = {
  orange:  { stroke: "#E8763A", glow: "rgba(232,118,58,0.6)" },
  gold:    { stroke: "#D4AF37", glow: "rgba(212,175,55,0.6)" },
  copper:  { stroke: "#C89A4F", glow: "rgba(200,154,79,0.55)" },
  emerald: { stroke: "#34D399", glow: "rgba(52,211,153,0.5)" },
  rose:    { stroke: "#F87171", glow: "rgba(248,113,113,0.5)" },
};

export default function LiveGauge({ label, value, display, sub, color = "orange", size = 180 }: Props) {
  const [animated, setAnimated] = useState(0);
  const raf = useRef<number | null>(null);
  const startTs = useRef<number | null>(null);

  useEffect(() => {
    startTs.current = null;
    const step = (ts: number) => {
      if (startTs.current === null) startTs.current = ts;
      const elapsed = ts - startTs.current;
      const p = Math.min(1, elapsed / 1200);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(value * eased);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value]);

  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, animated)));
  const cm = COLOR_MAP[color];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={`g-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={cm.stroke} stopOpacity={0.9} />
              <stop offset="100%" stopColor={cm.stroke} stopOpacity={0.5} />
            </linearGradient>
            <filter id={`glow-${label}`}>
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={10} fill="none" />
          <circle
            cx={size/2}
            cy={size/2}
            r={r}
            stroke={`url(#g-${label})`}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            filter={`url(#glow-${label})`}
            style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
          {/* tick marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = size/2 + Math.cos(a) * (r - 14);
            const y1 = size/2 + Math.sin(a) * (r - 14);
            const x2 = size/2 + Math.cos(a) * (r - 8);
            const y2 = size/2 + Math.sin(a) * (r - 8);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.18)" strokeWidth={1} />;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="font-display text-3xl font-medium" style={{ color: cm.stroke }}>{display}</div>
          {sub && <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-paper/55">{sub}</div>}
        </div>
      </div>
      <div className="mt-3 text-center text-[11px] uppercase tracking-wider text-paper/65">{label}</div>
    </div>
  );
}
