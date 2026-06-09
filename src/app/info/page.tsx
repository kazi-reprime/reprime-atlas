"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, Banknote, Code2, Globe2, ShieldCheck, Send, CheckCircle2, Search, ArrowRight } from "lucide-react";
import SampleBadge from "@/components/ui/SampleBadge";
import AddressSearch from "@/components/explore/AddressSearch";
import SourceFlow from "@/components/flow/SourceFlow";
import { LIVE_SOURCES, CATALOG_FAMILIES } from "@/lib/sample-data";
import { REPRIME_ABOUT, REPRIME_TEAM, REPRIME_STATS, REPRIME_CATEGORIES } from "@/lib/reprime-data";

const PILLARS = [
  { title: "Honest numbers",  body: "Every visible value is either live-bound or carries a Sample badge. The audit rule that came out of 2026-06-08." },
  { title: "Source breadth",  body: `${REPRIME_STATS.live_search_layers} live endpoints + ${REPRIME_STATS.cataloged_sources.toLocaleString()}-entry catalog across ${REPRIME_STATS.category_count} categories.` },
  { title: "Visual density",  body: "Bloomberg-grade information density paired with editorial restraint. Dark 3D pockets between light surfaces." },
];

const TEAM_ROLES = [
  { icon: Building2, name: "Acquisitions & Development", body: "Sourcing, structuring, and execution across all CRE asset classes. Operating experience, not consulting overlays." },
  { icon: Banknote,  name: "Capital Markets",            body: "Senior debt, mezzanine, JV equity. Direct relationships with institutional lenders, family offices, and program partners." },
  { icon: Code2,     name: "Technology & Data",          body: "The team behind the RePrime Data Platform and this Atlas visualization layer. Production data engineering." },
  { icon: Globe2,    name: "International Operations",   body: "Cross-border execution and capital introductions across North America and select international markets." },
];

const PARTNERS = [
  { icon: Building2,  title: "Operating partners", body: "Sponsors and operators with deep vertical expertise. We co-invest where their operational edge is real." },
  { icon: Banknote,   title: "Capital partners",   body: "Institutional LPs, family offices, and private credit funds. Long-duration capital across all profiles." },
  { icon: Globe2,     title: "Cross-border partners", body: "Coordinated diligence and reporting across North America and select international markets." },
  { icon: ShieldCheck,title: "Diligence partners", body: "Legal, environmental, construction, and tax counsel embedded into the underwriting cycle." },
];

const FAQS = [
  { q: "What is RePrime Atlas?", a: "A visualization layer over the RePrime Data Platform. Atlas reads from the same warehouse and address fan-out that powers our institutional intelligence, then renders it across Globe, Terminal, Visualize, and Info surfaces." },
  { q: "Is the data live?",      a: "The platform underneath (22 govt/market APIs, daily Supabase ingest) is live. Atlas surfaces marked with a Sample badge are illustrative until v2 wiring lands." },
  { q: "Who is this for?",       a: "Analysts, allocators, and operators evaluating a CRE thesis, market, portfolio, or single asset." },
  { q: "What data sources are wired?", a: "FRED, Census ACS, Census Geocoder, BLS, BEA, EIA, US Treasury, SEC EDGAR, FHFA, HUD PDR, EPA ECHO, NOAA ACIS, FEMA NFIP, USGS, OSM Overpass, Wikidata, Finnhub, Alpha Vantage, Twelve Data, Mapillary, Socrata, RePrime Market." },
  { q: "Is there an API?",       a: "The underlying data platform exposes /api/search (live address fan-out, 13s budget) and /api/health. Atlas v2 will expose its own query API." },
  { q: "How do I get access?",   a: "Request access in the form below. We respond within two business days." },
];

const statusColor: Record<string, string> = { ok: "bg-emerald-400", warn: "bg-amber-400", err: "bg-rose-400" };

