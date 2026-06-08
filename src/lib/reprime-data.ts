// Real data ported from kazi-reprime/reprime-data-platform (commit at 2026-06-09).
// Sources:
//   public/data/stats.json, categories.json, portfolio.json, featured_deal.json
//   public/about.html, public/team.html, CLAUDE.md
// These values are SAMPLE/illustrative per Reprime's own honesty rule — every UI
// consumer renders a <SampleBadge /> alongside them.

export const REPRIME_STATS = {
  cataloged_sources: 1155,
  category_count: 14,
  live_search_layers: 20,
  keyless: 842,
  easy_connect: 611,
  by_tier: { free: 1070, paid_le10: 26, paid_le50: 39, paid_le100: 20 },
  last_updated: "2026-06-08T00:00:00Z",
};

export const REPRIME_CATEGORIES: Array<{ key: string; label: string; count: number }> = [
  { key: "economic", label: "Economic indicators", count: 161 },
  { key: "demographic", label: "Demographics + ACS", count: 159 },
  { key: "housing_re", label: "Housing + real estate", count: 133 },
  { key: "hazard_environmental", label: "Hazard + environmental", count: 44 },
  { key: "infrastructure", label: "Infrastructure + transit", count: 30 },
  { key: "capital_markets", label: "Capital markets + REITs", count: 26 },
  { key: "insurance_climate", label: "Insurance + climate", count: 15 },
  { key: "zoning_parcel", label: "Zoning + parcel", count: 14 },
  { key: "news_sentiment", label: "News + sentiment", count: 12 },
  { key: "israeli", label: "Israeli markets", count: 7 },
  { key: "construction_pipeline", label: "Construction pipeline", count: 5 },
  { key: "macro_indicator", label: "Macro indicators", count: 4 },
  { key: "energy", label: "Energy + utilities", count: 3 },
  { key: "other", label: "Other / specialty", count: 17 },
];

export const REPRIME_PORTFOLIO = {
  total_label: "$284M",
  badge: "Sample" as const,
  deals: [
    { name: "The Palms at Doral", meta: "240 units · Multifamily · Doral, FL", value: "$61.2M", type: "MF", noi: "$3.8M", cap: "6.2%", dscr: "1.45x", lat: 25.8195, lon: -80.3553 },
    { name: "Coral Springs Office", meta: "145K SF · Office · Coral Springs, FL", value: "$38.5M", type: "Off", noi: "$2.1M", cap: "7.1%", dscr: "1.32x", lat: 26.2710, lon: -80.2706 },
    { name: "Tampa Bay Industrial", meta: "220K SF · Industrial · Tampa, FL", value: "$52.8M", type: "Ind", noi: "$4.2M", cap: "5.8%", dscr: "1.62x", lat: 27.9506, lon: -82.4572 },
    { name: "Orlando Mixed-Use", meta: "180 units + 25K SF retail · Orlando, FL", value: "$89.3M", type: "Mix", noi: "$6.1M", cap: "5.5%", dscr: "1.51x", lat: 28.5383, lon: -81.3792 },
    { name: "Ft Lauderdale Retail", meta: "65K SF · Retail · Ft Lauderdale, FL", value: "$42.7M", type: "Ret", noi: "$2.8M", cap: "6.8%", dscr: "1.28x", lat: 26.1224, lon: -80.1373 },
  ],
};

export const REPRIME_FEATURED_DEAL = {
  name: "The Palms at Doral",
  address: "8400 NW 36th St, Doral, FL 33166",
  summary: "240 Units · Class B+ · Doral, FL · Value-Add Multifamily",
  badge: "Sample" as const,
  metrics: [
    { label: "Cap Rate", value: "6.2%" },
    { label: "NOI", value: "$3.8M" },
    { label: "IRR (5yr)", value: "18.4%" },
    { label: "Cash-on-Cash", value: "9.8%" },
    { label: "DSCR", value: "1.45x" },
    { label: "WALT", value: "7.2 yrs" },
  ],
  capital_stack: {
    total: "$61.2M",
    tranches: [
      { name: "Senior Debt", pct: 75, amount: "$45.9M", rate: "5.8%" },
      { name: "Mezzanine", pct: 15, amount: "$9.2M", rate: "9.5%" },
      { name: "Equity", pct: 10, amount: "$6.1M", rate: "" },
    ],
  },
  tenants: [
    { name: "Market Rate Pool", units: 168, rent: "$2,150", status: "Current" },
    { name: "Section 8 Block", units: 36, rent: "$1,680", status: "Current" },
    { name: "Corporate Lease", units: 24, rent: "$2,450", status: "Current" },
    { name: "Vacant Units", units: 12, rent: "—", status: "Vacant" },
  ],
};

export const REPRIME_ABOUT = {
  eyebrow: "About RePrime Group",
  headline: "Institutional Capital. Immediate Execution.",
  body: "For over two decades, RePrime Group has identified overlooked commercial real estate opportunities across U.S. markets. Through disciplined execution and investor-focused strategy, we transform underappreciated assets into long-term value — across 800+ transactions and 21M+ square feet nationwide.",
  proof: [
    { label: "Transactions", value: "800+" },
    { label: "Square feet under coverage", value: "21M+" },
    { label: "Cataloged data sources", value: "1,155" },
    { label: "Years operating", value: "20+" },
  ],
};

export const REPRIME_TEAM = {
  eyebrow: "Leadership",
  headline: "The people driving RePrime Group",
  body: "Not consultants. Real estate operators with decades of hands-on experience across acquisitions, development, capital markets, technology, and international operations.",
};

