import Link from "next/link";

export const metadata = { title: "Sector heatmap" };

const SECTORS = [
  { name: "OFFICE",        index: "68.2",  chg: "-1.4%", barPct: 32, accent: "#ffb4ab", chgColor: "#ffb4ab", border: false },
  { name: "INDUSTRIAL",    index: "114.5", chg: "+4.8%", barPct: 78, accent: "#4edea3", chgColor: "#4edea3", border: true },
  { name: "RETAIL",        index: "92.1",  chg: "+0.2%", barPct: 45, accent: "#c2c6d6", chgColor: "#c2c6d6", border: false },
  { name: "MULTI-FAMILY",  index: "105.7", chg: "+2.1%", barPct: 62, accent: "#adc6ff", chgColor: "#4edea3", border: false },
  { name: "DATA CENTERS",  index: "138.4", chg: "+6.2%", barPct: 92, accent: "#4edea3", chgColor: "#4edea3", border: true },
  { name: "LIFE SCIENCES", index: "121.8", chg: "+3.4%", barPct: 81, accent: "#adc6ff", chgColor: "#4edea3", border: true },
  { name: "HEALTHCARE",    index: "98.9",  chg: "+0.6%", barPct: 52, accent: "#c2c6d6", chgColor: "#4edea3", border: false },
  { name: "HOSPITALITY",   index: "74.5",  chg: "-2.1%", barPct: 35, accent: "#ffb4ab", chgColor: "#ffb4ab", border: false },
];

const SIGNALS = [
  { tone: "secondary", title: "Transaction Spike", body: "Austin industrial sector seeing 14% WoW increase in institutional bidding activity." },
  { tone: "error",     title: "Liquidity Warning",  body: "SF CBD Office cap-rates expanding beyond 7.5% baseline. Sell-off initiated." },
  { tone: "secondary", title: "Yield Compression",  body: "DFW logistics caps tightening 30bps month-over-month." },
  { tone: "error",     title: "Vacancy Spike",      body: "Chicago Loop office vacancy crosses 22.5%." },
];

const signalColor: Record<string, string> = {
  secondary: "#4edea3",
  error:     "#ffb4ab",
};

const VINTAGE = [
  { label: "PRE-1980",     active: false },
  { label: "1980 – 2000",  active: false },
  { label: "2000 – 2015",  active: false },
  { label: "POST-2015",    active: true  },
];

const SUBTYPES = [
  { label: "Class-A Commercial", checked: true },
  { label: "Logistics Hubs",     checked: true },
  { label: "Data Centers",       checked: false },
  { label: "Life Sciences",      checked: false },
  { label: "Mixed-Use",          checked: true },
];

