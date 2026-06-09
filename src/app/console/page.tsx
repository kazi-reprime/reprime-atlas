import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Bell, UserCircle2, Database, Activity, Map, Building2, BellRing, BarChart3, AlertTriangle } from "lucide-react";

export const metadata = { title: "Console" };

const TICKER = [
  { sym: "UST10Y", val: "4.28%", chg: "+0.04", up: true },
  { sym: "SOFR",   val: "5.31%", chg: "0.00",  up: null },
  { sym: "VNQ",    val: "82.14", chg: "-0.12%", up: false },
  { sym: "SPG",    val: "148.90", chg: "+1.24%", up: true },
  { sym: "PLD",    val: "124.55", chg: "+0.45%", up: true },
  { sym: "EQIX",   val: "928.30", chg: "+0.9%", up: true },
  { sym: "AMT",    val: "214.66", chg: "+0.2%", up: true },
  { sym: "BBB",    val: "+182bp", chg: "-4",   up: true },
];

const KPIS = [
  { label: "LIVE SOURCES",  value: "22",     hint: "GOVT + MARKET" },
  { label: "CATALOG",       value: "1,155",  hint: "ACROSS 14 CATEGORIES" },
  { label: "COVERAGE",      value: "50",     hint: "US STATES + DC" },
  { label: "REFRESH",       value: "≤24H",   hint: "DAILY INGESTION" },
];

const SURFACES = [
  { icon: Map,        title: "Capital Flow",       href: "/globe",   body: "Animated arcs and particle streams tracing deal flow between metros, sized by volume and sector. 13 hubs · 16 arcs · live." },
  { icon: BarChart3,  title: "Market Signals",     href: "/markets", body: "Sector heatmap, REIT performance, Treasury curve, and credit spreads in one dense terminal-grade canvas. 10 sectors · live." },
  { icon: Database,   title: "Source Operations",  href: "/signals", body: "Live status pulse across 22 government and market endpoints; full catalog explorer over the 1,155 curated sources." },
  { icon: Building2,  title: "Metro Depth",        href: "/metros",  body: "25 US metros as a 3D extruded surface. Switch vacancy, cap-rate, absorption, or employment growth and the terrain redraws." },
];

const STATUS_ROWS = [
  { label: "LATENCY",        value: "14ms",      tone: "secondary" as const },
  { label: "THROUGHPUT",     value: "1.4 GB/S",  tone: "primary"   as const },
  { label: "ACTIVE QUERIES", value: "42,910",    tone: "primary"   as const },
  { label: "ERROR RATE",     value: "0.02%",     tone: "secondary" as const },
];

