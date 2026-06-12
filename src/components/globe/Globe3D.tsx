"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Line, Html } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import { ARCS } from "@/lib/sample-data";
import { GLOBE_LABELS } from "@/lib/reprime-data";
import { PALETTE } from "@/lib/constants";

const RADIUS = 2;

function latLonToVec3(lat: number, lon: number, r = RADIUS): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeBase() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[RADIUS, 96, 96]} />
        <meshStandardMaterial
          color={PALETTE.navyDeep}
          roughness={0.95}
          metalness={0.05}
          emissive={PALETTE.navy}
          emissiveIntensity={0.18}
        />
      </mesh>
      {/* Atmospheric halo */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.04, 64, 64]} />
        <meshBasicMaterial color={PALETTE.orange} transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      {/* Lat/lon graticule overlay */}
      <Graticule />
    </>
  );
}

function Graticule() {
  const lines = useMemo(() => {
    const out: Array<[number, number, number][]> = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts: [number, number, number][] = [];
      for (let lon = -180; lon <= 180; lon += 5) {
        const v = latLonToVec3(lat, lon, RADIUS * 1.002);
        pts.push([v.x, v.y, v.z]);
      }
      out.push(pts);
    }
    for (let lon = -180; lon < 180; lon += 30) {
      const pts: [number, number, number][] = [];
      for (let lat = -85; lat <= 85; lat += 5) {
        const v = latLonToVec3(lat, lon, RADIUS * 1.002);
        pts.push([v.x, v.y, v.z]);
      }
      out.push(pts);
    }
    return out;
  }, []);
  return (
    <group>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={PALETTE.gold} transparent opacity={0.12} lineWidth={1} />
      ))}
    </group>
  );
}

function Countries() {
  const [topology, setTopology] = useState<any>(null);
  useEffect(() => {
    let cancelled = false;
    // Public CDN topology (Natural Earth, simplified) — runtime fetch, not bundled
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then((t: any) => { if (!cancelled) setTopology(t); })
      .catch((e) => { console.warn("[Globe3D] topology CDN fetch failed — rendering without borders", e); });
    return () => { cancelled = true; };
  }, []);

  const lines = useMemo(() => {
    if (!topology) return [];
    const countries: any = feature(topology, topology.objects.countries as any);
    const allLines: Array<[number, number, number][]> = [];
    const features: any[] = countries.features ?? [countries];
    for (const f of features) {
      const geom = f.geometry;
      if (!geom) continue;
      const ringSets: number[][][][] =
        geom.type === "Polygon"
          ? [geom.coordinates]
          : geom.type === "MultiPolygon"
          ? geom.coordinates
          : [];
      for (const poly of ringSets) {
        for (const ring of poly) {
          const pts: [number, number, number][] = [];
          for (const [lon, lat] of ring) {
            const v = latLonToVec3(lat, lon, RADIUS * 1.005);
            pts.push([v.x, v.y, v.z]);
          }
          if (pts.length > 1) allLines.push(pts);
        }
      }
    }
    return allLines;
  }, [topology]);

  if (!lines.length) return null;
  return (
    <group>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={PALETTE.orange} transparent opacity={0.55} lineWidth={1.1} />
      ))}
    </group>
  );
}

function RotatingEarth({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.045; });
  return <group ref={ref}>{children}</group>;
}

function Arcs() {
  const curves = useMemo(
    () =>
      ARCS.map((a) => {
        const start = latLonToVec3(a.from[0], a.from[1], RADIUS * 1.005);
        const end = latLonToVec3(a.to[0], a.to[1], RADIUS * 1.005);
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(RADIUS + 0.25 * a.weight);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return { points: curve.getPoints(80).map((p) => [p.x, p.y, p.z] as [number, number, number]), color: a.color };
      }),
    []
  );
  return (
    <group>
      {curves.map((c, i) => (
        <Line key={i} points={c.points} color={c.color} transparent opacity={0.7} lineWidth={1.3} />
      ))}
    </group>
  );
}

function HubMarkersAndLabels() {
  const { camera } = useThree();
  const [tick, setTick] = useState(0);
  useFrame(() => setTick((t) => (t + 1) % 600));
  return (
    <group>
      {GLOBE_LABELS.map((h) => {
        const p = latLonToVec3(h.lat, h.lon, RADIUS * 1.012);
        const facing = p.clone().normalize().dot(camera.position.clone().normalize()) > 0.05;
        return (
          <group key={h.id} position={[p.x, p.y, p.z]}>
            <mesh>
              <sphereGeometry args={[h.tier === 1 ? 0.028 : 0.02, 16, 16]} />
              <meshBasicMaterial color={PALETTE.orange} />
            </mesh>
            {/* Pulse ring */}
            <mesh>
              <sphereGeometry args={[0.04 + (tick % 60) * 0.0015, 16, 16]} />
              <meshBasicMaterial color={PALETTE.orange} transparent opacity={0.25 - (tick % 60) * 0.004} />
            </mesh>
            {facing && (
              <Html
                position={[0, 0.06, 0]}
                center
                distanceFactor={6}
                style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 10,
                    color: "#FAFAF7",
                    background: "rgba(11,18,32,0.7)",
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: "1px solid rgba(212,175,55,0.35)",
                    letterSpacing: 0.4,
                  }}
                >
                  {h.name}
                </span>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function OrbitingLogo() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const r = RADIUS * 1.55;
    ref.current.position.set(Math.cos(t * 0.35) * r, Math.sin(t * 0.5) * 0.5, Math.sin(t * 0.35) * r);
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <group ref={ref}>
      <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            background: "linear-gradient(135deg, rgba(11,18,32,0.85), rgba(15,30,61,0.85))",
            border: "1px solid rgba(212,175,55,0.5)",
            padding: "6px 14px",
            borderRadius: 999,
            boxShadow: "0 0 20px rgba(232,118,58,0.35)",
            backdropFilter: "blur(4px)",
            fontFamily: "var(--font-fraunces), serif",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 0.2,
            color: "#FAFAF7",
            whiteSpace: "nowrap",
          }}
        >
          <span>RePrime</span>
          <span style={{ color: "#E8763A" }}>Atlas</span>
        </div>
      </Html>
    </group>
  );
}

type Props = { interactive?: boolean };

export default function Globe3D({ interactive = false }: Props) {
  return (
    <Canvas camera={{ position: [0, 0.4, 6.4], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 4, 5]} intensity={1.1} color={PALETTE.paper} />
      <directionalLight position={[-5, -2, -3]} intensity={0.55} color={PALETTE.orange} />
      <Stars radius={70} depth={50} count={3500} factor={2.8} fade speed={0.3} />
      <RotatingEarth>
        <GlobeBase />
        <Countries />
        <Arcs />
        <HubMarkersAndLabels />
      </RotatingEarth>
      <OrbitingLogo />
      <OrbitControls
        enableZoom={interactive}
        enablePan={false}
        enableRotate={interactive}
        autoRotate={false}
        minDistance={4}
        maxDistance={9}
      />
    </Canvas>
  );
}
