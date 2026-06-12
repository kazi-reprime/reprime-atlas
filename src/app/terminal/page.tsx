"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import HeroGlobe from "@/components/globe/HeroGlobe";
import BloombergTicker from "@/components/ticker/BloombergTicker";
import LiveHealthDots from "@/components/signals/LiveHealthDots";
import TreasuryCurve from "@/components/charts/TreasuryCurve";
import SpreadHistory from "@/components/charts/SpreadHistory";
import SectorTreemap from "@/components/heatmap/SectorTreemap";
import PropertyHeatmap from "@/components/heatmap/PropertyHeatmap";
import CompositionDonuts from "@/components/charts/CompositionDonuts";
import SourceGrid from "@/components/ops-grid/SourceGrid";
import SourceFlow from "@/components/flow/SourceFlow";
import RiskTerrain from "@/components/stitch/RiskTerrain";
import LiveGauge from "@/components/gauges/LiveGauge";
import SampleBadge from "@/components/ui/SampleBadge";
import DealFactory from "@/components/factory/DealFactory";
import LiveOpsFeed from "@/components/factory/LiveOpsFeed";
import OpsCounters from "@/components/factory/OpsCounters";
import PipelineToday from "@/components/factory/PipelineToday";
import SourceUniverse from "@/components/factory/SourceUniverse";
import GlassCard from "@/components/ui/GlassCard";
import { REPRIME_STATS, REPRIME_PORTFOLIO, REPRIME_FEATURED_DEAL } from "@/lib/reprime-data";

type Tab = "factory" | "overview" | "markets" | "liquidity" | "risk" | "sectors" | "pulse" | "signals";
const TABS: { k: Tab; label: string }[] = [
  { k: "factory",   label: "Factory"   },
  { k: "overview",  label: "Overview"  },
  { k: "markets",   label: "Markets"   },
  { k: "liquidity", label: "Liquidity" },
  { k: "risk",      label: "Risk"      },
  { k: "sectors",   label: "Sectors"   },
  { k: "pulse",     label: "Pulse"     },
  { k: "signals",   label: "Signals"   },
];

const GAUGES = [
  { label: "10Y Treasury",  display: "4.28%", sub: "UST10Y",  value: 0.74, color: "orange"  as const },
  { label: "SOFR overnight",display: "5.31%", sub: "SOFR",    value: 0.86, color: "copper"  as const },
  { label: "BBB CRE spread",display: "182bp", sub: "vs UST",  value: 0.52, color: "gold"    as const },
  { label: "Industrial vac.",display: "6.8%",  sub: "national",value: 0.32, color: "emerald" as const },
  { label: "Office vac.",    display: "18.4%", sub: "national",value: 0.79, color: "rose"    as const },
  { label: "MF NOI YoY",     display: "+2.4%", sub: "YoY",     value: 0.42, color: "emerald" as const },
  { label: "Cap rate avg.",  display: "6.7%",  sub: "blend",   value: 0.55, color: "gold"    as const },
  { label: "VNQ price",      display: "$87.42",sub: "REIT ETF",value: 0.62, color: "orange"  as const },
];

const ALERTS = [
  { code: "LIT: LONDON-TECH-RE",   time: "14:32:01", title: "Cap-Rate Compression Spike",   body: "Detected yield anomaly in Grade-A office space. DSCR hovering near 1.15x threshold.", level: "tertiary" as const },
  { code: "DOM: NY-FINANCIAL-DIST",time: "14:28:45", title: "Stabilization Signal",          body: "Volume increase in core-plus assets. Volatility normalizing.",                       level: "secondary" as const },
  { code: "HED: HK-REIT-INDEX",    time: "14:15:22", title: "Liquidity Delta Warning",       body: "Projected liquidity crunch within 48h based on current derivative flows.",          level: "outline" as const },
  { code: "GLO: LOGISTICS-HUB-EU", time: "13:55:10", title: "Vacancy Volatility Peak",       body: "Tenant departure in Warsaw Hub triggers local risk alert.",                          level: "tertiary" as const },
];
const lvl = { tertiary: "border-l-[#ffb3ad]", secondary: "border-l-[#4edea3]", outline: "border-l-[#8c909f] opacity-70" };

