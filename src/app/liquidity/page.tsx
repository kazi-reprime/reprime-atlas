import Link from "next/link";
import { ArrowRight, Database, Activity, Globe2, Search } from "lucide-react";

export const metadata = { title: "Liquidity terminal" };

const REGIONS = [
  { name: "North America", code: "AMER", volume: "$5.42B", chg: "+12%", up: true,  bar: "primary" },
  { name: "Eurozone",      code: "EMEA", volume: "$4.81B", chg: "-3%",  up: false, bar: "secondary" },
  { name: "Asia Pacific",  code: "APAC", volume: "$3.97B", chg: "+8%",  up: true,  bar: "outline" },
  { name: "Middle East",   code: "MENA", volume: "$1.84B", chg: "+22%", up: true,  bar: "primary" },
  { name: "LATAM",         code: "LATAM",volume: "$1.12B", chg: "-1%",  up: false, bar: "outline" },
];

const RLI = [
  { label: "Global Liquidity Pool",    value: "88.4 / 100",  color: "#adc6ff", path: "M0 35 Q10 15 20 25 T40 10 T60 30 T80 5 T100 20" },
  { label: "Institutional Yield Gap",  value: "4.2 bps",     color: "#4edea3", path: "M0 20 Q10 30 20 15 T40 35 T60 5 T80 25 T100 15" },
  { label: "Sovereign Spread Index",   value: "+118 bp",     color: "#F59E0B", path: "M0 25 Q10 20 20 30 T40 22 T60 18 T80 28 T100 10" },
  { label: "REIT Inflow Velocity",     value: "+$1.4B / 24h", color: "#adc6ff", path: "M0 30 Q10 25 20 18 T40 25 T60 10 T80 20 T100 15" },
];

const CORRIDORS = [
  { from: "LDN", to: "NYC", vol: "$241.5M", velocity: "High",  volatility: "0.2%" },
  { from: "SGP", to: "SFO", vol: "$184.2M", velocity: "Med",   volatility: "0.5%" },
  { from: "HKG", to: "LON", vol: "$156.9M", velocity: "Burst", volatility: "1.1%" },
  { from: "TKY", to: "NYC", vol: "$142.0M", velocity: "Med",   volatility: "0.4%" },
  { from: "DXB", to: "LON", vol: "$118.7M", velocity: "High",  volatility: "0.6%" },
];

