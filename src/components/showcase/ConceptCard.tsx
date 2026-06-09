type Props = {
  title: string;
  caption: string;
  variant: "globe" | "terminal" | "deal-feed" | "metro";
};

export default function ConceptCard({ title, caption, variant }: Props) {
  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-paper/10 bg-navy-deep shadow-[0_20px_60px_rgba(9,21,51,0.35)]">
      <div className="absolute inset-0 mesh-cool-dark" />
      <div className="absolute inset-0 noise opacity-50" />
      <div className="relative aspect-[16/10] w-full">
        {variant === "globe" && <ConceptGlobe />}
        {variant === "terminal" && <ConceptTerminal />}
        {variant === "deal-feed" && <ConceptDealFeed />}
        {variant === "metro" && <ConceptMetro />}
      </div>
      <figcaption className="relative border-t border-paper/10 bg-navy-deep/85 px-5 py-4 backdrop-blur">
        <div className="text-[10px] uppercase tracking-wider text-orange">{title}</div>
        <div className="mt-1 text-sm text-paper/70">{caption}</div>
      </figcaption>
    </figure>
  );
}

function ConceptGlobe() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <defs>
        <radialGradient id="cg-globe" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E3360" />
          <stop offset="70%" stopColor="#0F1E3D" />
          <stop offset="100%" stopColor="#091533" />
        </radialGradient>
        <linearGradient id="cg-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8763A" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <circle cx="400" cy="250" r="200" fill="url(#cg-globe)" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI;
        return <ellipse key={i} cx="400" cy="250" rx={200 * Math.cos(a)} ry="200" fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.7" />;
      })}
      {Array.from({ length: 9 }).map((_, i) => {
        const r = ((i + 1) / 10) * 200;
        return <circle key={i} cx="400" cy="250" r={r} fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />;
      })}
      <path d="M 200 250 Q 400 80 600 250" fill="none" stroke="url(#cg-arc)" strokeWidth="2" opacity="0.85" />
      <path d="M 250 180 Q 400 60 580 200" fill="none" stroke="url(#cg-arc)" strokeWidth="1.5" opacity="0.7" />
      <path d="M 240 320 Q 400 460 590 320" fill="none" stroke="url(#cg-arc)" strokeWidth="1.5" opacity="0.7" />
      <path d="M 200 250 Q 350 150 560 280" fill="none" stroke="#E8763A" strokeWidth="1" opacity="0.5" />
      {[[200, 250], [600, 250], [400, 80], [400, 420], [250, 180], [580, 200], [240, 320], [590, 320]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" fill="#E8763A" opacity="0.18" />
          <circle cx={x} cy={y} r="4" fill="#E8763A" />
        </g>
      ))}
      <text x="40" y="40" fontFamily="ui-serif, Georgia, serif" fontSize="18" fontWeight="600" fill="#FAFAF7">
        Capital flow globe
      </text>
      <text x="40" y="60" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(232,118,58,0.85)" letterSpacing="2">
        16 ARCS · 13 HUBS · LIVE
      </text>
    </svg>
  );
}

