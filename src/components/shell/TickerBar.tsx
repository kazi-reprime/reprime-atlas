const TICKS = [
  { sym: "UST10Y", val: "4.28%", chg: "+0.03" },
  { sym: "UST2Y", val: "4.49%", chg: "-0.02" },
  { sym: "SOFR", val: "5.31%", chg: "-0.01" },
  { sym: "VNQ", val: "$87.42", chg: "+0.6%" },
  { sym: "SPG", val: "$162.18", chg: "+1.2%" },
  { sym: "PLD", val: "$118.05", chg: "-0.4%" },
  { sym: "EQIX", val: "$928.30", chg: "+0.9%" },
  { sym: "AMT", val: "$214.66", chg: "+0.2%" },
  { sym: "Office Cap (Q1)", val: "7.4%", chg: "+10bps" },
  { sym: "Industrial Vacancy", val: "6.8%", chg: "-20bps" },
  { sym: "Multifamily NOI YoY", val: "+2.4%", chg: "+0.3pp" },
  { sym: "BBB CRE Spread", val: "+182bps", chg: "-4" },
];

export default function TickerBar() {
  const items = [...TICKS, ...TICKS];
  return (
    <div className="border-b border-navy/40 bg-navy-deep text-paper/90">
      <div className="relative flex overflow-hidden whitespace-nowrap py-1.5 text-xs">
        <span className="absolute left-0 top-0 z-10 flex h-full items-center bg-navy-deep px-3 text-[10px] font-medium uppercase tracking-wider text-orange">
          <span className="mr-1.5 h-1.5 w-1.5 animate-livepulse rounded-full bg-orange" />
          Live
          <span className="ml-2 rounded border border-paper/15 px-1 text-[9px] uppercase tracking-wider text-paper/40">
            Sample
          </span>
        </span>
        <div className="flex animate-ticker gap-7 pl-32">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="font-mono text-paper/50">{t.sym}</span>
              <span className="font-mono text-paper">{t.val}</span>
              <span className={`font-mono ${t.chg.startsWith("-") ? "text-rose-300" : "text-emerald-300"}`}>
                {t.chg}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
