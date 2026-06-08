import type { MetadataRoute } from "next";

const ROUTES = [
  "", "globe", "markets", "signals", "metros", "properties", "sources",
  "dashboard", "terminal", "explore", "risk", "team", "partners", "faq", "atlas", "about", "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reprime-atlas.vercel.app";
  return ROUTES.map((r) => ({
    url: r ? `${base}/${r}` : base,
    lastModified: new Date(),
    changeFrequency: r === "" ? "daily" : "weekly",
    priority: r === "" ? 1 : r === "atlas" || r === "globe" || r === "terminal" || r === "dashboard" ? 0.9 : 0.7,
  }));
}