function ConceptTerminal() {
  const rows = [
    ["UST10Y", "4.28%", "+0.03", "#6EE7B7"],
    ["UST2Y", "4.49%", "-0.02", "#FCA5A5"],
    ["SOFR", "5.31%", "-0.01", "#FCA5A5"],
    ["VNQ", "$87.42", "+0.6%", "#6EE7B7"],
    ["SPG", "$162.18", "+1.2%", "#6EE7B7"],
    ["PLD", "$118.05", "-0.4%", "#FCA5A5"],
    ["EQIX", "$928.30", "+0.9%", "#6EE7B7"],
    ["AMT", "$214.66", "+0.2%", "#6EE7B7"],
  ];
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <rect width="800" height="500" fill="#091533" />
      <text x="40" y="40" fontFamily="ui-serif, Georgia, serif" fontSize="18" fontWeight="600" fill="#FAFAF7">Executive terminal</text>
      <text x="40" y="60" fontFamily="ui-monospace, monospace" fontSize="10" fill="#E8763A" letterSpacing="2">8 LIVE TICKERS · 4.2s CYCLE</text>
      <rect x="40" y="90" width="720" height="370" fill="rgba(15,30,61,0.55)" stroke="rgba(212,175,55,0.18)" strokeWidth="1" rx="8" />
      {rows.map(([sym, val, chg, color], i) => (
        <g key={i}>
          <text x="80" y={140 + i * 38} fontFamily="ui-monospace, monospace" fontSize="14" fill="#FAFAF7">{sym as string}</text>
          <text x="320" y={140 + i * 38} fontFamily="ui-monospace, monospace" fontSize="14" fill="#FAFAF7">{val as string}</text>
          <text x="520" y={140 + i * 38} fontFamily="ui-monospace, monospace" fontSize="14" fill={color as string}>{chg as string}</text>
          <circle cx={700} cy={135 + i * 38} r="4" fill={color as string} opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

function ConceptDealFeed() {
  const deals = [
    { kind: "Reviewed", asset: "Industrial · DFW + PHX", val: "$412M", color: "#E8763A" },
    { kind: "Sourced", asset: "Class A office · Boston", val: "$285M", color: "#D4AF37" },
    { kind: "Advised", asset: "Multifamily · Austin", val: "$167M", color: "#F4A574" },
    { kind: "Reviewed", asset: "Data center · NoVA", val: "$840M", color: "#E8763A" },
    { kind: "Sourced", asset: "Grocery retail · Tampa", val: "$48M", color: "#D4AF37" },
    { kind: "Advised", asset: "Cold-storage · Inland Empire", val: "$226M", color: "#F4A574" },
  ];
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <rect width="800" height="500" fill="#091533" />
      <text x="40" y="40" fontFamily="ui-serif, Georgia, serif" fontSize="18" fontWeight="600" fill="#FAFAF7">Live deal feed</text>
      <text x="40" y="60" fontFamily="ui-monospace, monospace" fontSize="10" fill="#E8763A" letterSpacing="2">REVIEWED · SOURCED · ADVISED</text>
      {deals.map((d, i) => (
        <g key={i}>
          <rect x="40" y={90 + i * 60} width="720" height="48" fill="rgba(15,30,61,0.55)" stroke="rgba(212,175,55,0.12)" strokeWidth="0.8" rx="6" />
          <text x="60" y={120 + i * 60} fontFamily="ui-monospace, monospace" fontSize="10" fill={d.color} letterSpacing="1.5">{d.kind}</text>
          <text x="160" y={120 + i * 60} fontFamily="ui-monospace, monospace" fontSize="13" fill="#FAFAF7">{d.asset}</text>
          <text x="640" y={120 + i * 60} fontFamily="ui-monospace, monospace" fontSize="14" fill="#E8D58A">{d.val}</text>
        </g>
      ))}
    </svg>
  );
}

function ConceptMetro() {
  const bars = [
    { x: 80, h: 200 }, { x: 130, h: 280 }, { x: 180, h: 240 },
    { x: 230, h: 180 }, { x: 280, h: 260 }, { x: 330, h: 320 },
    { x: 380, h: 280 }, { x: 430, h: 220 }, { x: 480, h: 300 },
    { x: 530, h: 360 }, { x: 580, h: 240 }, { x: 630, h: 200 }, { x: 680, h: 170 },
  ];
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full">
      <rect width="800" height="500" fill="#091533" />
      <text x="40" y="40" fontFamily="ui-serif, Georgia, serif" fontSize="18" fontWeight="600" fill="#FAFAF7">Metro skyline</text>
      <text x="40" y="60" fontFamily="ui-monospace, monospace" fontSize="10" fill="#E8763A" letterSpacing="2">25 METROS · 4 METRICS</text>
      <line x1="40" y1="460" x2="760" y2="460" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
      {bars.map((b, i) => {
        const grad = i % 3 === 0 ? "#E8763A" : i % 3 === 1 ? "#D4AF37" : "#F4A574";
        return (
          <g key={i}>
            <rect x={b.x} y={460 - b.h} width="35" height={b.h} fill={grad} opacity="0.85" rx="2" />
            <rect x={b.x} y={460 - b.h} width="35" height="6" fill="#FAFAF7" opacity="0.7" />
            <rect x={b.x + 4} y={460 - b.h + 10} width="3" height={b.h - 16} fill="rgba(11,18,32,0.4)" />
            <rect x={b.x + 12} y={460 - b.h + 10} width="3" height={b.h - 16} fill="rgba(11,18,32,0.4)" />
            <rect x={b.x + 20} y={460 - b.h + 10} width="3" height={b.h - 16} fill="rgba(11,18,32,0.4)" />
            <rect x={b.x + 28} y={460 - b.h + 10} width="3" height={b.h - 16} fill="rgba(11,18,32,0.4)" />
          </g>
        );
      })}
    </svg>
  );
}
