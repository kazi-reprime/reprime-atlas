"use client";
import { useEffect, useState } from "react";

export type TabKey = "overview" | "pipeline" | "capital" | "market" | "risk";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "pipeline", label: "Pipeline" },
  { key: "capital", label: "Capital" },
  { key: "market", label: "Market" },
  { key: "risk", label: "Risk" },
];

export default function TerminalTabs({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  useEffect(() => {
    const h = window.location.hash.replace("#t=", "") as TabKey;
    if (TABS.some((t) => t.key === h)) onChange(h);
    const fn = () => {
      const next = window.location.hash.replace("#t=", "") as TabKey;
      if (TABS.some((t) => t.key === next)) onChange(next);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTab = (k: TabKey) => {
    onChange(k);
    window.history.replaceState(null, "", `#t=${k}`);
  };

  return (
    <div className="flex overflow-x-auto border-b border-paper/10">
      {TABS.map((t) => (
        <button
          key={t.key}
          onClick={() => setTab(t.key)}
          className={`relative px-5 py-3 text-xs font-medium uppercase tracking-wider transition ${
            active === t.key ? "text-orange" : "text-paper/55 hover:text-paper/85"
          }`}
        >
          {t.label}
          {active === t.key && <span className="absolute bottom-0 left-3 right-3 h-px bg-orange" />}
        </button>
      ))}
    </div>
  );
}