const REGIONS = [
  { name: "North America", code: "AMER",  volume: "$5.42B", chg: "+12%", up: true,  bar: "rgba(173,198,255,0.55)" },
  { name: "Eurozone",      code: "EMEA",  volume: "$4.81B", chg: "-3%",  up: false, bar: "rgba(78,222,163,0.5)"   },
  { name: "Asia Pacific",  code: "APAC",  volume: "$3.97B", chg: "+8%",  up: true,  bar: "rgba(140,144,159,0.4)"  },
  { name: "Middle East",   code: "MENA",  volume: "$1.84B", chg: "+22%", up: true,  bar: "rgba(173,198,255,0.55)" },
  { name: "LATAM",         code: "LATAM", volume: "$1.12B", chg: "-1%",  up: false, bar: "rgba(140,144,159,0.4)"  },
];

const SECTORS_BENTO = [
  { name: "OFFICE",       index: "68.2",  chg: "-1.4%", barPct: 32, accent: "#ffb4ab", chgColor: "#ffb4ab", border: false },
  { name: "INDUSTRIAL",   index: "114.5", chg: "+4.8%", barPct: 78, accent: "#4edea3", chgColor: "#4edea3", border: true  },
  { name: "RETAIL",       index: "92.1",  chg: "+0.2%", barPct: 45, accent: "#c2c6d6", chgColor: "#c2c6d6", border: false },
  { name: "MULTI-FAMILY", index: "105.7", chg: "+2.1%", barPct: 62, accent: "#adc6ff", chgColor: "#4edea3", border: false },
  { name: "DATA CENTERS", index: "138.4", chg: "+6.2%", barPct: 92, accent: "#4edea3", chgColor: "#4edea3", border: true  },
  { name: "LIFE SCI",     index: "121.8", chg: "+3.4%", barPct: 81, accent: "#adc6ff", chgColor: "#4edea3", border: true  },
];

