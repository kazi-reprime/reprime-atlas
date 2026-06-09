import { getSupabase } from "./supabase";
import { REPRIME_STATS } from "./reprime-data";

// Server-side helpers — return live data from Supabase if configured,
// fall back to baked-in stats otherwise. Every consumer gets a typed
// shape regardless.

export type LiveStats = {
  sources: number;
  data_records: number;
  categories: number;
  last_ingest: string | null;
  is_live: boolean;
};

export async function fetchLiveStats(): Promise<LiveStats> {
  const sb = getSupabase();
  if (!sb) {
    return {
      sources: REPRIME_STATS.cataloged_sources,
      data_records: 24_801,
      categories: REPRIME_STATS.category_count,
      last_ingest: null,
      is_live: false,
    };
  }
  try {
    const [{ count: sources }, { count: dr }, { data: cats }] = await Promise.all([
      sb.from("sources").select("*", { count: "exact", head: true }),
      sb.from("data_records").select("*", { count: "exact", head: true }),
      sb.from("sources").select("category"),
    ]);
    const categories = new Set((cats ?? []).map((r: { category: string }) => r.category)).size;
    return {
      sources: sources ?? REPRIME_STATS.cataloged_sources,
      data_records: dr ?? 24_801,
      categories: categories || REPRIME_STATS.category_count,
      last_ingest: new Date().toISOString(),
      is_live: true,
    };
  } catch {
    return {
      sources: REPRIME_STATS.cataloged_sources,
      data_records: 24_801,
      categories: REPRIME_STATS.category_count,
      last_ingest: null,
      is_live: false,
    };
  }
}

export type LiveSourceRow = { id: string | number; name: string; category: string; provider?: string };

export async function fetchTopSources(limit = 60): Promise<{ rows: LiveSourceRow[]; is_live: boolean }> {
  const sb = getSupabase();
  if (!sb) return { rows: [], is_live: false };
  try {
    const { data } = await sb.from("sources").select("id,name,category,provider").limit(limit);
    return { rows: (data ?? []) as LiveSourceRow[], is_live: Boolean(data) };
  } catch {
    return { rows: [], is_live: false };
  }
}
