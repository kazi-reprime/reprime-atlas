import AddressSearch from "@/components/explore/AddressSearch";
import LiveHealthDots from "@/components/signals/LiveHealthDots";

export const metadata = { title: "Address explorer" };

export default function ExplorePage() {
  return (
    <section className="bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-orange">Address explorer</div>
              <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Type an address. Watch the fan-out.</h1>
              <p className="mt-3 max-w-2xl text-paper/70">
                Live call to the existing RePrime Data Platform <span className="font-mono text-paper/85">/api/search</span> endpoint. Fans out across 22 government + market APIs within a 13-second budget; the JSON response below is the raw fan-out result.
              </p>
            </div>
            <LiveHealthDots />
          </div>

          <div className="mt-10">
            <AddressSearch />
          </div>

          <div className="mt-12 rounded-lg border border-paper/10 bg-paper/5 p-5 text-sm leading-relaxed text-paper/75">
            <div className="text-[11px] uppercase tracking-wider text-orange">How it works</div>
            <p className="mt-2">
              Atlas does not run its own ingestion. This page proxies to the production RePrime Data Platform deployment at <span className="font-mono text-paper/90">https://reprime-data-platform.vercel.app/api/search</span>. The Python serverless function fans out across FRED, Census, BLS, BEA, EIA, Treasury, SEC EDGAR, HUD PDR, EPA ECHO, NOAA ACIS, FEMA NFIP, USGS, OSM, Wikidata, Finnhub, Mapillary, and Socrata, with a strict 13-second budget per address.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