export default function TerminalPage() {
  const [tab, setTab] = useState<Tab>("factory");
  const [pulseTick, setPulseTick] = useState(0);
  const [pulseVals, setPulseVals] = useState(GAUGES);

  useEffect(() => {
    const h = (window.location.hash.replace("#t=", "") || "factory") as Tab;
    if (TABS.some(t => t.k === h)) setTab(h);
    const fn = () => {
      const next = (window.location.hash.replace("#t=", "") || "factory") as Tab;
      if (TABS.some(t => t.k === next)) setTab(next);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setPulseTick(t => t + 1);
      setPulseVals(vs => vs.map(r => ({
        ...r,
        value: Math.max(0.08, Math.min(0.96, r.value + (Math.random() - 0.5) * 0.07)),
      })));
    }, 2500);
    return () => clearInterval(i);
  }, []);

  const setT = (k: Tab) => { setTab(k); window.history.replaceState(null, "", `#t=${k}`); };

  return (
    <section className="relative min-h-screen mesh-cool-dark text-paper noise">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-10">
        {/* Hero strip */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange">RePrime Terminal</div>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">
              All signals,<br /><span className="bg-gradient-to-r from-orange via-copper to-gold bg-clip-text text-transparent">one canvas.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-paper/70">
              Eight panels of institutional CRE intelligence. Hash-routed deep links (e.g. <span className="font-mono text-paper/90">#t=liquidity</span>) share the active panel.
            </p>
          </div>
          <LiveHealthDots />
        </div>

        {/* Tab navigator */}
        <nav className="mt-8 flex overflow-x-auto border-b border-paper/10">
          {TABS.map(t => (
            <button key={t.k} onClick={() => setT(t.k)}
              className={`relative shrink-0 px-5 py-3 text-xs font-medium uppercase tracking-wider transition ${
                tab === t.k ? "text-orange" : "text-paper/55 hover:text-paper/85"}`}>
              {t.label}
              {tab === t.k && <span className="absolute bottom-0 left-3 right-3 h-px bg-orange" />}
            </button>
          ))}
        </nav>

        <div className="mt-8">
          {tab === "factory"   && <Factory   />}
          {tab === "overview"  && <Overview  />}
          {tab === "markets"   && <Markets   />}
          {tab === "liquidity" && <Liquidity />}
          {tab === "risk"      && <Risk      />}
          {tab === "sectors"   && <Sectors   />}
          {tab === "pulse"     && <Pulse vals={pulseVals} tick={pulseTick} />}
          {tab === "signals"   && <Signals   />}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/55">
          <span>RePrime Terminal · {TABS.length} panels · share-by-hash deep links</span>
          <Link href="/info#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-copper px-4 py-2 text-paper">
            Request access <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Factory() {
  return (
    <div className="space-y-6">
      <OpsCounters />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <DealFactory />
        <LiveOpsFeed />
      </div>
      <PipelineToday />
      <SourceUniverse />
      <p className="text-[11px] text-paper/45">
        Live operations view — a vision instrument; production wires live CRE feeds server-side.
        Ingest rows stream real source names from the RePrime Data Platform catalog. <SampleBadge dark />
      </p>
    </div>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-paper/10 bg-paper/5 p-4">
      <div className="text-[10px] uppercase tracking-wider text-paper/50">{label}</div>
      <div className="mt-1 font-display text-3xl font-medium text-gold-soft">{value}</div>
      {sub && <div className="mt-0.5 text-[10px] text-paper/55">{sub}</div>}
    </div>
  );
}

function Overview() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-[360px] overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
          <HeroGlobe interactive />
        </div>
        <BloombergTicker />
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <Kpi label="Live sources" value={REPRIME_STATS.live_search_layers.toString()} sub="govt + market" />
          <Kpi label="Catalog"      value={REPRIME_STATS.cataloged_sources.toLocaleString()} sub={`${REPRIME_STATS.category_count} categories`} />
          <Kpi label="Portfolio"    value={REPRIME_PORTFOLIO.total_label} sub={`${REPRIME_PORTFOLIO.deals.length} positions`} />
          <Kpi label="Free-tier"    value={REPRIME_STATS.by_tier.free.toLocaleString()} sub="no key required" />
        </div>
        <GlassCard variant="dark" noise>
          <div className="text-[10px] uppercase tracking-wider text-orange">Featured underwrite</div>
          <div className="mt-2 font-display text-xl font-medium">{REPRIME_FEATURED_DEAL.name}</div>
          <div className="mt-0.5 font-mono text-[10px] text-paper/55">{REPRIME_FEATURED_DEAL.address}</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {REPRIME_FEATURED_DEAL.metrics.slice(0,6).map(m => (
              <div key={m.label} className="rounded border border-paper/10 bg-paper/5 p-2">
                <div className="text-[9px] uppercase tracking-wider text-paper/45">{m.label}</div>
                <div className="mt-0.5 font-mono text-sm text-paper">{m.value}</div>
              </div>
            ))}
          </div>
          <SampleBadge dark className="mt-4" />
        </GlassCard>
      </div>
    </div>
  );
}

function Markets() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg border border-paper/10 bg-paper">
        <SectorTreemap />
      </div>
      <div className="rounded-lg border border-paper/10 bg-navy-deep/60 p-5">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-wider text-orange">25-market property heatmap</div>
          <SampleBadge dark />
        </div>
        <div className="mt-4"><PropertyHeatmap /></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard variant="dark"><div className="text-[10px] uppercase tracking-wider text-orange">Treasury curve</div><div className="mt-4"><TreasuryCurve /></div></GlassCard>
        <GlassCard variant="dark"><div className="text-[10px] uppercase tracking-wider text-orange">CRE credit spreads (bp)</div><div className="mt-4"><SpreadHistory /></div></GlassCard>
      </div>
      <CompositionDonuts />
    </div>
  );
}

