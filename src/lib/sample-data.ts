// Sample data — synthetic CRE values used until live Supabase/API queries are wired.
// Every UI consumer must render a `Sample` badge alongside numbers from this file
// (per the RePrime Data Platform 2026-06-08 audit rule).

export const HUBS = [
  { id: "NYC", name: "New York", lat: 40.7128, lon: -74.006 },
  { id: "LA", name: "Los Angeles", lat: 34.0522, lon: -118.244 },
  { id: "CHI", name: "Chicago", lat: 41.8781, lon: -87.6298 },
  { id: "DAL", name: "Dallas", lat: 32.7767, lon: -96.797 },
  { id: "ATL", name: "Atlanta", lat: 33.749, lon: -84.388 },
  { id: "MIA", name: "Miami", lat: 25.7617, lon: -80.1918 },
  { id: "SEA", name: "Seattle", lat: 47.6062, lon: -122.3321 },
  { id: "BOS", name: "Boston", lat: 42.3601, lon: -71.0589 },
  { id: "DEN", name: "Denver", lat: 39.7392, lon: -104.9903 },
  { id: "PHX", name: "Phoenix", lat: 33.4484, lon: -112.074 },
  { id: "SFO", name: "San Francisco", lat: 37.7749, lon: -122.4194 },
  { id: "LON", name: "London", lat: 51.5074, lon: -0.1278 },
  { id: "TOR", name: "Toronto", lat: 43.6532, lon: -79.3832 },
  { id: "TKY", name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { id: "SIN", name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { id: "FRA", name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
  { id: "HKG", name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  { id: "SYD", name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { id: "DXB", name: "Dubai", lat: 25.2048, lon: 55.2708 },
];

export type Arc = { from: [number, number]; to: [number, number]; weight: number; color: string };
export const ARCS: Arc[] = [
  { from: [40.7128, -74.006], to: [34.0522, -118.244], weight: 4.2, color: "#E8763A" },
  { from: [40.7128, -74.006], to: [51.5074, -0.1278], weight: 3.8, color: "#D4AF37" },
  { from: [37.7749, -122.4194], to: [35.6762, 139.6503], weight: 2.9, color: "#E8763A" },
  { from: [34.0522, -118.244], to: [1.3521, 103.8198], weight: 1.9, color: "#D4AF37" },
  { from: [51.5074, -0.1278], to: [50.1109, 8.6821], weight: 2.4, color: "#F4A574" },
  { from: [25.7617, -80.1918], to: [40.7128, -74.006], weight: 2.1, color: "#E8763A" },
  { from: [32.7767, -96.797], to: [41.8781, -87.6298], weight: 1.7, color: "#D4AF37" },
  { from: [33.749, -84.388], to: [42.3601, -71.0589], weight: 1.5, color: "#F4A574" },
  { from: [22.3193, 114.1694], to: [1.3521, 103.8198], weight: 1.4, color: "#E8763A" },
  { from: [47.6062, -122.3321], to: [34.0522, -118.244], weight: 2.6, color: "#D4AF37" },
  { from: [39.7392, -104.9903], to: [32.7767, -96.797], weight: 1.3, color: "#E8763A" },
  { from: [43.6532, -79.3832], to: [40.7128, -74.006], weight: 2.0, color: "#F4A574" },
  { from: [33.4484, -112.074], to: [37.7749, -122.4194], weight: 1.2, color: "#D4AF37" },
  { from: [-33.8688, 151.2093], to: [1.3521, 103.8198], weight: 1.6, color: "#E8763A" },
  { from: [25.2048, 55.2708], to: [51.5074, -0.1278], weight: 2.2, color: "#D4AF37" },
  { from: [35.6762, 139.6503], to: [22.3193, 114.1694], weight: 1.8, color: "#F4A574" },
];

export type Sector = { name: string; size: number; change: number; constituents: string[] };
export const SECTORS: Sector[] = [
  { name: "Multifamily", size: 4400, change: 1.8, constituents: ["EQR", "AVB", "MAA", "ESS", "CPT", "UDR"] },
  { name: "Industrial", size: 3900, change: 2.4, constituents: ["PLD", "PSA", "EXR", "DRE", "STAG"] },
  { name: "Office", size: 3200, change: -1.2, constituents: ["BXP", "VNO", "SLG", "KRC", "HIW"] },
  { name: "Retail", size: 2600, change: 0.8, constituents: ["SPG", "REG", "FRT", "KIM", "BRX"] },
  { name: "Data Centers", size: 1800, change: 4.1, constituents: ["EQIX", "DLR", "AMT"] },
  { name: "Hospitality", size: 1400, change: -0.5, constituents: ["HST", "RHP", "PK", "APLE"] },
  { name: "Healthcare", size: 1200, change: 1.4, constituents: ["WELL", "PEAK", "HR", "OHI"] },
  { name: "Self-Storage", size: 900, change: 0.3, constituents: ["PSA", "EXR", "CUBE", "LSI"] },
  { name: "Senior Living", size: 700, change: -0.8, constituents: ["VTR", "WELL", "OHI"] },
  { name: "Net Lease", size: 850, change: 0.6, constituents: ["O", "WPC", "STOR", "NNN"] },
];

export type LiveSource = {
  id: string;
  name: string;
  family: string;
  status: "ok" | "warn" | "err";
  latencyMs: number;
  lastIngest: string;
};
export const LIVE_SOURCES: LiveSource[] = [
  { id: "fred", name: "FRED", family: "Federal Reserve", status: "ok", latencyMs: 142, lastIngest: "2m" },
  { id: "census-acs", name: "Census ACS", family: "Census Bureau", status: "ok", latencyMs: 218, lastIngest: "4m" },
  { id: "census-geo", name: "Census Geocoder", family: "Census Bureau", status: "ok", latencyMs: 96, lastIngest: "1m" },
  { id: "bls", name: "BLS Employment", family: "Bureau of Labor Statistics", status: "ok", latencyMs: 312, lastIngest: "3m" },
  { id: "bea", name: "BEA Regional", family: "Bureau of Economic Analysis", status: "ok", latencyMs: 256, lastIngest: "5m" },
  { id: "eia", name: "EIA Energy", family: "Energy Info Admin", status: "ok", latencyMs: 188, lastIngest: "2m" },
  { id: "treasury", name: "Treasury Curve", family: "US Treasury", status: "ok", latencyMs: 88, lastIngest: "1m" },
  { id: "sec-edgar", name: "SEC EDGAR / REITs", family: "SEC", status: "ok", latencyMs: 412, lastIngest: "6m" },
  { id: "fhfa", name: "FHFA HPI", family: "FHFA", status: "warn", latencyMs: 1240, lastIngest: "23m" },
  { id: "hud-pdr", name: "HUD PDR", family: "HUD", status: "ok", latencyMs: 184, lastIngest: "4m" },
  { id: "epa-echo", name: "EPA ECHO", family: "EPA", status: "ok", latencyMs: 268, lastIngest: "5m" },
  { id: "noaa-acis", name: "NOAA ACIS", family: "NOAA", status: "ok", latencyMs: 156, lastIngest: "2m" },
  { id: "fema-nfip", name: "FEMA NFIP", family: "FEMA", status: "ok", latencyMs: 224, lastIngest: "5m" },
  { id: "usgs-quake", name: "USGS Quake", family: "USGS", status: "ok", latencyMs: 112, lastIngest: "1m" },
  { id: "osm-overpass", name: "OSM Overpass", family: "OpenStreetMap", status: "ok", latencyMs: 348, lastIngest: "3m" },
  { id: "wikidata", name: "Wikidata", family: "Wikimedia", status: "ok", latencyMs: 196, lastIngest: "2m" },
  { id: "finnhub", name: "Finnhub REITs", family: "Market data", status: "ok", latencyMs: 142, lastIngest: "1m" },
  { id: "alpha-vantage", name: "Alpha Vantage", family: "Market data", status: "warn", latencyMs: 980, lastIngest: "12m" },
  { id: "twelve-data", name: "Twelve Data", family: "Market data", status: "ok", latencyMs: 168, lastIngest: "2m" },
  { id: "mapillary", name: "Mapillary", family: "Street imagery", status: "ok", latencyMs: 304, lastIngest: "4m" },
  { id: "socrata", name: "Socrata Open Data", family: "Open data", status: "ok", latencyMs: 218, lastIngest: "3m" },
  { id: "reprime-mkt", name: "RePrime Market", family: "RePrime", status: "ok", latencyMs: 88, lastIngest: "1m" },
];

export const CATALOG_FAMILIES = [
  { name: "Federal economic", count: 218 },
  { name: "Census + demographics", count: 184 },
  { name: "Labor + employment", count: 167 },
  { name: "Energy + utilities", count: 142 },
  { name: "Climate + risk", count: 189 },
  { name: "Property records", count: 273 },
  { name: "Permits + zoning", count: 158 },
  { name: "REIT + capital markets", count: 121 },
  { name: "Transit + infrastructure", count: 108 },
  { name: "Tax + assessor", count: 144 },
  { name: "Open-data city portals", count: 228 },
];

export type Metro = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  vacancy: number;
  capRate: number;
  absorption: number;
  employment: number;
};
export const METROS: Metro[] = [
  { id: "NYC", name: "New York", lat: 40.7128, lon: -74.006, vacancy: 11.4, capRate: 6.8, absorption: 2.8, employment: 0.4 },
  { id: "LA", name: "Los Angeles", lat: 34.0522, lon: -118.244, vacancy: 14.2, capRate: 6.4, absorption: 1.9, employment: 0.6 },
  { id: "CHI", name: "Chicago", lat: 41.8781, lon: -87.6298, vacancy: 18.8, capRate: 7.6, absorption: 1.1, employment: 0.2 },
  { id: "DFW", name: "Dallas–Fort Worth", lat: 32.7767, lon: -96.797, vacancy: 12.1, capRate: 7.1, absorption: 3.4, employment: 1.8 },
  { id: "HOU", name: "Houston", lat: 29.7604, lon: -95.3698, vacancy: 21.4, capRate: 7.4, absorption: 1.7, employment: 1.4 },
  { id: "WAS", name: "Washington DC", lat: 38.9072, lon: -77.0369, vacancy: 15.3, capRate: 7.0, absorption: 2.1, employment: 0.8 },
  { id: "MIA", name: "Miami", lat: 25.7617, lon: -80.1918, vacancy: 7.8, capRate: 6.2, absorption: 3.9, employment: 2.4 },
  { id: "PHL", name: "Philadelphia", lat: 39.9526, lon: -75.1652, vacancy: 14.6, capRate: 7.3, absorption: 1.6, employment: 0.5 },
  { id: "ATL", name: "Atlanta", lat: 33.749, lon: -84.388, vacancy: 16.2, capRate: 7.2, absorption: 2.8, employment: 1.6 },
  { id: "BOS", name: "Boston", lat: 42.3601, lon: -71.0589, vacancy: 12.8, capRate: 6.6, absorption: 2.0, employment: 0.7 },
  { id: "SFO", name: "San Francisco", lat: 37.7749, lon: -122.4194, vacancy: 23.1, capRate: 6.9, absorption: -1.4, employment: -0.6 },
  { id: "PHX", name: "Phoenix", lat: 33.4484, lon: -112.074, vacancy: 10.4, capRate: 6.7, absorption: 3.6, employment: 2.8 },
  { id: "SEA", name: "Seattle", lat: 47.6062, lon: -122.3321, vacancy: 15.6, capRate: 6.8, absorption: 1.9, employment: 1.0 },
  { id: "DEN", name: "Denver", lat: 39.7392, lon: -104.9903, vacancy: 13.2, capRate: 6.9, absorption: 2.2, employment: 1.2 },
  { id: "MIN", name: "Minneapolis", lat: 44.9778, lon: -93.265, vacancy: 17.4, capRate: 7.4, absorption: 1.2, employment: 0.4 },
  { id: "DET", name: "Detroit", lat: 42.3314, lon: -83.0458, vacancy: 22.8, capRate: 8.4, absorption: 0.8, employment: 0.1 },
  { id: "SD", name: "San Diego", lat: 32.7157, lon: -117.1611, vacancy: 11.2, capRate: 6.5, absorption: 2.4, employment: 1.4 },
  { id: "TAM", name: "Tampa", lat: 27.9506, lon: -82.4572, vacancy: 8.6, capRate: 6.6, absorption: 3.2, employment: 2.6 },
  { id: "ORL", name: "Orlando", lat: 28.5383, lon: -81.3792, vacancy: 9.2, capRate: 6.8, absorption: 3.0, employment: 2.8 },
  { id: "CHL", name: "Charlotte", lat: 35.2271, lon: -80.8431, vacancy: 11.8, capRate: 6.9, absorption: 2.6, employment: 1.8 },
  { id: "NSH", name: "Nashville", lat: 36.1627, lon: -86.7816, vacancy: 10.4, capRate: 6.7, absorption: 3.4, employment: 2.4 },
  { id: "AUS", name: "Austin", lat: 30.2672, lon: -97.7431, vacancy: 18.1, capRate: 6.6, absorption: 1.4, employment: 1.6 },
  { id: "POR", name: "Portland", lat: 45.5152, lon: -122.6784, vacancy: 17.8, capRate: 7.1, absorption: 0.6, employment: 0.0 },
  { id: "LV", name: "Las Vegas", lat: 36.1699, lon: -115.1398, vacancy: 12.4, capRate: 7.0, absorption: 2.1, employment: 2.2 },
  { id: "RAL", name: "Raleigh", lat: 35.7796, lon: -78.6382, vacancy: 14.6, capRate: 6.8, absorption: 1.8, employment: 2.0 },
];

export const TREASURY_CURVE = [
  { tenor: "1M", yield: 5.29 }, { tenor: "3M", yield: 5.21 }, { tenor: "6M", yield: 5.04 },
  { tenor: "1Y", yield: 4.78 }, { tenor: "2Y", yield: 4.49 }, { tenor: "3Y", yield: 4.36 },
  { tenor: "5Y", yield: 4.28 }, { tenor: "7Y", yield: 4.30 }, { tenor: "10Y", yield: 4.28 },
  { tenor: "30Y", yield: 4.42 },
];

export const SPREAD_HISTORY = [
  { mo: "Dec 25", bbb: 198, bb: 312 },
  { mo: "Jan 26", bbb: 192, bb: 304 },
  { mo: "Feb 26", bbb: 188, bb: 298 },
  { mo: "Mar 26", bbb: 186, bb: 294 },
  { mo: "Apr 26", bbb: 184, bb: 296 },
  { mo: "May 26", bbb: 182, bb: 292 },
  { mo: "Jun 26", bbb: 182, bb: 290 },
];

export const FEATURED_DEAL = {
  title: "Class A logistics portfolio — DFW + PHX",
  sector: "Industrial",
  status: "Reviewed",
  sf: 1_840_000,
  ask: 412_000_000,
  capRate: 6.4,
  noi: 26_368_000,
  metros: ["DFW", "PHX"],
};

export const METRIC_LABELS: Record<"vacancy" | "capRate" | "absorption" | "employment", string> = {
  vacancy: "Vacancy (%)",
  capRate: "Cap rate (%)",
  absorption: "Net absorption (M sf)",
  employment: "Employment YoY (%)",
};