// Hub label set for the globe — names that appear over each hub marker.
export const GLOBE_LABELS: Array<{ id: string; name: string; lat: number; lon: number; tier: 1 | 2 }> = [
  { id: "NYC", name: "New York", lat: 40.7128, lon: -74.006, tier: 1 },
  { id: "LA", name: "Los Angeles", lat: 34.0522, lon: -118.244, tier: 1 },
  { id: "CHI", name: "Chicago", lat: 41.8781, lon: -87.6298, tier: 2 },
  { id: "DAL", name: "Dallas", lat: 32.7767, lon: -96.797, tier: 2 },
  { id: "ATL", name: "Atlanta", lat: 33.749, lon: -84.388, tier: 2 },
  { id: "MIA", name: "Miami", lat: 25.7617, lon: -80.1918, tier: 1 },
  { id: "BOS", name: "Boston", lat: 42.3601, lon: -71.0589, tier: 2 },
  { id: "SFO", name: "San Francisco", lat: 37.7749, lon: -122.4194, tier: 1 },
  { id: "LON", name: "London", lat: 51.5074, lon: -0.1278, tier: 1 },
  { id: "TKY", name: "Tokyo", lat: 35.6762, lon: 139.6503, tier: 1 },
  { id: "SIN", name: "Singapore", lat: 1.3521, lon: 103.8198, tier: 1 },
  { id: "FRA", name: "Frankfurt", lat: 50.1109, lon: 8.6821, tier: 2 },
  { id: "HKG", name: "Hong Kong", lat: 22.3193, lon: 114.1694, tier: 1 },
  { id: "DXB", name: "Dubai", lat: 25.2048, lon: 55.2708, tier: 2 },
  { id: "SYD", name: "Sydney", lat: -33.8688, lon: 151.2093, tier: 2 },
];

// Extended portfolio for /properties grid — synthesized from real metro/sector mix
export const EXTENDED_PORTFOLIO = [
  ...REPRIME_PORTFOLIO.deals,
  { name: "Houston Logistics Park", meta: "385K SF · Industrial · Houston, TX", value: "$72.4M", type: "Ind", noi: "$5.1M", cap: "5.9%", dscr: "1.55x", lat: 29.7604, lon: -95.3698 },
  { name: "Charlotte Office Tower", meta: "210K SF · Office · Charlotte, NC", value: "$48.2M", type: "Off", noi: "$2.6M", cap: "7.3%", dscr: "1.29x", lat: 35.2271, lon: -80.8431 },
  { name: "Phoenix Garden Apartments", meta: "320 units · Multifamily · Phoenix, AZ", value: "$78.9M", type: "MF", noi: "$5.0M", cap: "6.0%", dscr: "1.48x", lat: 33.4484, lon: -112.0740 },
  { name: "Nashville Mixed Use", meta: "210 units + 32K SF · Nashville, TN", value: "$104.5M", type: "Mix", noi: "$6.8M", cap: "5.4%", dscr: "1.53x", lat: 36.1627, lon: -86.7816 },
  { name: "Atlanta Warehouse Cluster", meta: "510K SF · Industrial · Atlanta, GA", value: "$98.1M", type: "Ind", noi: "$6.2M", cap: "5.7%", dscr: "1.61x", lat: 33.749, lon: -84.388 },
  { name: "Denver Retail Strip", meta: "88K SF · Retail · Denver, CO", value: "$36.7M", type: "Ret", noi: "$2.3M", cap: "7.0%", dscr: "1.31x", lat: 39.7392, lon: -104.9903 },
  { name: "Austin Multifamily Tower", meta: "295 units · Multifamily · Austin, TX", value: "$118.4M", type: "MF", noi: "$6.9M", cap: "5.3%", dscr: "1.52x", lat: 30.2672, lon: -97.7431 },
  { name: "Raleigh Office Park", meta: "165K SF · Office · Raleigh, NC", value: "$54.3M", type: "Off", noi: "$3.0M", cap: "6.8%", dscr: "1.36x", lat: 35.7796, lon: -78.6382 },
  { name: "Las Vegas Hospitality", meta: "180K SF · Mixed-Use · Las Vegas, NV", value: "$67.8M", type: "Mix", noi: "$4.4M", cap: "6.5%", dscr: "1.42x", lat: 36.1699, lon: -115.1398 },
  { name: "Boston Lab Conversion", meta: "120K SF · Office (life sci) · Boston, MA", value: "$142.7M", type: "Off", noi: "$7.4M", cap: "5.1%", dscr: "1.58x", lat: 42.3601, lon: -71.0589 },
  { name: "San Diego Industrial", meta: "240K SF · Industrial · San Diego, CA", value: "$84.6M", type: "Ind", noi: "$4.9M", cap: "5.6%", dscr: "1.60x", lat: 32.7157, lon: -117.1611 },
  { name: "Minneapolis Multifamily", meta: "260 units · Multifamily · Minneapolis, MN", value: "$72.0M", type: "MF", noi: "$5.2M", cap: "7.0%", dscr: "1.40x", lat: 44.9778, lon: -93.265 },
  { name: "DC Suburban Office", meta: "195K SF · Office · Bethesda, MD", value: "$61.5M", type: "Off", noi: "$3.6M", cap: "7.0%", dscr: "1.34x", lat: 38.9847, lon: -77.0947 },
  { name: "Orlando Industrial Park", meta: "300K SF · Industrial · Orlando, FL", value: "$76.2M", type: "Ind", noi: "$4.5M", cap: "5.9%", dscr: "1.57x", lat: 28.5383, lon: -81.3792 },
  { name: "Sacramento Retail Center", meta: "112K SF · Retail · Sacramento, CA", value: "$44.9M", type: "Ret", noi: "$3.0M", cap: "6.6%", dscr: "1.33x", lat: 38.5816, lon: -121.4944 },
];