export default function LiquidityPage() {
  return (
    <section className="relative min-h-screen" style={{ background: "#0A0C10", color: "#e2e2e8" }}>
      <div className="pointer-events-none absolute inset-0 stitch-mesh" />
      <div className="pointer-events-none absolute inset-0 stitch-grid" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#424754] bg-[#111418]/85 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl font-bold tracking-tighter">Atlas <span className="text-[#adc6ff]">Liquidity</span></span>
          <span className="hidden font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] md:inline">Global flow terminal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#adc6ff]/30 bg-[#adc6ff]/10 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#adc6ff]" />
            <span className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#adc6ff]">Live</span>
          </span>
          <Link href="/console" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Console</Link>
          <Link href="/risk-terrain" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Risk</Link>
          <Link href="/sector-heatmap" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Heatmap</Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-12 gap-px bg-[#424754] px-0">
        {/* Main flow visualization */}
        <main className="col-span-12 bg-[#0A0C10] p-6 lg:col-span-9">
          <div className="mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-white">Global Liquidity Terminal</h1>
            <p className="mt-1 max-w-2xl font-[var(--font-jetbrains)] text-[12px] uppercase tracking-wider text-[#c2c6d6]">
              22 live feeds · 1,248 active corridors · 5-region flow telemetry
            </p>
          </div>

          {/* Flow map placeholder */}
          <div className="stitch-glass relative h-[420px] overflow-hidden rounded-lg">
            <svg viewBox="0 0 800 420" className="absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="liq-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.10" />
                  <stop offset="70%" stopColor="#adc6ff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="liq-arc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#adc6ff" />
                  <stop offset="100%" stopColor="#4edea3" />
                </linearGradient>
              </defs>
              <rect width="800" height="420" fill="url(#liq-glow)" />
              {/* simplified world dots */}
              {Array.from({ length: 280 }).map((_, i) => {
                const x = (i * 53) % 800;
                const y = (i * 31) % 420;
                return <circle key={i} cx={x} cy={y} r="1" fill="rgba(173,198,255,0.25)" />;
              })}
              {/* Major hubs */}
              {[[180,180,"NYC"],[230,170,"LDN"],[630,200,"TKY"],[600,250,"SGP"],[150,250,"SFO"],[400,180,"FRA"],[460,235,"DXB"]].map(([x,y,name],i)=>(
                <g key={i}>
                  <circle cx={x as number} cy={y as number} r="14" fill="rgba(173,198,255,0.15)" />
                  <circle cx={x as number} cy={y as number} r="5" fill="#adc6ff" />
                  <text x={(x as number) + 10} y={(y as number) - 6} fontFamily="ui-monospace" fontSize="9" fill="#c2c6d6" letterSpacing="1.5">{name as string}</text>
                </g>
              ))}
              {/* Flow arcs */}
              <path d="M 230 170 Q 200 60 180 180" fill="none" stroke="url(#liq-arc)" strokeWidth="1.6" opacity="0.85" />
              <path d="M 630 200 Q 400 90 230 170" fill="none" stroke="url(#liq-arc)" strokeWidth="1.4" opacity="0.7" />
              <path d="M 600 250 Q 380 350 150 250" fill="none" stroke="url(#liq-arc)" strokeWidth="1.3" opacity="0.6" />
              <path d="M 460 235 Q 340 110 230 170" fill="none" stroke="#4edea3" strokeWidth="1.2" opacity="0.55" />
              {/* particle dots along arcs */}
              {[0.25, 0.5, 0.75].map((p, i) => (
                <circle key={i} cx={230 + (180-230)*p} cy={170 + Math.sin(p*Math.PI)*-50} r="2" fill="#adc6ff" />
              ))}
              <text x="20" y="34" fontFamily="ui-serif, Georgia, serif" fontSize="20" fontWeight="700" fill="#FAFAF7">RePrime Liquidity Index</text>
              <text x="20" y="54" fontFamily="ui-monospace" fontSize="10" fill="#c2c6d6" letterSpacing="2">RLI 88.4 · GLOBAL ↑ 1.2%</text>
            </svg>
          </div>

          {/* Bottom metric overlays */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="stitch-glass rounded-lg p-4">
              <div className="font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[#c2c6d6]">Avg. Transaction Speed</div>
              <div className="mt-2 font-[var(--font-jetbrains)] text-xl text-[#adc6ff]">12ms <span className="text-[10px] text-[#c2c6d6]">/ GLOBAL</span></div>
              <div className="mt-3 h-1 rounded-full bg-[#1a1c20]"><div className="h-full rounded-full bg-[#adc6ff]" style={{ width: "85%" }} /></div>
            </div>
            <div className="stitch-glass rounded-lg p-4">
              <div className="font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[#c2c6d6]">System Integrity</div>
              <div className="mt-2 font-[var(--font-jetbrains)] text-xl text-[#4edea3]">99.998%</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4edea3]" />
                <span className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase text-[#4edea3]">All Nodes Operational</span>
              </div>
            </div>
            <div className="stitch-glass rounded-lg p-4">
              <div className="font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[#c2c6d6]">Active Corridors</div>
              <div className="mt-2 font-[var(--font-jetbrains)] text-xl">1,248</div>
              <div className="mt-3 font-[var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[#c2c6d6]">Real-time Routing</div>
            </div>
          </div>
        </main>

        {/* Right intelligence sidebar */}
        <aside className="col-span-12 bg-[#0c0e12] p-6 lg:col-span-3">
          <section>
            <h3 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#adc6ff]">Flow Volume by Region</h3>
            <div className="mt-4 space-y-3">
              {REGIONS.map((r) => (
                <div key={r.code} className="group flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1.5" style={{ background: r.bar === "primary" ? "rgba(173,198,255,0.5)" : r.bar === "secondary" ? "rgba(78,222,163,0.45)" : "rgba(140,144,159,0.35)" }} />
                    <div>
                      <div className="text-xs font-bold">{r.name}</div>
                      <div className="font-[var(--font-jetbrains)] text-[10px] text-[#c2c6d6]">{r.code}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-[var(--font-jetbrains)] text-sm">{r.volume}</div>
                    <div className={`text-[10px] ${r.up ? "text-[#4edea3]" : "text-[#ffb4ab]"}`}>{r.up ? "↑" : "↓"} {r.chg}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 border-t border-[#424754] pt-6">
            <h3 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Liquidity Index (RLI)</h3>
            <div className="mt-4 space-y-4">
              {RLI.map((r) => (
                <div key={r.label}>
                  <div className="mb-1 flex items-baseline justify-between font-[var(--font-jetbrains)] text-[10px] font-bold uppercase">
                    <span>{r.label}</span>
                    <span style={{ color: r.color }}>{r.value}</span>
                  </div>
                  <div className="relative h-12 overflow-hidden rounded bg-[#1a1c20]">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                      <path d={r.path} fill="none" stroke={r.color} strokeWidth="1.6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 border-t border-[#424754] pt-6">
            <h3 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Top Intra-day Corridors</h3>
            <div className="mt-4 space-y-3">
              {CORRIDORS.map((c) => (
                <div key={`${c.from}-${c.to}`} className="cursor-pointer rounded border border-[#424754]/30 bg-[#1a1c20]/40 p-3 transition hover:border-[#adc6ff]/50">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase">{c.from} → {c.to}</span>
                    <span className="font-[var(--font-jetbrains)] text-xs text-[#adc6ff]">{c.vol}</span>
                  </div>
                  <div className="font-[var(--font-jetbrains)] text-[9px] uppercase tracking-tighter text-[#c2c6d6]">Velocity: {c.velocity} · Volatility: {c.volatility}</div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
