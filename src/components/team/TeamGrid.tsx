import { Building2, Banknote, Code2, Globe2 } from "lucide-react";

const ROLES = [
  { icon: Building2, name: "Acquisitions & Development", body: "Sourcing, structuring, and executing on opportunistic and value-add positions across all asset classes. Decades of hands-on operating experience, not consulting overlays." },
  { icon: Banknote, name: "Capital Markets", body: "Senior debt, mezzanine, and joint-venture equity. Direct relationships with institutional lenders, family offices, and program partners. Closed across all market cycles since the early 2000s." },
  { icon: Code2, name: "Technology & Data", body: "The team behind the RePrime Data Platform (22 live govt/market APIs, 1,155-source catalog) and this Atlas visualization layer. Production data engineering, not slideware." },
  { icon: Globe2, name: "International Operations", body: "Cross-border execution and capital introductions across North America and select international markets. Coordinated diligence and reporting standards for institutional LPs." },
];

export default function TeamGrid() {
  return (
    <div className="grid gap-px bg-border md:grid-cols-2">
      {ROLES.map(({ icon: Icon, name, body }) => (
        <div key={name} className="bg-paper p-7">
          <Icon size={22} className="text-orange" />
          <div className="mt-4 font-display text-xl font-medium text-ink">{name}</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
        </div>
      ))}
    </div>
  );
}
