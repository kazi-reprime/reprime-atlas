import TeamGrid from "@/components/team/TeamGrid";
import { REPRIME_TEAM } from "@/lib/reprime-data";

export const metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-xs uppercase tracking-wider text-orange">{REPRIME_TEAM.eyebrow}</div>
        <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">{REPRIME_TEAM.headline}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">{REPRIME_TEAM.body}</p>
        <div className="mt-12">
          <TeamGrid />
        </div>
      </div>
    </section>
  );
}
