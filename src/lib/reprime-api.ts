import { REPRIME_API_BASE } from "./constants";

export type HealthResponse = {
  ok: boolean;
  ts?: string;
  sources?: Record<string, { status: string; latency_ms?: number }>;
};

export async function getHealth(init?: { signal?: AbortSignal; cache?: RequestCache }): Promise<HealthResponse | null> {
  try {
    const r = await fetch(`${REPRIME_API_BASE}/api/health`, {
      signal: init?.signal,
      cache: init?.cache ?? "no-store",
    });
    if (!r.ok) return null;
    return (await r.json()) as HealthResponse;
  } catch {
    return null;
  }
}

export type SearchResponse = { address: string; results: Record<string, unknown> };

export async function searchAddress(address: string, init?: { signal?: AbortSignal }): Promise<SearchResponse | null> {
  try {
    const u = new URL(`${REPRIME_API_BASE}/api/search`);
    u.searchParams.set("address", address);
    const r = await fetch(u.toString(), { signal: init?.signal, cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as SearchResponse;
  } catch {
    return null;
  }
}
