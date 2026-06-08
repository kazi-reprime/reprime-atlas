import SourceGrid from "@/components/ops-grid/SourceGrid";

export const metadata = { title: "Source signals" };

export default function SignalsPage() {
  return (
    <section className="bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-xs uppercase tracking-wider text-orange">Module C</div>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Source signals</h1>
          <p className="mt-4 max-w-2xl text-paper/70">
            The live operational view across the 22 fan-out endpoints and the 1,932-entry source catalog that feed RePrime Atlas. Every cell shows its most recent health probe, latency, and ingest age.
          </p>
          <div className="mt-12">
            <SourceGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
