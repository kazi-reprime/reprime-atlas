import Link from "next/link";
import RiskTerrain from "@/components/stitch/RiskTerrain";

export const metadata = { title: "Risk terrain" };

const ALERTS = [
  { code: "LIT: LONDON-TECH-RE",   time: "14:32:01", title: "Cap-Rate Compression Spike",   body: "Detected yield anomaly in Grade-A office space. DSCR hovering near 1.15x threshold.", level: "tertiary" },
  { code: "DOM: NY-FINANCIAL-DIST", time: "14:28:45", title: "Stabilization Signal",          body: "Volume increase in core-plus assets. Volatility normalizing in localized sectors.",   level: "secondary" },
  { code: "HED: HK-REIT-INDEX",    time: "14:15:22", title: "Liquidity Delta Warning",       body: "Projected liquidity crunch within 48h based on current derivative flows.",          level: "outline" },
  { code: "GLO: LOGISTICS-HUB-EU", time: "13:55:10", title: "Vacancy Volatility Peak",       body: "Unexpected tenant departure in Warsaw Hub triggers local risk alert.",              level: "tertiary" },
  { code: "DFW: INDUSTRIAL",        time: "13:42:08", title: "Absorption Surprise",          body: "Q-over-Q absorption rate +180bps above consensus.",                                  level: "secondary" },
  { code: "SFO: OFFICE",            time: "13:18:33", title: "Sell-off Initiated",            body: "CBD cap-rates expanding beyond 7.5% baseline.",                                      level: "tertiary" },
];

const STRESS = [
  { label: "DSCR Shift (Mean)",  value: "-0.14",     pct: 65, color: "#ffb3ad" },
  { label: "Cap-Rate Spread",     value: "+210bps",   pct: 40, color: "#adc6ff" },
  { label: "Leverage Velocity",   value: "STABLE",    pct: 15, color: "#4edea3" },
  { label: "Liquidity Index",     value: "4.88",      pct: 82, color: "#e2e2e8" },
];

const levelClass: Record<string, string> = {
  tertiary:  "border-l-[#ffb3ad] text-[#ffb3ad]",
  secondary: "border-l-[#4edea3] text-[#4edea3]",
  outline:   "border-l-[#8c909f] text-[#8c909f] opacity-70",
};

export default function RiskTerrainPage() {
  return (
    <section className="relative min-h-screen" style={{ background: "#0A0C10", color: "#e2e2e8" }}>
      <div className="pointer-events-none absolute inset-0 stitch-mesh" />

      <header className="relative z-10 flex items-center justify-between border-b border-[#424754] bg-[#111418]/85 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl font-bold tracking-tighter">Atlas <span className="text-[#adc6ff]">Risk</span></span>
          <span className="hidden font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] md:inline">Risk Intelligence Terminal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ffb3ad]/30 bg-[#ffb3ad]/10 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffb3ad]" />
            <span className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#ffb3ad]">2 Triggers</span>
          </span>
          <Link href="/liquidity" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Liquidity</Link>
          <Link href="/sector-heatmap" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Heatmap</Link>
          <Link href="/console" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Console</Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-12 grid-rows-6 gap-px bg-[#424754]">
        {/* Terrain canvas */}
        <section className="col-span-12 row-span-4 bg-[#111418] lg:col-span-9">
          <div className="relative h-full min-h-[480px]">
            <RiskTerrain />
            <div className="absolute left-6 top-6 z-10">
              <div className="stitch-glass rounded-sm p-4">
                <h2 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#adc6ff]">Market Risk Terrain</h2>
                <h3 className="mt-1 text-2xl font-bold uppercase tracking-tighter text-white">Volatility Topography</h3>
                <div className="mt-3 flex gap-4 font-[var(--font-jetbrains)] text-[11px] text-[#c2c6d6]">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#4edea3]" />Stable</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ffb3ad]" />Elevated</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#adc6ff]" />Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alert feed sidebar */}
        <section className="col-span-12 row-span-6 flex flex-col overflow-hidden bg-[#0c0e12] lg:col-span-3 lg:row-span-4">
          <div className="border-b border-[#424754] bg-[#1e2024] p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest">Volatility Triggers</h3>
              <span className="rounded bg-[#93000a] px-1.5 py-0.5 text-[9px] font-bold text-[#ffdad6]">CRITICAL</span>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {ALERTS.map((a) => (
              <div key={`${a.code}-${a.time}`} className={`group cursor-pointer border-l-2 bg-[#1a1c20] p-3 transition hover:bg-[#282a2e] ${levelClass[a.level]}`}>
                <div className="mb-1 flex items-center justify-between font-[var(--font-jetbrains)] text-[10px]">
                  <span>{a.code}</span>
                  <span className="text-[#8c909f]">{a.time}</span>
                </div>
                <div className="text-xs font-medium text-white">{a.title}</div>
                <div className="mt-1 text-[10px] leading-tight text-[#8c909f]">{a.body}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#424754] p-4">
            <button className="w-full font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#adc6ff] hover:underline">View all historical alerts</button>
          </div>
        </section>

        {/* Bottom stress indicators */}
        <section className="col-span-12 row-span-2 grid grid-cols-2 gap-px border-t border-[#424754] bg-[#424754] lg:col-span-9 lg:grid-cols-4">
          {STRESS.map((s) => (
            <div key={s.label} className="flex flex-col justify-between bg-[#1a1c20] p-5">
              <div>
                <div className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#8c909f]">{s.label}</div>
                <div className="mt-1 font-[var(--font-jetbrains)] text-2xl" style={{ color: s.color }}>{s.value}</div>
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden bg-[#333539]">
                <div className="h-full" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
