import Link from "next/link";
import { REPRIME_ABOUT, REPRIME_TEAM, REPRIME_STATS } from "@/lib/reprime-data";

export const metadata = { title: "About" };

const PILLARS = [
  { title: "Honest numbers", body: "Every visible value is either live-bound to the RePrime warehouse or carries a `Sample` badge. We do not fabricate values labeled `LIVE` — a rule that came directly out of our 2026-06-08 audit." },
  { title: "Source breadth", body: `${REPRIME_STATS.live_search_layers} live government and market endpoints in the address fan-out, plus a ${REPRIME_STATS.cataloged_sources.toLocaleString()}-entry curated catalog across ${REPRIME_STATS.category_count} categories — economic, demographic, housing, hazard, infrastructure, capital markets, and more.` },
  { title: "Visual density", body: "Bloomberg-grade information density paired with editorial restraint. Dark cinematic pockets for 3D scenes; light, breathable layouts for charts and copy." },
];

export default function AboutPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-xs uppercase tracking-wider text-orange">{REPRIME_ABOUT.eyebrow}</div>
        <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">{REPRIME_ABOUT.headline}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">{REPRIME_ABOUT.body}</p>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          RePrime Atlas is the institutional visualization layer over the{" "}
          <Link href="https://github.com/kazi-reprime/reprime-data-platform" className="underline decoration-slate-300 underline-offset-2 hover:text-orange">
            RePrime Data Platform
          </Link>
          . We take the raw fan-out — government and market endpoints, the curated source catalog, a live address lookup with a 13-second budget — and render it so an analyst can answer a market-level question in a single glance.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {REPRIME_ABOUT.proof.map((p) => (
            <div key={p.label} className="bg-paper p-5">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">{p.label}</div>
              <div className="mt-1 font-display text-2xl font-medium text-ink">{p.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="text-xs uppercase tracking-wider text-orange">{REPRIME_TEAM.eyebrow}</div>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">{REPRIME_TEAM.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{REPRIME_TEAM.body}</p>
        </div>

        <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-paper p-6">
              <div className="font-display text-xl font-medium">{p.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-medium">Built on</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <li>· Next.js 16 App Router · React 19 · TypeScript strict</li>
            <li>· Tailwind v4 · Radix UI · Framer Motion · GSAP</li>
            <li>· React Three Fiber + drei + postprocessing</li>
            <li>· Recharts · react-simple-maps · d3-geo</li>
            <li>· Supabase JS (anon, RLS) · Resend transactional</li>
            <li>· Vercel Fluid Compute · Vercel Edge</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
