"use client";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { PALETTE } from "@/lib/constants";

const DATA = [
  { metric: "Vacancy",      v1: 78, v2: 45, full: 100 },
  { metric: "Cap Rate",     v1: 65, v2: 52, full: 100 },
  { metric: "Absorption",   v1: 82, v2: 68, full: 100 },
  { metric: "Rent Growth",  v1: 74, v2: 81, full: 100 },
  { metric: "Construction", v1: 56, v2: 72, full: 100 },
  { metric: "Sales Volume", v1: 88, v2: 61, full: 100 },
  { metric: "Employment",   v1: 71, v2: 79, full: 100 },
];

export default function PolarRadar() {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer>
        <RadarChart data={DATA}>
          <PolarGrid stroke="rgba(212,175,55,0.18)" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: PALETTE.paper, fontSize: 11, fontFamily: "ui-monospace" }} />
          <PolarRadiusAxis tick={{ fill: PALETTE.paper, fontSize: 9, fontFamily: "ui-monospace" }} angle={30} domain={[0, 100]} stroke="rgba(212,175,55,0.3)" />
          <Radar name="2025" dataKey="v1" stroke={PALETTE.orange} fill={PALETTE.orange} fillOpacity={0.32} />
          <Radar name="2026 YTD" dataKey="v2" stroke={PALETTE.gold} fill={PALETTE.gold} fillOpacity={0.28} />
          <Legend wrapperStyle={{ fontSize: 11, fontFamily: "ui-monospace", color: PALETTE.paper }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
