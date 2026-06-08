"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { TREASURY_CURVE } from "@/lib/sample-data";
import { PALETTE } from "@/lib/constants";

export default function TreasuryCurve() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer>
        <LineChart data={TREASURY_CURVE} margin={{ top: 20, right: 20, left: 0, bottom: 8 }}>
          <XAxis dataKey="tenor" tick={{ fill: PALETTE.slate500, fontSize: 11, fontFamily: "ui-monospace" }} axisLine={{ stroke: PALETTE.border }} tickLine={false} />
          <YAxis domain={[4, 5.5]} tick={{ fill: PALETTE.slate500, fontSize: 11, fontFamily: "ui-monospace" }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip contentStyle={{ background: PALETTE.ink, border: "none", borderRadius: 6, color: PALETTE.paper, fontFamily: "ui-monospace", fontSize: 12 }} />
          <Line type="monotone" dataKey="yield" stroke={PALETTE.orange} strokeWidth={2.4} dot={{ r: 3, fill: PALETTE.gold, stroke: PALETTE.orange }} activeDot={{ r: 5 }} />
          <ReferenceDot x="10Y" y={4.28} r={6} fill={PALETTE.orange} stroke={PALETTE.paper} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
