"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function SpinningGlobe({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.4; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
}

export default function MiniGlobe({ color = "#E8763A" }: { color?: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.2], fov: 42 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={1.4} color={color} />
      <SpinningGlobe color={color} />
    </Canvas>
  );
}
