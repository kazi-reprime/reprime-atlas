"use client";
import { useEffect, useState } from "react";
import { PALETTE } from "@/lib/constants";

const HUBS = [
  { id: "NYC", name: "New York",     volume: 24.5 },
  { id: "LDN", name: "London",       volume: 19.2 },
  { id: "TKY", name: "Tokyo",        volume: 14.7 },
  { id: "SGP", name: "Singapore",    volume: 11.8 },
  { id: "HKG", name: "Hong Kong",    volume: 9.6  },
  { id: "FRA", name: "Frankfurt",    volume: 8.4  },
  { id: "SFO", name: "San Francisco",volume: 12.3 },
  { id: "DXB", name: "Dubai",        volume: 6.8  },
  { id: "MIA", name: "Miami",        volume: 5.9  },
  { id: "TOR", name: "Toronto",      volume: 5.2  },
];

const FLOWS: [number, number, number][] = [
  [0, 1, 8.2], [0, 6, 6.7], [0, 8, 4.1], [0, 9, 3.6],
  [1, 5, 5.2], [1, 3, 3.8], [1, 7, 4.5],
  [2, 3, 6.4], [2, 4, 5.9], [2, 6, 4.1],
  [3, 4, 4.2], [3, 7, 3.1],
  [4, 1, 3.9], [4, 5, 2.8],
  [6, 2, 5.1], [6, 8, 3.4],
  [7, 5, 2.9],
];

export default function ChordCapitalFlow() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(i);
  }, []);

  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 200;

  const positions = HUBS.map((_, i) => {
    const angle = (i / HUBS.length) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius, angle };
  });

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${size} ${size}`} className="block h-full w-full">
        <defs>
          <radialGradient id="chord-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PALETTE.orange} stopOpacity="0.18" />
            <stop offset="100%" stopColor={PALETTE.orange} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={radius} fill="url(#chord-glow)" />
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6" />

        {/* Flow chords */}
        {FLOWS.map(([a, b, w], i) => {
          const pa = positions[a]; const pb = positions[b];
          const phase = (tick + i * 7) % 100 / 100;
          const op = 0.25 + 0.55 * Math.abs(Math.sin(phase * Math.PI));
          return (
            <path
              key={`${a}-${b}`}
              d={`M ${pa.x} ${pa.y} Q ${cx} ${cy} ${pb.x} ${pb.y}`}
              fill="none"
              stroke={i % 3 === 0 ? PALETTE.orange : i % 3 === 1 ? PALETTE.gold : PALETTE.orangeSoft}
              strokeWidth={w * 0.3}
              opacity={op}
            />
          );
        })}

        {/* Hub circles */}
        {HUBS.map((h, i) => {
          const p = positions[i];
          const r = 4 + h.volume * 0.5;
          return (
            <g key={h.id}>
              <circle cx={p.x} cy={p.y} r={r + 6} fill={PALETTE.orange} opacity="0.18" />
              <circle cx={p.x} cy={p.y} r={r} fill={PALETTE.gold} />
              <text x={p.x + (p.angle > -Math.PI/2 && p.angle < Math.PI/2 ? 14 : -14) + (Math.cos(p.angle) > 0 ? 0 : 0)} y={p.y + Math.sin(p.angle) * 8 + 4} textAnchor={Math.cos(p.angle) > 0 ? "start" : "end"} fontFamily="ui-monospace" fontSize="10" fill={PALETTE.paper} letterSpacing="1.5">
                {h.name}
              </text>
              <text x={p.x + (Math.cos(p.angle) > 0 ? 14 : -14)} y={p.y + Math.sin(p.angle) * 8 + 16} textAnchor={Math.cos(p.angle) > 0 ? "start" : "end"} fontFamily="ui-monospace" fontSize="9" fill={PALETTE.gold}>
                ${h.volume.toFixed(1)}B
              </text>
            </g>
          );
        })}

        <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="ui-serif, Georgia, serif" fontSize="18" fontWeight="600" fill={PALETTE.paper}>Capital</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="ui-serif, Georgia, serif" fontSize="18" fontWeight="600" fill={PALETTE.orange}>Flow Chord</text>
        <text x={cx} y={cy + 28} textAnchor="middle" fontFamily="ui-monospace" fontSize="9" fill={PALETTE.paper} opacity="0.55" letterSpacing="2">10 HUBS · 17 ACTIVE FLOWS</text>
      </svg>
    </div>
  );
}