export default function ConsolePage() {
  return (
    <section className="relative font-[var(--font-inter)] text-[#e2e2e8]" style={{ background: "#0A0C10" }}>
      {/* Mesh + grid + scanline layers */}
      <div className="pointer-events-none absolute inset-0 stitch-mesh" />
      <div className="pointer-events-none absolute inset-0 stitch-grid" />
      <div className="pointer-events-none absolute inset-0 stitch-scanline" />

      {/* Top ticker */}
      <div className="relative z-10 h-8 overflow-hidden border-b border-[#424754] bg-[#0c0e12]/90 backdrop-blur-sm">
        <div className="flex h-full items-center gap-8 px-6 whitespace-nowrap animate-ticker-stitch font-[var(--font-jetbrains)] text-[12px]">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="uppercase text-[#c2c6d6]">{t.sym}</span>
              <span className="text-[#adc6ff]">{t.val}</span>
              <span className={`font-bold ${t.up === false ? "text-[#ffb4ab]" : t.up === true ? "text-[#4edea3]" : "text-[#c2c6d6]"}`}>{t.chg}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Console nav (overlay on top of the global nav — appears as a console-mode sub-toolbar) */}
      <div className="relative z-10 flex h-14 items-center justify-between border-b border-[#424754] bg-[#111418]/85 px-6 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <span className="font-display text-2xl font-bold tracking-tighter text-white">Atlas <span className="text-[#adc6ff]">Console</span></span>
          <div className="hidden gap-6 md:flex">
            <span className="border-b-2 border-[#adc6ff] pb-1 text-sm font-semibold text-[#adc6ff]">Console</span>
            <Link href="/terminal" className="text-sm font-medium text-[#c2c6d6] transition hover:text-[#adc6ff]">Terminal</Link>
            <Link href="/markets" className="text-sm font-medium text-[#c2c6d6] transition hover:text-[#adc6ff]">Markets</Link>
            <Link href="/signals" className="text-sm font-medium text-[#c2c6d6] transition hover:text-[#adc6ff]">Signals</Link>
            <Link href="/pulse" className="text-sm font-medium text-[#c2c6d6] transition hover:text-[#adc6ff]">Pulse</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded border border-[#424754] bg-[#1e2024] px-3 py-1 lg:flex">
            <Search size={14} className="text-[#c2c6d6]" />
            <span className="font-[var(--font-jetbrains)] text-[12px] uppercase tracking-wider text-[#c2c6d6]">Search terminal</span>
          </div>
          <Link href="/contact" className="rounded-sm bg-[#adc6ff] px-4 py-2 font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#00285d] transition hover:opacity-80">
            Request Access
          </Link>
          <Bell size={16} className="text-[#e2e2e8]" />
          <UserCircle2 size={18} className="text-[#e2e2e8]" />
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-[1440px] px-6 pb-24 pt-12">
        {/* HERO */}
        <section className="mb-24 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#adc6ff]/30 bg-[#adc6ff]/10 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#adc6ff]" />
              <span className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#adc6ff]">Live network active</span>
            </span>
            <h1 className="text-5xl font-bold leading-none tracking-tight text-white md:text-6xl">
              The institutional view of commercial real estate.
            </h1>
            <p className="max-w-xl text-[#c2c6d6]">
              Unified intelligence across 22 live data feeds and 1,155 verified institutional sources. Real-time capital flows, debt volatility, and hyper-local metro depth.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/globe" className="inline-flex h-12 items-center gap-3 bg-[#adc6ff] px-7 font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#00285d] transition hover:scale-105">
                Enter the Atlas <ArrowRight size={14} />
              </Link>
              <Link href="/sources" className="inline-flex h-12 items-center border border-[#8c909f] px-7 font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-[#1e2024]">
                Browse 1,155 sources
              </Link>
            </div>
          </div>

          {/* Node Status card */}
          <div className="stitch-glass relative overflow-hidden rounded-lg p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Node Status · US_WEST_01</span>
              <Database size={16} className="text-[#4edea3]" />
            </div>
            <div className="space-y-3 font-[var(--font-jetbrains)] text-[13px]">
              {STATUS_ROWS.map((r) => (
                <div key={r.label} className="flex items-center justify-between border-b border-[#424754]/40 pb-2">
                  <span className="text-[#c2c6d6]">{r.label}</span>
                  <span className={r.tone === "secondary" ? "text-[#4edea3]" : "text-[#adc6ff]"}>{r.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex h-28 items-end gap-1 rounded bg-[#1a1c20]/60 p-2">
              {[40, 60, 50, 90, 30, 45, 65, 40, 70, 55, 80, 35, 60, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{
                    height: `${h}%`,
                    background: i % 5 === 0 ? "rgba(78,222,163,0.55)" : i % 3 === 0 ? "rgba(173,198,255,0.65)" : "rgba(173,198,255,0.45)",
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* KPI Stats */}
        <section className="mb-24 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {KPIS.map((k, i) => (
            <div key={k.label} className="stitch-glass border-l-4 p-7" style={{ borderLeftColor: i % 2 === 0 ? "#adc6ff" : "#4edea3" }}>
              <div className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">{k.label}</div>
              <div className="mt-3 text-4xl font-bold text-white">{k.value}</div>
              <div className="mt-1 font-[var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[#8c909f]">{k.hint}</div>
            </div>
          ))}
        </section>

        {/* Surfaces */}
        <section className="mb-24">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-white">Surfaces</h2>
            <span className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#c2c6d6]">4 modules · 22 live feeds</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {SURFACES.map(({ icon: Icon, title, body, href }) => (
              <Link key={title} href={href} className="stitch-glass group block rounded-lg p-7 transition hover:border-[#adc6ff] hover:glow-blue">
                <div className="flex items-center justify-between">
                  <Icon size={22} className="text-[#adc6ff]" />
                  <span className="font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[#8c909f] transition group-hover:text-[#adc6ff]">Open →</span>
                </div>
                <h3 className="mt-5 text-2xl font-bold text-white">{title}</h3>
                <p className="mt-2 text-[#c2c6d6]">{body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Deal */}
        <section className="mb-24">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-white">The Palms at Doral</h2>
            <span className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#4edea3]">REVIEWED · MULTIFAMILY · DORAL, FL</span>
          </div>
          <div className="stitch-glass grid gap-0 overflow-hidden rounded-lg md:grid-cols-3">
            <div className="border-b border-[#424754] p-7 md:border-b-0 md:border-r">
              <div className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Underwrite snapshot</div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[
                  { l: "CAP", v: "6.2%" }, { l: "NOI", v: "$3.8M" }, { l: "IRR", v: "18.4%" },
                  { l: "CoC", v: "9.8%" }, { l: "DSCR", v: "1.45x" }, { l: "WALT", v: "7.2 yr" },
                ].map((m) => (
                  <div key={m.l}>
                    <div className="font-[var(--font-jetbrains)] text-[10px] uppercase text-[#8c909f]">{m.l}</div>
                    <div className="mt-1 font-[var(--font-jetbrains)] text-lg font-bold text-[#adc6ff]">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b border-[#424754] p-7 md:col-span-2 md:border-b-0">
              <div className="font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#c2c6d6]">Capital stack</div>
              <div className="mt-4 space-y-3">
                {[
                  { name: "Senior Debt", amount: "$45.9M", rate: "5.8%", pct: 75, color: "#adc6ff" },
                  { name: "Mezzanine",   amount: "$9.2M",  rate: "9.5%", pct: 15, color: "#4edea3" },
                  { name: "Equity",      amount: "$6.1M",  rate: "—",   pct: 10, color: "#ffb3ad" },
                ].map((t) => (
                  <div key={t.name}>
                    <div className="flex items-baseline justify-between font-[var(--font-jetbrains)] text-[12px]">
                      <span className="text-white">{t.name}</span>
                      <span className="text-[#c2c6d6]">{t.amount} {t.rate !== "—" && <span className="text-[#8c909f]">· {t.rate}</span>}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded bg-[#1a1c20]">
                      <div className="h-full" style={{ width: `${t.pct}%`, background: t.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-right font-[var(--font-jetbrains)] text-sm font-bold text-[#adc6ff]">Total $61.2M</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-lg py-20 text-center" style={{ background: "linear-gradient(135deg, #1a1c20 0%, #111418 100%)", border: "1px solid #2D333B" }}>
          <div className="absolute inset-0 stitch-grid opacity-50" />
          <div className="relative">
            <h2 className="text-4xl font-bold text-white md:text-5xl">Talk to us before you build it yourself</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#c2c6d6]">
              If you&apos;re piecing together CRE intelligence from FRED, Census, BLS, BEA, EIA, and forty broker portals — there&apos;s a faster path.
            </p>
            <Link href="/contact" className="mt-8 inline-flex h-14 items-center gap-3 bg-[#adc6ff] px-8 font-[var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-widest text-[#00285d] transition hover:scale-105">
              Request access <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Reference mockup */}
        <section className="mt-24">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-white">Design reference</h2>
            <span className="font-[var(--font-jetbrains)] text-[11px] uppercase tracking-widest text-[#8c909f]">Stitch mockup · 1600w</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#424754]">
            <Image
              src="/images/stitch-mockup.png"
              alt="Stitch CRE terminal design reference"
              width={1600}
              height={900}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        </section>
      </main>
    </section>
  );
}
