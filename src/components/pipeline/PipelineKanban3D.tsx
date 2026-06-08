"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { PALETTE } from "@/lib/constants";

const STAGES = ["Sourcing", "Diligence", "Underwriting", "Committee", "Closing"] as const;
type Stage = typeof STAGES[number];

const CARDS: Record<Stage, Array<{ name: string; v: string }>> = {
  Sourcing: [
    { name: "Sun Belt MF · 1,840u", v: "$394M" },
    { name: "Industrial · Inland Empire", v: "$226M" },
    { name: "Office reposition · Atlanta", v: "$92M" },
    { name: "Self-storage · SE roll-up", v: "$118M" },
  ],
  Diligence: [
    { name: "DC portfolio · NoVA", v: "$840M" },
    { name: "Life sciences · Cambridge", v: "$372M" },
    { name: "Grocery-anchored · Tampa", v: "$48M" },
  ],
  Underwriting: [
    { name: "Class A office · Boston", v: "$285M" },
    { name: "MF · Austin metro", v: "$167M" },
  ],
  Committee: [
    { name: "Industrial · DFW + PHX", v: "$412M" },
  ],
  Closing: [
    { name: "The Palms at Doral", v: "$61.2M" },
    { name: "Tampa Bay Industrial", v: "$52.8M" },
  ],
};

function Column({ stage, x, hovered, setHovered }: { stage: Stage; x: number; hovered: string | null; setHovered: (s: string | null) => void }) {
  const cards = CARDS[stage];
  return (
    <group position={[x, 0, 0]}>
      <Html position={[0, 2.4, 0]} center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div style={{ fontFamily: "ui-monospace", fontSize: 11, color: PALETTE.gold, textTransform: "uppercase", letterSpacing: 1.5, whiteSpace: "nowrap" }}>
          {stage}
        </div>
      </Html>
      {cards.map((c, i) => {
        const active = hovered === `${stage}-${i}`;
        return (
          <group key={i} position={[0, -i * 0.55 + 1.4, 0]}>
            <mesh
              onPointerOver={(e) => { e.stopPropagation(); setHovered(`${stage}-${i}`); }}
              onPointerOut={() => setHovered(null)}
            >
              <boxGeometry args={[1.6, 0.42, 0.16]} />
              <meshStandardMaterial
                color={stage === "Closing" ? PALETTE.orange : stage === "Committee" ? PALETTE.gold : PALETTE.navySoft}
                emissive={stage === "Closing" ? PALETTE.orange : PALETTE.navy}
                emissiveIntensity={active ? 0.55 : 0.2}
                roughness={0.4}
                metalness={0.25}
              />
            </mesh>
            {active && (
              <Html position={[0, 0.4, 0.2]} center distanceFactor={6} style={{ pointerEvents: "none" }}>
                <div style={{ background: "rgba(11,18,32,0.95)", color: PALETTE.paper, padding: "4px 8px", borderRadius: 4, fontSize: 11, fontFamily: "ui-monospace", whiteSpace: "nowrap", border: `1px solid ${PALETTE.gold}`}}>
                  {c.name} <span style={{ color: PALETTE.gold }}>· {c.v}</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
      <planeGeometry args={[16, 8]} />
      <meshStandardMaterial color={PALETTE.navyDeep} roughness={0.95} />
    </mesh>
  );
}

function Rig() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.18) * 0.25;
  });
  return <group ref={ref}><Floor /></group>;
}

export default function PipelineKanban3D() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <Canvas camera={{ position: [0, 1.6, 7], fov: 38 }} dpr={[1, 2]} shadows>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 6]} intensity={1} color={PALETTE.paper} castShadow />
      <directionalLight position={[-5, 4, -4]} intensity={0.45} color={PALETTE.orange} />
      <Rig />
      {STAGES.map((s, i) => (
        <Column key={s} stage={s} x={(i - 2) * 2.1} hovered={hovered} setHovered={setHovered} />
      ))}
      <OrbitControls enableZoom enablePan={false} maxPolarAngle={Math.PI / 2.1} minDistance={5} maxDistance={14} autoRotate autoRotateSpeed={0.18} />
    </Canvas>
  );
}