export default function SectorHeatmapPage() {
  return (
    <section className="relative min-h-screen" style={{ background: "#0A0C10", color: "#e2e2e8" }}>
      <div className="pointer-events-none absolute inset-0 stitch-mesh" />

      <header className="relative z-10 flex items-center justify-between border-b border-[#424754] bg-[#111418]/85 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl font-bold tracking-tighter">Atlas <span className="text-[#adc6ff]">Heatmap</span></span>
          <span className="hidden font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] md:inline">Sector Performance Terminal</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/liquidity" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Liquidity</Link>
          <Link href="/risk-terrain" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Risk</Link>
          <Link href="/console" className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6] hover:text-[#adc6ff]">Console</Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-56px)] max-w-[1440px] grid-cols-12 gap-px bg-[#424754]">
        {/* Heatmap canvas */}
        <section className="relative col-span-12 overflow-hidden bg-[#0c0e12] p-6 lg:col-span-9">
          {/* Context overlay */}
          <div className="absolute left-6 top-6 z-10">
            <div className="stitch-glass rounded-sm p-4">
              <h2 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#adc6ff]">Real-time Heatmap</h2>
              <h3 className="mt-1 text-2xl font-bold uppercase tracking-tighter text-white">CRE Sector Volatility</h3>
              <div className="mt-3 flex gap-4 font-[var(--font-jetbrains)] text-[11px] text-[#c2c6d6]">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#4edea3]" />High Growth</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ffb4ab]" />High Risk</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#8c909f]" />Neutral</span>
              </div>
            </div>
          </div>

          {/* Synthetic heatmap background */}
          <svg viewBox="0 0 600 400" className="h-full min-h-[460px] w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="hot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4edea3" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#4edea3" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffb4ab" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#ffb4ab" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cool" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.45" />
                <stop offset="80%" stopColor="#adc6ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[[120,140,90,"hot"],[460,120,120,"cold"],[300,250,160,"cool"],[150,320,80,"cold"],[520,300,100,"hot"],[400,80,70,"cool"]].map(([x,y,r,grad],i)=>(
              <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={`url(#${grad})`} />
            ))}
            {/* Grid scaffolding */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i*32} y1="0" x2={i*32} y2="400" stroke="rgba(45,51,59,0.25)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i*32} x2="600" y2={i*32} stroke="rgba(45,51,59,0.25)" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Bento asset class tiles */}
          <div className="absolute bottom-6 right-6 z-10 grid w-[460px] grid-cols-2 gap-2">
            {SECTORS.slice(0, 4).map((s) => (
              <div key={s.name} className={`stitch-glass p-3 transition hover:glow-blue ${s.border ? "border-l-2 border-l-[#adc6ff]" : ""}`}>
                <div className="mb-2 flex items-start justify-between">
                  <span className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest" style={{ color: s.border ? "#adc6ff" : "#c2c6d6" }}>{s.name}</span>
                  <span className="font-[var(--font-jetbrains)] text-[10px]" style={{ color: s.chgColor }}>{s.chg}</span>
                </div>
                <div className="font-[var(--font-jetbrains)] text-xl font-bold">{s.index} <span className="text-[10px] font-normal text-[#c2c6d6]">INDEX</span></div>
                <div className="mt-2 h-1 overflow-hidden bg-[#333539]"><div className="h-full" style={{ width: `${s.barPct}%`, background: s.accent }} /></div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter + signals sidebar */}
        <aside className="col-span-12 flex flex-col bg-[#0c0e12] lg:col-span-3">
          <div className="border-b border-[#424754] bg-[#1e2024] p-5">
            <h3 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#adc6ff]">Filters & Refinement</h3>
            <div className="mt-5 space-y-5">
              <div>
                <label className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Region</label>
                <select defaultValue="NA" className="mt-2 w-full bg-[#1a1c20] p-2 font-[var(--font-jetbrains)] text-xs text-white outline-none ring-1 ring-[#424754] focus:ring-[#adc6ff]">
                  <option value="NA">North America (All)</option>
                  <option value="EU">EMEA — West</option>
                  <option value="AP">APAC — Coastal</option>
                  <option value="LA">LATAM — Emerging</option>
                </select>
              </div>
              <div>
                <label className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Vintage (Construction)</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {VINTAGE.map((v) => (
                    <button key={v.label} className={`p-2 text-[11px] font-bold uppercase tracking-widest transition ${v.active ? "border border-[#adc6ff] bg-[#adc6ff]/10 text-[#adc6ff]" : "border border-[#424754] text-[#c2c6d6] hover:bg-[#1a1c20]"}`}>{v.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Asset Sub-Type</label>
                <div className="mt-2 space-y-1">
                  {SUBTYPES.map((s) => (
                    <label key={s.label} className="flex cursor-pointer items-center gap-3 border border-transparent bg-[#1a1c20]/40 p-2 transition hover:border-[#424754]">
                      <input type="checkbox" defaultChecked={s.checked} className="h-3.5 w-3.5 cursor-pointer accent-[#adc6ff]" />
                      <span className="font-[var(--font-jetbrains)] text-[11px]">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <h4 className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Market Signals</h4>
            <div className="mt-4 space-y-4">
              {SIGNALS.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 self-stretch" style={{ background: signalColor[s.tone] }} />
                  <div>
                    <div className="font-[var(--font-jetbrains)] text-[12px] font-bold uppercase" style={{ color: signalColor[s.tone] }}>{s.title}</div>
                    <p className="mt-1 text-[11px] leading-tight text-[#c2c6d6]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#424754] bg-[#111418] p-5">
            <button className="w-full bg-[#adc6ff] py-3 font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#00285d] transition hover:brightness-110 active:translate-y-px">
              Generate Sector Report
            </button>
          </div>
        </aside>
      </div>

      {/* Extended sector list */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h3 className="text-xl font-bold tracking-tight text-white">All sectors</h3>
          <span className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6]">Sortable · {SECTORS.length} rows</span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-[#424754] md:grid-cols-4">
          {SECTORS.map((s) => (
            <div key={s.name} className="bg-[#0c0e12] p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-[var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#c2c6d6]">{s.name}</span>
                <span className="font-[var(--font-jetbrains)] text-[11px]" style={{ color: s.chgColor }}>{s.chg}</span>
              </div>
              <div className="mt-2 font-[var(--font-jetbrains)] text-xl text-white">{s.index}</div>
              <div className="mt-2 h-1 overflow-hidden bg-[#1a1c20]"><div className="h-full" style={{ width: `${s.barPct}%`, background: s.accent }} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
