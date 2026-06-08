import Link from "next/link";

export const metadata = { title: "About" };

const PILLARS = [
  { title: "Honest numbers", body: "Every visible value is either live-bound to the RePrime warehouse or carries a `Sample` badge. We do not fabricate values labeled `LIVE` — a rule that came directly out of our 2026-06-08 audit." },
  { title: "Source breadth", body: "22 government and market APIs in the live fan-out — FRED, Census, BLS, BEA, EIA, Treasury, SEC, HUD, FEMA, NOAA, USGS, OSM, REIT market data, plus a 1,932-entry catalog grown daily." },
  { title: "Visual density", body: "Bloomberg-grade information density paired with editorial restraint. Dark cinematic pockets for 3D scenes; light, breathable layouts for charts and copy." },
];

export default function AboutPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-xs uppercase tracking-wider text-orange">About</div>
        <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">A different way to read CRE.</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          RePrime Atlas is the institutional visualization layer over the <Link href="https://github.com/kazi-reprime/reprime-data-platform" className="underline decoration-slate-300 underline-offset-2 hover:text-orange">RePrime Data Platform</Link>. We take the raw fan-out — twenty-two government and market endpoints, ~1,932 curated sources, a live address lookup with a 13-second budget — and render it so an analyst can answer a market-level question in a single glance.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          The Atlas is intentionally narrow. We don&apos;t list deals. We don&apos;t aggregate broker decks. We render the underlying signal — flows, sectors, sources, metros — at the fidelity an allocator actually needs.
        </p>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
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
