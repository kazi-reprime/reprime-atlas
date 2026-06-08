# RePrime Atlas v1 — Design Spec

**Status:** Approved 2026-06-09 · **Owner:** mk · **Project:** `reprime-atlas`

## Background

RePrime Data Platform (live at https://reprime-data-platform.vercel.app) ships institutional CRE intelligence as 13 static HTML pages + vanilla JS Three.js. The 2026-06-08 audit found the visualization layer to be the weak link: hardcoded numbers labeled `LIVE`, motion-poor, no unified visual identity. The data plumbing (22 live govt/market APIs, ~1,932-source catalog, Supabase warehouse, Python serverless `/api/search`) is sound and stays.

This spec defines **v1 of a new repository — `reprime-atlas`** — which rebuilds the presentation layer with the visual ambition of 15 reference data-viz sites curated by the user (Kaspersky cybermap, Earth Nullschool, OEC trade flows, TradingView heatmap, Cloudflare Radar, GitHub Skyline, Pudding Human Terrain, NASA Eyes, etc.), while reading from the existing RePrime data spine.

## Goals

- New GitHub repo: `kazi-reprime/reprime-atlas`
- New Vercel deployment: `reprime-atlas.vercel.app`
- 4 hero visualization modules (Globe, Markets, Signals, Metros) shippable in v1
- All numeric values either live-bound or carrying a `Sample` badge (inherits the audit rule)
- Light-first aesthetic with dark cinematic pockets for the 3D scenes

## Non-goals (explicit cuts)

- **No** auth / Supabase login in v1
- **No** port of the existing `/explore` address-fan-out UI in v1 — deferred to v2
- **No** changes to the Python ingestion pipeline
- **No** v2 modules (Windy-style fluid layer, NASA Eyes territory explorer, Nextstrain tree, etc.) — they live in the v2 spec
- **No** content rewrites — about copy reused verbatim where possible

## Architecture

### Stack
- Next.js 16 (App Router, TypeScript strict, React 19)
- Tailwind v4 (CSS-config via `@theme` in `globals.css`)
- React Three Fiber v9 + drei + postprocessing (Globe + Metro 3D)
- Framer Motion for UI, GSAP for scroll-pinned scenes (later)
- Recharts for charts; react-simple-maps + d3-geo for 2D US map projections
- Supabase JS (anon, RLS) for catalog + data_records (server components)
- Resend for `/contact` form delivery
- Vercel Fluid Compute defaults; security headers via `vercel.json`

### Routes (8)
| Path | Component owner | Data binding |
|---|---|---|
| `/` | `app/page.tsx` | `HeroGlobe` (ssr:false) + `SampleBadge`-tagged KPIs |
| `/globe` | `app/globe/page.tsx` | `Globe3D interactive` |
| `/markets` | `app/markets/page.tsx` | `SectorTreemap` + `TreasuryCurve` + `SpreadHistory` |
| `/signals` | `app/signals/page.tsx` | `SourceGrid` (22 live + catalog rollup) |
| `/metros` | `app/metros/page.tsx` | `MetroSkyline` 3D + metric switcher |
| `/sources` | `app/sources/page.tsx` | Client-side filterable list |
| `/about` | `app/about/page.tsx` | Static copy |
| `/contact` | `app/contact/page.tsx` | POST → `/api/contact` → Resend |

### Module specs

- **Globe (`Globe3D.tsx`)** — R3F Canvas with: procedural canvas-texture sphere (orange dot pattern + gold lat/lon grid on navy), 16 capital arcs (drei `Line` over quadratic Béziers), 2,000 gold flow particles in a halo, hub markers per `HUBS` array, drei `Stars` for backdrop. Auto-rotate via OrbitControls. Used at low intensity (no controls) on the landing hero, and at full intensity on `/globe`.
- **Heatmap (`SectorTreemap.tsx`)** — Recharts `Treemap` over `SECTORS`, cell color from 30-day change band, cell content includes name + change. Live wiring path: Supabase `data_records` filtered by `family='reit'`, aggregated to sectors.
- **Ops grid (`SourceGrid.tsx`)** — Server component over `LIVE_SOURCES` (22 endpoints) with status dot + latency sparkline + ingest-age, plus `CATALOG_FAMILIES` as a secondary panel. Live wiring path: poll `https://reprime-data-platform.vercel.app/api/health` from a client island that hydrates the dots.
- **Metro skyline (`MetroSkyline.tsx`)** — R3F Canvas with Albers USA projection (via `d3-geo`) for box positions; per-metro extruded box, height + color from selected metric. Hover → `Html` tooltip. Metric switcher in `/metros/page.tsx`.

### Visual language
- Canvas: `#FAFAF7` paper, `#0B1220` ink
- Hero pockets: `#091533` navy-deep, full-width bleed
- Accents: `#E8763A` orange, `#D4AF37` gold
- Type: Fraunces display (`next/font/google`) + Inter body
- Honesty: `SampleBadge` everywhere a value isn't live-bound

### Honesty rule (inherited from audit)
No visible number may be labeled `LIVE` unless its value flows from a real query. Sample data — `sample-data.ts` — is the v1 fallback and every consumer renders `<SampleBadge />`.

## Data flow

- Server components fetch from Supabase via `lib/supabase.ts` (returns `null` if env not configured, callers fall back to sample data — no build-time breakage)
- Client components hit the existing `https://reprime-data-platform.vercel.app/api/{health,search}` via `lib/reprime-api.ts`
- `/api/contact` validates with `zod` and forwards to Resend; in dev/no-key mode it logs and returns ok

## Testing + quality gates

- Vitest unit tests for `lib/utils.ts` formatters and zod schemas (v1.1)
- Playwright smoke: nav loads, each route renders, each Canvas mounts (v1.1)
- Lighthouse perf target ≥ 90 on landing, a11y ≥ 95
- Pre-commit: gitleaks (config inherited)
- CI: Vercel preview + check (auto)

## Out of scope for v1 (explicit non-goals)

- /explore address search port — v2
- Auth — v2 if needed
- Windy fluid, NASA Eyes, Nextstrain, GitHub Skyline v2 modules — v2
- Mobile-tuned 3D fallbacks beyond `prefers-reduced-motion` — v1.1
- Tests + CI — v1.1

## Risks

- React 19 + Next 16 + r3f v9 peer-dep alignment (mitigated: r3f v9 supports React 19)
- WebGL fallbacks on low-power devices — globe needs a 2D fallback in v1.1
- Resend domain verification on first deploy — manual step
