"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ to, durationMs = 1100, prefix = "", suffix = "", decimals = 0 }: {
  to: number; durationMs?: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (ts: number) => {
      if (start.current === null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / durationMs);
      // ease-out cubic
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, durationMs]);
  const display = val.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
  return <span>{prefix}{display}{suffix}</span>;
}