function Liquidity() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <GlassCard variant="dark" className="lg:col-span-8" noise>
        <div className="text-[11px] uppercase tracking-wider text-orange">Global Liquidity Index (RLI) · 88.4</div>
        <svg viewBox="0 0 800 360" className="mt-4 h-[320px] w-full">
          <defs>
            <linearGradient id="liqarc2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8763A" /><stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
          {Array.from({ length: 220 }).map((_, i) => (
            <circle key={i} cx={(i * 53) % 800} cy={(i * 31) % 360} r="1" fill="rgba(173,198,255,0.25)" />
          ))}
          {[[180,160,"NYC"],[230,150,"LDN"],[630,180,"TKY"],[600,230,"SGP"],[150,230,"SFO"],[400,160,"FRA"],[460,210,"DXB"]].map(([x,y,name],i)=>(
            <g key={i}>
              <circle cx={x as number} cy={y as number} r="13" fill="rgba(232,118,58,0.15)" />
              <circle cx={x as number} cy={y as number} r="5" fill="#E8763A" />
              <text x={(x as number)+10} y={(y as number)-6} fontFamily="ui-monospace" fontSize="9" fill="#FAFAF7" letterSpacing="1.5">{name as string}</text>
            </g>
          ))}
          <path d="M 230 150 Q 200 50 180 160" fill="none" stroke="url(#liqarc2)" strokeWidth="1.6" opacity="0.85" />
          <path d="M 630 180 Q 400 70 230 150" fill="none" stroke="url(#liqarc2)" strokeWidth="1.4" opacity="0.7" />
          <path d="M 600 230 Q 380 320 150 230" fill="none" stroke="url(#liqarc2)" strokeWidth="1.3" opacity="0.6" />
          <path d="M 460 210 Q 340 90 230 150" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.55" />
        </svg>
      </GlassCard>
      <div className="space-y-6 lg:col-span-4">
        <GlassCard variant="dark">
          <div className="text-[11px] uppercase tracking-wider text-orange">Flow Volume by Region</div>
          <div className="mt-4 space-y-3">
            {REGIONS.map(r => (
              <div key={r.code} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5" style={{ background: r.bar }} />
                  <div>
                    <div className="text-xs font-bold text-paper">{r.name}</div>
                    <div className="font-mono text-[10px] text-paper/55">{r.code}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{r.volume}</div>
                  <div className={`text-[10px] ${r.up ? "text-emerald-300" : "text-rose-300"}`}>{r.up ? "↑" : "↓"} {r.chg}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard variant="dark">
          <div className="text-[11px] uppercase tracking-wider text-orange">Top Intra-day Corridors</div>
          <div className="mt-4 space-y-3">
            {[["LDN","NYC","$241.5M","High","0.2%"],["SGP","SFO","$184.2M","Med","0.5%"],["HKG","LON","$156.9M","Burst","1.1%"],["TKY","NYC","$142.0M","Med","0.4%"]].map((c,i)=>(
              <div key={i} className="rounded border border-paper/10 bg-paper/5 p-3 transition hover:border-orange/40">
                <div className="flex items-center justify-between font-mono text-[11px]"><span className="font-bold uppercase">{c[0]} → {c[1]}</span><span className="text-orange">{c[2]}</span></div>
                <div className="font-mono text-[9px] uppercase tracking-tighter text-paper/55">Velocity: {c[3]} · Volatility: {c[4]}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Risk() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <GlassCard variant="dark" className="lg:col-span-8 p-0" noise>
        <div className="border-b border-paper/10 px-6 py-4">
          <div className="text-[11px] uppercase tracking-wider text-orange">Market risk terrain · live wave</div>
        </div>
        <div className="h-[460px]"><RiskTerrain /></div>
      </GlassCard>
      <GlassCard variant="dark" className="lg:col-span-4 p-0">
        <div className="border-b border-paper/10 bg-paper/5 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-wider text-orange">Volatility triggers</div>
            <span className="rounded bg-rose-900/40 px-1.5 py-0.5 text-[9px] font-bold text-rose-200">CRITICAL</span>
          </div>
        </div>
        <div className="space-y-3 p-5">
          {ALERTS.map(a => (
            <div key={a.code} className={`border-l-2 ${lvl[a.level]} bg-paper/5 p-3`}>
              <div className="mb-1 flex items-center justify-between font-mono text-[10px]"><span>{a.code}</span><span className="text-paper/55">{a.time}</span></div>
              <div className="text-xs font-medium text-paper">{a.title}</div>
              <div className="mt-1 text-[10px] leading-tight text-paper/55">{a.body}</div>
            </div>
          ))}
        </div>
      </GlassCard>
      <div className="lg:col-span-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[["DSCR shift (mean)","-0.14",65,"#ffb3ad"],["Cap-rate spread","+210bp",40,"#adc6ff"],["Leverage velocity","STABLE",15,"#4edea3"],["Liquidity index","4.88",82,"#FAFAF7"]].map((s,i)=>(
          <div key={i} className="rounded-lg border border-paper/10 bg-paper/5 p-4">
            <div className="text-[10px] uppercase tracking-wider text-paper/55">{s[0]}</div>
            <div className="mt-1 font-mono text-2xl" style={{ color: s[3] as string }}>{s[1]}</div>
            <div className="mt-3 h-1 overflow-hidden bg-paper/10"><div className="h-full" style={{ width: `${s[2]}%`, background: s[3] as string }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sectors() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <GlassCard variant="dark" className="lg:col-span-8 p-0">
        <div className="border-b border-paper/10 px-6 py-4">
          <div className="text-[11px] uppercase tracking-wider text-orange">CRE Sector Volatility</div>
        </div>
        <div className="p-6"><PropertyHeatmap /></div>
      </GlassCard>
      <div className="space-y-3 lg:col-span-4">
        {SECTORS_BENTO.map(s => (
          <div key={s.name} className={`rounded-lg border border-paper/10 bg-paper/5 p-4 transition hover:border-orange/40 ${s.border ? "border-l-2 border-l-[#adc6ff]" : ""}`}>
            <div className="mb-2 flex items-start justify-between">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: s.border ? "#adc6ff" : "#c2c6d6" }}>{s.name}</span>
              <span className="font-mono text-[10px]" style={{ color: s.chgColor }}>{s.chg}</span>
            </div>
            <div className="font-mono text-xl font-bold text-paper">{s.index} <span className="text-[10px] font-normal text-paper/55">INDEX</span></div>
            <div className="mt-2 h-1 overflow-hidden bg-paper/10"><div className="h-full" style={{ width: `${s.barPct}%`, background: s.accent }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pulse({ vals, tick }: { vals: typeof GAUGES; tick: number }) {
  return (
    <GlassCard variant="dark" noise shimmer className="px-6 py-10">
      <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
        {vals.map(r => <LiveGauge key={r.label} {...r} />)}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-paper/10 pt-4">
        <div className="font-mono text-[10px] uppercase tracking-wider text-paper/45">tick #{tick} · next refresh 2.5s · ease-out-cubic 600ms</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-orange" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-orange">streaming</span>
        </div>
      </div>
    </GlassCard>
  );
}

function Signals() {
  return (
    <div className="space-y-8">
      <BloombergTicker />
      <div className="rounded-lg border border-paper/10 bg-navy-deep/60 p-6">
        <div className="text-[11px] uppercase tracking-wider text-orange">Source-family → use-case → asset-type flow</div>
        <div className="mt-4"><SourceFlow /></div>
      </div>
      <SourceGrid />
    </div>
  );
}
