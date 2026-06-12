"use client";
// Streaming operations feed — new events slide in continuously. INGEST rows
// use real source names from the live RePrime Data Platform catalog.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FEED_COLORS, type FeedItem, loadSourceCatalog, makeFeedItem } from "./factory-data";

const MAX_ITEMS = 22;
const PUSH_MS = 1500;

export default function LiveOpsFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const sourcesRef = useRef<string[]>(["RePrime catalog"]);

  useEffect(() => {
    let cancelled = false;
    loadSourceCatalog().then((names) => { if (!cancelled && names.length) sourcesRef.current = names; });
    setItems(Array.from({ length: 10 }, () => makeFeedItem(sourcesRef.current)));
    const t = setInterval(() => {
      setItems((prev) => [makeFeedItem(sourcesRef.current), ...prev].slice(0, MAX_ITEMS));
    }, PUSH_MS);
    return () => { cancelled = true; clearInterval(t); };
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-paper/10 bg-paper/[0.03] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-300">
          <span className="h-1.5 w-1.5 animate-livepulse rounded-full bg-emerald-300" />
          Live Feed · Streaming
        </div>
        <span className="text-[10px] uppercase tracking-wider text-paper/45">last 60 seconds</span>
      </div>
      <div className="min-h-0 flex-1 space-y-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((it) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-2 border-b border-paper/[0.05] py-1 text-[11px]"
            >
              <span className={`w-24 shrink-0 font-mono text-[10px] uppercase tracking-wider ${FEED_COLORS[it.kind]}`}>{it.kind}</span>
              <span className="w-7 shrink-0 font-mono text-paper/55">{it.state}</span>
              <span className="truncate text-paper/80">{it.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
