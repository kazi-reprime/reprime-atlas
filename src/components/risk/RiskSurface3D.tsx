"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PALETTE } from "@/lib/constants";

export type RiskMode = "climate" | "credit" | "vacancy";

function riskFn(x: number, z: number, mode: RiskMode, t: number): number {
  const base =
    Math.sin(x * 0.4 + t * 0.5) * 0.4 +
    Math.cos(z * 0.5 + t * 0.3) * 0.4 +
    Math.sin((x + z) * 0.7) * 0.2;
  if (mode === "climate") return base + Math.exp(-((x - 2) ** 2 + (z + 2) ** 2) / 4) * 1.2;
  if (mode === "credit") return base + Math.exp(-((x + 2) ** 2 + (z - 1) ** 2) / 3) * 1.1;
  return base + Math.exp(-((x + 1) ** 2 + (z + 1) ** 2) / 6) * 0.8;
}

function Surface({ mode }: { mode: RiskMode }) {
  const ref = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const seg = 64;
    const g = new THREE.PlaneGeometry(8, 6, seg, seg);
    return g;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = (ref.current.geometry as THREE.PlaneGeometry).attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, riskFn(x, y, mode, t));
    }
    pos.needsUpdate = true;
    (ref.current.geometry as THREE.PlaneGeometry).computeVertexNormals();
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.5, 0, 0]} geometry={geom}>
      <meshStandardMaterial
        color={mode === "climate" ? PALETTE.orange : mode === "credit" ? PALETTE.gold : PALETTE.navySoft}
        wireframe
        emissive={mode === "climate" ? PALETTE.orange : PALETTE.gold}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function RiskSurface3D({ mode }: { mode: RiskMode }) {
  return (
    <Canvas camera={{ position: [0, 3.6, 6], fov: 44 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.0} color={PALETTE.paper} />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} color={PALETTE.orange} />
      <Surface mode={mode} />
      <OrbitControls enableZoom enablePan={false} maxPolarAngle={Math.PI / 2.05} minDistance={5} maxDistance={12} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
}
