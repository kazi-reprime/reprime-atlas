import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reprime-atlas.vercel.app";
  return [
    { url: base,                changeFrequency: "daily" as const,   priority: 1   },
    { url: `${base}/terminal`,  changeFrequency: "weekly" as const,  priority: 0.9 },
    { url: `${base}/visualize`, changeFrequency: "weekly" as const,  priority: 0.9 },
    { url: `${base}/info`,      changeFrequency: "monthly" as const, priority: 0.7 },
  ].map(s => ({ ...s, lastModified: new Date() }));
}
