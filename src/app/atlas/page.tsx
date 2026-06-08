import CurvedText3D from "@/components/text/CurvedText3D";

export const metadata = { title: "Atlas" };

export default function AtlasPage() {
  return (
    <section className="bg-navy-deep text-paper">
      <div className="bg-grid-dark">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-orange">Brand</div>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Atlas.</h1>
          <p className="mt-4 max-w-2xl text-paper/70">
            A name we picked for a reason. An atlas is the oldest visualization technology we have — the thing every operator opens before a decision. RePrime Atlas is the same idea, applied to twenty-two live data feeds and a 1,155-source catalog.
          </p>
          <div className="mt-10 h-[360px] w-full overflow-hidden rounded-lg border border-paper/10 bg-navy-deep">
            <CurvedText3D text="ATLAS" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { word: "Geographic", body: "Every signal lives on a place. Coordinates, parcels, metros, markets." },
              { word: "Composite", body: "One canvas for sources that normally live in forty tabs." },
              { word: "Honest", body: "Live-bound or sample-badged. No fabricated LIVE labels." },
            ].map((c) => (
              <div key={c.word} className="rounded-lg border border-paper/10 bg-paper/5 p-5">
                <div className="font-display text-xl font-medium text-gold-soft">{c.word}</div>
                <p className="mt-2 text-sm leading-relaxed text-paper/75">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
