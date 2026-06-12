// Shared generators for the live Deal Factory / Ops Feed panels.
// Deal numbers are synthetic (Sample-badged); ingest source names are pulled
// from the live RePrime Data Platform catalog with a baked-in fallback.
import { REPRIME_API_BASE } from "@/lib/constants";

export const DEAL_TYPES = [
  "Last-Mile Logistics", "Flex / R&D", "Medical Office", "Self-Storage",
  "Cold Storage", "Grocery-Anchored", "Industrial", "Office", "Retail",
] as const;

export const MARKETS: { state: string; city: string }[] = [
  { state: "TX", city: "Dallas" },      { state: "CA", city: "San Francisco" },
  { state: "MA", city: "Boston" },      { state: "FL", city: "Miami" },
  { state: "MO", city: "St. Louis" },   { state: "PA", city: "Philadelphia" },
  { state: "OH", city: "Cleveland" },   { state: "IA", city: "Des Moines" },
  { state: "WI", city: "Milwaukee" },   { state: "MI", city: "Detroit" },
  { state: "NC", city: "Raleigh" },     { state: "VA", city: "Richmond" },
  { state: "WA", city: "Seattle" },     { state: "CO", city: "Denver" },
];

const STREETS = ["E Harbor Blvd", "N Gateway Dr", "W Market St", "S Tower Ave", "N Enterprise Ct", "E Distribution Dr", "W Center St"];
const BADGES = ["CORE FLIP", "GP HOME RUN", "SPECIAL ASSET"] as const;
const BROKERS = ["JLL", "CBRE", "Colliers", "Cushman & Wakefield", "Marcus & Millichap"];
const CONTACTS = ["T. Nguyen", "A. Rossi", "M. Cohen", "J. Park", "L. Alvarez"];

export const DILIGENCE_CHIPS = ["Title", "Env", "Comps", "Traffic", "Zoning"] as const;

export type Deal = {
  id: number;
  address: string;
  state: string;
  city: string;
  type: string;
  sf: number;
  cap: number;
  dscr: number;
  noiM: number;
  irr: number;
  step: number; // 0..12 pipeline progress
  badge: (typeof BADGES)[number];
  below: number; // % below market
  askM: number;
  contact: string;
  broker: string;
};

const r = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const ri = (lo: number, hi: number) => Math.round(r(lo, hi));
export const pick = <T,>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];

let dealSeq = 1;
export function makeDeal(): Deal {
  const m = pick(MARKETS);
  const badge = pick(BADGES);
  return {
    id: dealSeq++,
    address: `${ri(500, 9900)} ${pick(STREETS)}`,
    state: m.state,
    city: m.city,
    type: pick(DEAL_TYPES),
    sf: ri(40_000, 410_000),
    cap: +r(5.8, 8.6).toFixed(1),
    dscr: +r(1.2, 1.6).toFixed(2),
    noiM: +r(0.5, 4.2).toFixed(1),
    irr: ri(12, 26),
    step: ri(1, 5),
    badge,
    below: badge === "GP HOME RUN" ? ri(25, 34) : badge === "SPECIAL ASSET" ? ri(18, 26) : ri(5, 12),
    askM: +r(8, 60).toFixed(1),
    contact: pick(CONTACTS),
    broker: pick(BROKERS),
  };
}

export function stageOf(step: number): string {
  if (step >= 10) return "NEGOTIATION";
  if (step >= 7) return "OUTREACH";
  if (step >= 5) return "DILIGENCE";
  if (step >= 3) return "SCORED";
  return "SOURCED";
}

export type FeedKind = "INGEST" | "SIGNAL" | "SCORED" | "NPL" | "ZOOM" | "EMAIL" | "AGENT" | "MODEL" | "NEGOTIATION" | "FEED";

export const FEED_COLORS: Record<FeedKind, string> = {
  INGEST: "text-sky-300",      SIGNAL: "text-amber-300",  SCORED: "text-emerald-300",
  NPL: "text-rose-300",        ZOOM: "text-violet-300",   EMAIL: "text-orange",
  AGENT: "text-paper/80",      MODEL: "text-gold",        NEGOTIATION: "text-copper",
  FEED: "text-teal-300",
};

export type FeedItem = { id: number; kind: FeedKind; state: string; text: string };

// Fallback names if the live catalog fetch fails — real entries from the
// RePrime Data Platform source registry.
const FALLBACK_SOURCES = [
  "HUD-USPS ZIP/Tract/County/CBSA Crosswalk", "Census Monthly Construction Spending",
  "BTS Port Performance Freight Statistics", "CBOE OVX (Oil VIX)", "BEA iTable",
  "Chicago Zoning Districts", "EPA Cleanups in My Community (CIMC)",
  "OpenFEMA FimaNfipPolicies Dataset API", "Climate Central Billion-Dollar Disasters",
  "Census Retail Trade MARTS XLSX", "Census Decennial 2020 DHC API",
  "Chicago Building Permits", "Census New Residential Construction",
  "Frankfurter (ECB-sourced) USD/ILS", "Building Permits Survey API",
  "BLS QCEW Quarterly Census of Employment", "Turner Building Cost Index",
  "Commercial Observer RSS", "EPA Envirofacts API", "FRED MARTS Series",
  "Bank of Israel PublicAPI Exchange Rates", "BTS Freight Rail Carloads Data.gov",
  "data.gov HUD Insured Multifamily (GIS)", "SEC EDGAR XBRL REIT Facts",
];

let catalog: string[] = FALLBACK_SOURCES;

export async function loadSourceCatalog(): Promise<string[]> {
  try {
    const res = await fetch(`${REPRIME_API_BASE}/api/sources`, { cache: "force-cache" });
    if (!res.ok) return catalog;
    const j = await res.json();
    const arr: unknown[] = Array.isArray(j) ? j : Array.isArray(j?.sources) ? j.sources : [];
    const names = arr
      .map((s) => (typeof s === "object" && s !== null && "name" in s ? String((s as { name: unknown }).name) : null))
      .filter((n): n is string => !!n && n.length > 3);
    if (names.length > 20) catalog = names;
  } catch {
    // keep fallback — live catalog unreachable
  }
  return catalog;
}

let feedSeq = 1;
export function makeFeedItem(sources: string[]): FeedItem {
  const kind = pick<FeedKind>(["INGEST", "INGEST", "SIGNAL", "SIGNAL", "SCORED", "NPL", "ZOOM", "EMAIL", "AGENT", "MODEL", "NEGOTIATION", "FEED"]);
  const st = pick(MARKETS).state;
  const texts: Record<FeedKind, () => string> = {
    INGEST: () => pick(sources),
    SIGNAL: () => `Auction docket · ${ri(2, 9)} filings`,
    SCORED: () => `${pick(BADGES)} · ${ri(5, 30)}% below`,
    NPL: () => `NPL tranche · UPB $${r(20, 95).toFixed(1)}M`,
    ZOOM: () => `Zoom set · Thu ${ri(1, 4)}:30 CT`,
    EMAIL: () => "LOI executed · committee",
    AGENT: () => pick(["call held · terms aligned", "diligence · title·env·comps·traffic"]),
    MODEL: () => `underwritten · cap ${r(5.8, 8.4).toFixed(1)}% · DSCR ${r(1.2, 1.6).toFixed(2)}x`,
    NEGOTIATION: () => `counter · $${r(8, 60).toFixed(1)}M`,
    FEED: () => `${pick(sources).slice(0, 38)} · +${ri(200, 4000).toLocaleString()}`,
  };
  return { id: feedSeq++, kind, state: st, text: texts[kind]() };
}
