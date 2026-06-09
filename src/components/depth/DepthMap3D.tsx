"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Surface() {
  const ref = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.PlaneGeometry(14, 14, 80, 80), []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i]; const y = arr[i + 1];
      const r = Math.sqrt(x * x + y * y);
      arr[i + 2] = Math.sin(r * 0.7 - t * 1.2) * 0.6 + Math.cos((x + y) * 0.4 + t * 0.6) * 0.4;
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.05, 0, 0]} geometry={geom}>
      <meshStandardMaterial color="#E8763A" wireframe emissive="#E8763A" emissiveIntensity={0.18} />
    </mesh>
  );
}

export default function DepthMap3D() {
  return (
    <Canvas camera={{ position: [0, 6, 9], fov: 42 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={0.9} color="#FAFAF7" />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#D4AF37" />
      <Surface />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}
