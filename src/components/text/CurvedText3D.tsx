"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { PALETTE } from "@/lib/constants";

function Spinner({ text }: { text: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    ref.current.position.y = Math.sin(t * 0.6) * 0.05;
  });
  return (
    <group ref={ref}>
      <Center>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={0.55}
          height={0.12}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.018}
          bevelSize={0.012}
          bevelSegments={4}
        >
          {text}
          <meshStandardMaterial color={PALETTE.orange} metalness={0.5} roughness={0.25} emissive={PALETTE.orange} emissiveIntensity={0.18} />
        </Text3D>
      </Center>
    </group>
  );
}

export default function CurvedText3D({ text = "RePrime Atlas" }: { text?: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 4]} intensity={1.1} color={PALETTE.paper} />
      <directionalLight position={[-3, -2, -3]} intensity={0.6} color={PALETTE.gold} />
      <Spinner text={text} />
    </Canvas>
  );
}
