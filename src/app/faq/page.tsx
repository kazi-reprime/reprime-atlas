export const metadata = { title: "FAQ" };

const QS = [
  { q: "What is RePrime Atlas?", a: "A visualization layer over the RePrime Data Platform. Atlas reads from the same Supabase warehouse and address fan-out that powers our institutional intelligence, then renders it across globe, heatmap, signals, metros, and terminal surfaces." },
  { q: "Is the data live?", a: "The platform underneath (22 govt/market APIs, daily Supabase ingest) is live. Atlas surfaces marked with a Sample badge are illustrative until the v2 wiring lands — see /signals for the live operational view." },
  { q: "Who is this for?", a: "Analysts, allocators, and operators who refuse to chase numbers across forty tabs. Anyone evaluating a CRE thesis, a market, a portfolio, or a single asset." },
  { q: "What data sources are wired?", a: "FRED, Census ACS, Census Geocoder, BLS, BEA, EIA, US Treasury, SEC EDGAR, FHFA, HUD PDR, EPA ECHO, NOAA ACIS, FEMA NFIP, USGS, OSM Overpass, Wikidata, Finnhub, Alpha Vantage, Twelve Data, Mapillary, Socrata, and the RePrime market layer. 1,155 additional sources are cataloged for progressive activation." },
  { q: "Can I bring my own data?", a: "Yes — once we open API access. Atlas is designed to take additional source connectors via the same pipeline pattern the data platform uses today." },
  { q: "Is there an API?", a: "The underlying data platform exposes /api/search (live address fan-out, 13s budget) and /api/health. Atlas v2 will expose its own query API." },
  { q: "Do you list deals publicly?", a: "Reviewed deals surface on /properties at the appropriate diligence tier. We use 'reviewed, sourced, or advised' language deliberately." },
  { q: "How do I get access?", a: "Tell us about your firm at /contact. We respond within two business days." },
];

export default function FaqPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-xs uppercase tracking-wider text-orange">FAQ</div>
        <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Frequently asked.</h1>
        <div className="mt-12 space-y-1 divide-y divide-border">
          {QS.map((q) => (
            <details key={q.q} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-lg font-medium text-ink transition group-hover:text-orange">
                <span className="mr-3 text-orange">+</span>{q.q}
              </summary>
              <p className="mt-3 pl-7 text-slate-700">{q.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
