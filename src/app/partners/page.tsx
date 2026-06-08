import { Building2, Banknote, Globe2, ShieldCheck } from "lucide-react";

export const metadata = { title: "Partners" };

const CATEGORIES = [
  { icon: Building2, title: "Operating partners", body: "Sponsors and operators with deep vertical expertise — multifamily, industrial, mixed-use, life sciences, data centers. We co-invest where their operational edge is real." },
  { icon: Banknote, title: "Capital partners", body: "Institutional LPs, family offices, and private credit funds. Long-duration capital with appetite for opportunistic, value-add, and stabilized profiles." },
  { icon: Globe2, title: "Cross-border partners", body: "Coordinated diligence and reporting across North America and select international markets. Standardized fund admin, audit, and tax workflows." },
  { icon: ShieldCheck, title: "Diligence partners", body: "Legal, environmental, construction, and tax counsel embedded into the underwriting cycle. Trusted networks across all major US markets." },
];

export default function PartnersPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-xs uppercase tracking-wider text-orange">Partners</div>
        <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">How we work with others.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
          RePrime executes alongside operators, capital partners, and diligence specialists chosen for fit on each transaction — not by category. We list the relationship types here, not the parties.
        </p>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {CATEGORIES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-paper p-7">
              <Icon size={22} className="text-orange" />
              <div className="mt-4 font-display text-xl font-medium">{title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