export default function InfoPage() {
  const [q, setQ] = useState("");
  const [cstatus, setCstatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const [cerr, setCerr] = useState<string|null>(null);

  const allSources = useMemo(() => {
    const live = LIVE_SOURCES.map(s => ({ name: s.name, family: s.family, kind: "live" as const }));
    const cat = REPRIME_CATEGORIES.flatMap(c =>
      Array.from({ length: Math.min(20, c.count) }, (_, i) => ({ name: `${c.label.split(" ")[0]} #${i+1}`, family: c.label, kind: "catalog" as const }))
    );
    return [...live, ...cat];
  }, []);
  const filtered = useMemo(() => {
    if (!q.trim()) return allSources;
    const t = q.toLowerCase();
    return allSources.filter(s => s.name.toLowerCase().includes(t) || s.family.toLowerCase().includes(t));
  }, [q, allSources]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCstatus("sending"); setCerr(null);
    const fd = new FormData(e.currentTarget);
    const payload = { name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), firm: String(fd.get("firm") ?? ""), role: String(fd.get("role") ?? ""), message: String(fd.get("message") ?? "") };
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setCerr(j.error ?? "Submission failed"); setCstatus("err"); return; }
      setCstatus("ok");
    } catch (e) { setCerr(e instanceof Error ? e.message : "Network error"); setCstatus("err"); }
  }

  return (
    <>
      {/* In-page nav */}
      <nav className="sticky top-14 z-30 border-b border-border bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-6 text-xs uppercase tracking-wider">
          {["about","team","partners","sources","explorer","faq","contact"].map(s => (
            <a key={s} href={`#${s}`} className="shrink-0 px-4 py-3 text-slate-700 transition hover:text-orange">{s}</a>
          ))}
        </div>
      </nav>

      {/* ABOUT */}
      <section id="about" className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-orange">{REPRIME_ABOUT.eyebrow}</div>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">{REPRIME_ABOUT.headline}</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">{REPRIME_ABOUT.body}</p>
          <div className="mt-10 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {REPRIME_ABOUT.proof.map(p => (
              <div key={p.label} className="bg-paper p-5">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">{p.label}</div>
                <div className="mt-1 font-display text-2xl font-medium">{p.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {PILLARS.map(p => (<div key={p.title} className="bg-paper p-6"><div className="font-display text-xl font-medium">{p.title}</div><p className="mt-2 text-sm leading-relaxed text-slate-700">{p.body}</p></div>))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="border-t border-border bg-slate-50/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-orange">{REPRIME_TEAM.eyebrow}</div>
          <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">{REPRIME_TEAM.headline}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">{REPRIME_TEAM.body}</p>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {TEAM_ROLES.map(({ icon: Icon, name, body }) => (
              <div key={name} className="bg-paper p-7"><Icon size={22} className="text-orange" /><div className="mt-4 font-display text-xl font-medium">{name}</div><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="border-t border-border bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-orange">Partners</div>
          <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">How we work with others.</h2>
          <p className="mt-4 max-w-2xl text-slate-700">RePrime executes alongside operators, capital partners, and diligence specialists chosen for fit per transaction.</p>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {PARTNERS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-paper p-7"><Icon size={22} className="text-orange" /><div className="mt-4 font-display text-xl font-medium">{title}</div><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section id="sources" className="border-t border-border bg-slate-50/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Source catalog</div>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">{REPRIME_STATS.cataloged_sources.toLocaleString()} curated sources.</h2>
              <p className="mt-3 max-w-2xl text-slate-700">{REPRIME_STATS.live_search_layers} are wired to the live fan-out; {REPRIME_STATS.keyless.toLocaleString()} are keyless. Flow below shows how each family connects to use case and asset type.</p>
            </div>
            <SampleBadge />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-7">
            {REPRIME_CATEGORIES.map(c => (
              <div key={c.key} className="rounded border border-border bg-paper p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500">{c.label}</div><div className="mt-1 font-display text-2xl font-medium">{c.count}</div></div>
            ))}
          </div>
          <div className="mt-10"><SourceFlow /></div>

          {/* 22 live cells */}
          <div className="mt-10">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">22 live endpoints</div>
            <div className="mt-3 grid gap-px bg-border sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {LIVE_SOURCES.map(s => (
                <div key={s.id} className="bg-paper p-4">
                  <div className="flex items-center justify-between">
                    <span className={`h-2 w-2 rounded-full ${statusColor[s.status]} animate-livepulse`} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{s.lastIngest} ago</span>
                  </div>
                  <div className="mt-3 text-sm font-medium">{s.name}</div>
                  <div className="font-mono text-[11px] text-slate-500">{s.family}</div>
                  <div className="mt-3 font-mono text-[11px] text-slate-600">{s.latencyMs}ms</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filterable catalog */}
          <div className="mt-12">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Filter catalog</div>
            <div className="mt-3 flex items-center gap-3 rounded-full border border-border bg-paper px-4 py-2.5">
              <Search size={16} className="text-slate-500" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name or family…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
              <span className="font-mono text-xs text-slate-500">{filtered.length}</span>
            </div>
            <div className="mt-4 grid gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
              {filtered.slice(0, 90).map((s, i) => (
                <div key={`${s.name}-${i}`} className="bg-paper p-3">
                  <div className="flex items-center justify-between"><span className="text-sm font-medium">{s.name}</span><span className={`rounded px-1.5 py-0.5 text-[9px] uppercase ${s.kind === "live" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{s.kind}</span></div>
                  <div className="mt-1 font-mono text-[11px] text-slate-500">{s.family}</div>
                </div>
              ))}
            </div>
            {filtered.length > 90 && <div className="mt-4 text-center text-xs text-slate-500">+ {filtered.length - 90} more.</div>}
          </div>

          {/* Catalog families */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {CATALOG_FAMILIES.map(f => (
              <div key={f.name} className="rounded border border-border bg-paper p-4"><div className="text-[11px] uppercase tracking-wider text-slate-500">{f.name}</div><div className="mt-1 font-display text-3xl font-medium text-orange">{f.count}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORER (address fan-out) */}
      <section id="explorer" className="border-t border-border bg-navy-deep text-paper">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-orange">Live explorer</div>
          <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Type an address. Watch the fan-out.</h2>
          <p className="mt-3 max-w-2xl text-paper/70">Live call to the existing RePrime Data Platform <span className="font-mono text-paper/90">/api/search</span> endpoint. Fan-out across 22 government and market APIs within a 13-second budget.</p>
          <div className="mt-8"><AddressSearch /></div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-orange">FAQ</div>
          <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Frequently asked.</h2>
          <div className="mt-10 space-y-1 divide-y divide-border">
            {FAQS.map(f => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-lg font-medium text-ink transition group-hover:text-orange"><span className="mr-3 text-orange">+</span>{f.q}</summary>
                <p className="mt-3 pl-7 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-gradient-to-br from-slate-50 to-paper">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-orange">Access</div>
          <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Request access.</h2>
          <p className="mt-3 max-w-xl text-slate-700">Tell us a little about your firm and what you&apos;d use the Atlas for. We respond within two business days.</p>
          {cstatus === "ok" ? (
            <div className="mt-10 rounded-lg border border-emerald-200 bg-emerald-50/60 p-6">
              <CheckCircle2 className="text-emerald-600" />
              <div className="mt-2 font-display text-xl font-medium">Thanks — we received your request.</div>
              <p className="mt-1 text-sm text-slate-700">We&apos;ll respond by email within two business days.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 grid gap-5 md:grid-cols-2">
              {[["name","Name",true],["email","Work email",true],["firm","Firm",false],["role","Role",false]].map(([n,l,req])=>(
                <div key={n as string}>
                  <label className="text-xs uppercase tracking-wider text-slate-500" htmlFor={n as string}>{l as string}{req && <span className="text-orange"> *</span>}</label>
                  <input id={n as string} name={n as string} type={n === "email" ? "email" : "text"} required={!!req} className="mt-1.5 w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20" />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wider text-slate-500" htmlFor="message">What would you use Atlas for?</label>
                <textarea id="message" name="message" rows={5} className="mt-1.5 w-full rounded-lg border border-border bg-paper px-3 py-2.5 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20" placeholder="A market thesis, a deal screen, a coverage gap…" />
              </div>
              {cerr && <div className="md:col-span-2 rounded bg-rose-50 px-3 py-2 text-xs text-rose-700">{cerr}</div>}
              <div className="md:col-span-2">
                <button type="submit" disabled={cstatus === "sending"} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange to-copper px-5 py-2.5 text-sm font-medium text-paper transition hover:from-copper hover:to-orange disabled:opacity-50">
                  {cstatus === "sending" ? "Sending…" : "Request access"} <Send size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
