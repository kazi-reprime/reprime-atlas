import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
          <div className="font-mono text-[11px] uppercase tracking-wider text-orange">404 · OFF THE MAP</div>
          <h1 className="mt-4 font-display text-6xl font-medium tracking-tight">No tile here.</h1>
          <p className="mt-4 max-w-md text-paper/70">
            The route you tried isn&apos;t in the Atlas. Maybe it&apos;s in v2 — see <span className="font-mono text-paper/85">docs/specs/2026-06-09-v2-roadmap.md</span>.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="rounded-full bg-orange px-5 py-2 text-sm font-medium text-navy-deep hover:bg-orange-soft">Back to the globe</Link>
            <Link href="/dashboard" className="rounded-full border border-paper/30 px-5 py-2 text-sm font-medium text-paper hover:bg-paper/10">Open dashboard</Link>
            <Link href="/sources" className="rounded-full border border-paper/30 px-5 py-2 text-sm font-medium text-paper hover:bg-paper/10">Browse sources</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
