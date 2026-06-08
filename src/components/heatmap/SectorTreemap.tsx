"use client";
import { Treemap, ResponsiveContainer } from "recharts";
import { SECTORS } from "@/lib/sample-data";

const data = SECTORS.map((s) => ({ name: s.name, size: s.size, change: s.change }));

function colorFromChange(c: number): string {
  if (c > 3) return "#10B981";
  if (c > 1) return "#34D399";
  if (c > 0) return "#6EE7B7";
  if (c > -1) return "#FCA5A5";
  if (c > -2) return "#F87171";
  return "#EF4444";
}

type CellProps = { x?: number; y?: number; width?: number; height?: number; name?: string; change?: number };

function Cell(props: CellProps) {
  const x = props.x ?? 0, y = props.y ?? 0, width = props.width ?? 0, height = props.height ?? 0;
  const name = props.name ?? "", change = props.change ?? 0;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={colorFromChange(change)} stroke="#FAFAF7" strokeOpacity={0.6} strokeWidth={1} />
      {width > 60 && height > 36 && (
        <>
          <text x={x + 10} y={y + 24} fill="#0B1220" fontFamily="var(--font-display)" fontSize={width > 180 ? 20 : 14} fontWeight={600}>{name}</text>
          <text x={x + 10} y={y + 42} fill="#334155" fontFamily="ui-monospace, monospace" fontSize={11}>{change > 0 ? "+" : ""}{change.toFixed(1)}%</text>
        </>
      )}
    </g>
  );
}

export default function SectorTreemap() {
  return (
    <div className="h-[520px] w-full">
      <ResponsiveContainer>
        <Treemap data={data} dataKey="size" stroke="#FAFAF7" content={<Cell />} animationDuration={600} isAnimationActive />
      </ResponsiveContainer>
    </div>
  );
}
