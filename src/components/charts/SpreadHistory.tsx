"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { SPREAD_HISTORY } from "@/lib/sample-data";
import { PALETTE } from "@/lib/constants";

export default function SpreadHistory() {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer>
        <AreaChart data={SPREAD_HISTORY} margin={{ top: 10, right: 12, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="bbb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PALETTE.orange} stopOpacity={0.5} />
              <stop offset="100%" stopColor={PALETTE.orange} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="bb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PALETTE.gold} stopOpacity={0.45} />
              <stop offset="100%" stopColor={PALETTE.gold} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="mo" tick={{ fill: PALETTE.slate500, fontSize: 10, fontFamily: "ui-monospace" }} axisLine={{ stroke: PALETTE.border }} tickLine={false} />
          <YAxis tick={{ fill: PALETTE.slate500, fontSize: 10, fontFamily: "ui-monospace" }} axisLine={false} tickLine={false} unit="bp" />
          <Tooltip contentStyle={{ background: PALETTE.ink, border: "none", borderRadius: 6, color: PALETTE.paper, fontFamily: "ui-monospace", fontSize: 11 }} />
          <Area type="monotone" dataKey="bbb" stroke={PALETTE.orange} fill="url(#bbb)" strokeWidth={2} />
          <Area type="monotone" dataKey="bb" stroke={PALETTE.gold} fill="url(#bb)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
