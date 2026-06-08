"use client";
import dynamic from "next/dynamic";
const Globe3D = dynamic(() => import("./Globe3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-navy-deep" />,
});
export default function HeroGlobe({ interactive = false }: { interactive?: boolean }) {
  return <Globe3D interactive={interactive} />;
}
