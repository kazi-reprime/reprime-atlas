"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function TerrainMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.PlaneGeometry(20, 20, 60, 60), []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i];
      const y = arr[i + 1];
      arr[i + 2] = Math.sin(x * 0.3 + t) * Math.cos(y * 0.3 + t) * 1.5;
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.1, 0, 0]} geometry={geom}>
      <meshPhongMaterial color="#adc6ff" wireframe emissive="#adc6ff" emissiveIntensity={0.18} />
    </mesh>
  );
}

export default function RiskTerrain() {
  return (
    <Canvas camera={{ position: [0, 6, 14], fov: 42 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#FFFFFF" />
      <directionalLight position={[-5, 4, -3]} intensity={0.5} color="#4edea3" />
      <TerrainMesh />
      <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.35} minDistance={6} maxDistance={20} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}
