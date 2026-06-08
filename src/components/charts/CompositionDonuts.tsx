"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PALETTE } from "@/lib/constants";

type Slice = { name: string; value: number };

const BY_TYPE: Slice[] = [
  { name: "Multifamily", value: 41 },
  { name: "Industrial", value: 22 },
  { name: "Office", value: 14 },
  { name: "Mixed-Use", value: 13 },
  { name: "Retail", value: 10 },
];

const BY_GEO: Slice[] = [
  { name: "Southeast", value: 48 },
  { name: "Sun Belt", value: 24 },
  { name: "Northeast", value: 16 },
  { name: "West", value: 12 },
];

const BY_HOLD: Slice[] = [
  { name: "Stabilized", value: 52 },
  { name: "Value-Add", value: 31 },
  { name: "Opportunistic", value: 17 },
];

const COLORS = [PALETTE.orange, PALETTE.gold, PALETTE.orangeSoft, PALETTE.goldSoft, PALETTE.navySoft, "#6EE7B7"];

function Donut({ title, data }: { title: string; data: Slice[] }) {
  return (
    <div className="rounded-lg border border-border bg-paper p-5">
      <div className="text-[11px] uppercase tracking-wider text-slate-500">{title}</div>
      <div className="mt-2 h-[180px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={2} dataKey="value" stroke="none">
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 space-y-1">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
              {d.name}
            </span>
            <span className="font-mono text-slate-600">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CompositionDonuts() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Donut title="By asset type" data={BY_TYPE} />
      <Donut title="By geography" data={BY_GEO} />
      <Donut title="By hold strategy" data={BY_HOLD} />
    </div>
  );
}
