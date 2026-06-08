"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useMemo, useState } from "react";
import { geoAlbersUsa } from "d3-geo";
import { METROS, type Metro } from "@/lib/sample-data";
import { PALETTE } from "@/lib/constants";

export type Metric = "vacancy" | "capRate" | "absorption" | "employment";

function heightFor(metric: Metric, m: Metro): number {
  const v = m[metric];
  switch (metric) {
    case "vacancy": return Math.max(0.08, v / 8);
    case "capRate": return Math.max(0.08, (v - 4) / 1.5);
    case "absorption": return Math.max(0.08, Math.abs(v) / 1.4 + 0.1);
    case "employment": return Math.max(0.08, Math.abs(v) * 1.2 + 0.15);
  }
}

function colorFor(metric: Metric, m: Metro): string {
  const v = m[metric];
  if (metric === "vacancy") return v > 18 ? PALETTE.rose : v > 14 ? PALETTE.orange : PALETTE.gold;
  if (metric === "capRate") return v > 7.4 ? PALETTE.orange : PALETTE.gold;
  if (metric === "absorption") return v < 0 ? PALETTE.rose : v > 2.5 ? PALETTE.emerald : PALETTE.gold;
  return v < 0 ? PALETTE.rose : v > 1.5 ? PALETTE.emerald : PALETTE.gold;
}

function Scene({ metric, hovered, setHovered }: { metric: Metric; hovered: string | null; setHovered: (id: string | null) => void }) {
  const proj = useMemo(() => geoAlbersUsa().scale(900).translate([0, 0]), []);
  const items = useMemo(() => METROS.map((m) => {
    const p = proj([m.lon, m.lat]);
    if (!p) return null;
    return { m, x: p[0] / 80, z: p[1] / 80, h: heightFor(metric, m), color: colorFor(metric, m) };
  }).filter(Boolean) as Array<{ m: Metro; x: number; z: number; h: number; color: string }>, [metric, proj]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color={PALETTE.navyDeep} roughness={0.95} />
      </mesh>
      {items.map((it) => (
        <group key={it.m.id} position={[it.x, it.h / 2, it.z]}>
          <mesh
            castShadow
            onPointerOver={(e) => { e.stopPropagation(); setHovered(it.m.id); }}
            onPointerOut={() => setHovered(null)}
          >
            <boxGeometry args={[0.22, it.h, 0.22]} />
            <meshStandardMaterial color={it.color} emissive={it.color} emissiveIntensity={hovered === it.m.id ? 0.55 : 0.18} roughness={0.4} metalness={0.2} />
          </mesh>
          {hovered === it.m.id && (
            <Html distanceFactor={8} position={[0, it.h / 2 + 0.2, 0]} center>
              <div className="pointer-events-none whitespace-nowrap rounded bg-ink/95 px-2 py-1 font-mono text-[11px] text-paper">
                {it.m.name} · {it.m[metric].toFixed(1)}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}

export default function MetroSkyline({ metric }: { metric: Metric }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <Canvas camera={{ position: [0, 5.5, 7], fov: 36 }} dpr={[1, 2]} shadows>
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 10, 6]} intensity={1.0} color={PALETTE.paper} castShadow />
      <directionalLight position={[-5, 5, -4]} intensity={0.4} color={PALETTE.orange} />
      <Scene metric={metric} hovered={hovered} setHovered={setHovered} />
      <OrbitControls enableZoom enablePan={false} maxPolarAngle={Math.PI / 2.05} minDistance={4} maxDistance={14} autoRotate autoRotateSpeed={0.25} />
    </Canvas>
  );
}
