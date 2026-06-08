# RePrime Atlas

> **The institutional view of commercial real estate.** A dense, motion-aware visualization layer on top of the [RePrime Data Platform](https://github.com/kazi-reprime/reprime-data-platform) — 22 live government and market feeds + a 1,932-source curated catalog, presented across four hero surfaces (Globe, Markets, Signals, Metros).

- **Live:** https://reprime-atlas.vercel.app
- **Data source of truth:** [`reprime-data-platform`](https://github.com/kazi-reprime/reprime-data-platform) Supabase + `/api/search`
- **Design spec:** [`docs/specs/2026-06-09-reprime-atlas-design.md`](./docs/specs/2026-06-09-reprime-atlas-design.md)
- **License:** MIT © 2026 RePrime Group

## Stack

- **Next.js 16** App Router · TypeScript strict · React 19
- **Tailwind v4** (CSS-config via `@theme`) + Radix UI primitives
- **React Three Fiber** + drei + postprocessing for the globe & metro 3D
- **Framer Motion** for UI, **GSAP** for scroll-pinned scenes
- **Recharts** for charts, **react-simple-maps** for 2D US maps
- **Supabase JS** (anon, RLS) for catalog + data_records reads
- **Resend** for `/contact` form delivery

## Routes

| Route | Surface |
|---|---|
| `/` | Landing — 3D globe hero, KPI strip, capability cards |
| `/globe` | Capital-flow globe — animated great-circle arcs |
| `/markets` | CRE sector heatmap + REIT leaderboards + Treasury curve |
| `/signals` | 22 live endpoints + 1,932-source ops grid |
| `/metros` | 3D extruded US map with metric switcher |
| `/sources` | Searchable catalog explorer |
| `/about` | Mission |
| `/contact` | Access request form |

## Local dev

```bash
pnpm install
cp .env.example .env.local        # fill in keys, or leave empty for sample-data mode
pnpm dev                          # http://localhost:3000
```

## Visual rules (inherited from RePrime Data Platform audit)

- Every numeric value on screen is either **live-bound** to the data platform or carries a `Sample` badge.
- No fabricated values labeled "Live".
- All Three.js / WebGL scenes respect `prefers-reduced-motion`.
- A11y target: ≥ AA contrast, focus rings on every interactive element.

## Deployment

Pushes to `main` auto-deploy to Vercel. PRs get preview URLs. Required env vars:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
REPRIME_API_BASE        (optional — defaults to production)
RESEND_API_KEY
LEAD_INBOX_EMAIL
NEXT_PUBLIC_SITE_URL
```
