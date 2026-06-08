"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ARCS, HUBS } from "@/lib/sample-data";
import { PALETTE } from "@/lib/constants";

function latLonToVec3(lat: number, lon: number, r = 2): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function useProceduralGlobeTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 2048; c.height = 1024;
    const g = c.getContext("2d");
    if (!g) return null;
    g.fillStyle = PALETTE.navyDeep;
    g.fillRect(0, 0, 2048, 1024);
    g.fillStyle = "rgba(232,118,58,0.12)";
    for (let i = 0; i < 9000; i++) {
      g.beginPath();
      g.arc(Math.random() * 2048, Math.random() * 1024, Math.random() * 1.4, 0, Math.PI * 2);
      g.fill();
    }
    g.strokeStyle = "rgba(212,175,55,0.20)";
    g.lineWidth = 0.8;
    for (let lat = -80; lat <= 80; lat += 15) {
      const y = ((90 - lat) / 180) * 1024;
      g.beginPath(); g.moveTo(0, y); g.lineTo(2048, y); g.stroke();
    }
    for (let lon = 0; lon < 360; lon += 30) {
      const x = (lon / 360) * 2048;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 1024); g.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);
}

function GlobeSphere() {
  const ref = useRef<THREE.Group>(null);
  const tex = useProceduralGlobeTexture();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.05; });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2, 96, 96]} />
        <meshStandardMaterial map={tex ?? undefined} roughness={0.85} metalness={0.06} emissive={PALETTE.navy} emissiveIntensity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.04, 64, 64]} />
        <meshBasicMaterial color={PALETTE.orange} transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Arcs() {
  const curves = useMemo(() => ARCS.map((a) => {
    const start = latLonToVec3(a.from[0], a.from[1], 2.005);
    const end = latLonToVec3(a.to[0], a.to[1], 2.005);
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2 + 0.22 * a.weight);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return { points: curve.getPoints(80).map((p) => [p.x, p.y, p.z] as [number, number, number]), color: a.color };
  }), []);
  return (
    <group>
      {curves.map((c, i) => (
        <Line key={i} points={c.points} color={c.color} transparent opacity={0.6} lineWidth={1.2} />
      ))}
    </group>
  );
}

function HubMarkers() {
  return (
    <group>
      {HUBS.map((h) => {
        const p = latLonToVec3(h.lat, h.lon, 2.02);
        return (
          <mesh key={h.id} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshBasicMaterial color={PALETTE.orange} />
          </mesh>
        );
      })}
    </group>
  );
}

function FlowParticles() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const n = 2000;
    const positions = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const lat = (Math.random() - 0.5) * 180;
      const lon = Math.random() * 360 - 180;
      const r = 2.1 + Math.random() * 0.3;
      const v = latLonToVec3(lat, lon, r);
      positions[i * 3] = v.x; positions[i * 3 + 1] = v.y; positions[i * 3 + 2] = v.z;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.025; });
  return (
    <points ref={ref}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial size={0.02} color={PALETTE.gold} transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

type Props = { interactive?: boolean };
export default function Globe3D({ interactive = false }: Props) {
  return (
    <Canvas camera={{ position: [0, 0.4, 6.4], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 4, 5]} intensity={1.05} color={PALETTE.paper} />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color={PALETTE.orange} />
      <Stars radius={70} depth={50} count={3500} factor={2.8} fade speed={0.3} />
      <GlobeSphere />
      <Arcs />
      <HubMarkers />
      <FlowParticles />
      <OrbitControls
        enableZoom={interactive}
        enablePan={false}
        enableRotate={interactive}
        autoRotate
        autoRotateSpeed={0.45}
        minDistance={4}
        maxDistance={9}
      />
    </Canvas>
  );
}
