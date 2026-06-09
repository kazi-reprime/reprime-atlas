import { cn } from "@/lib/utils";

type Variant = "light" | "cream" | "dark" | "gold";

export default function GlassCard({
  variant = "light",
  shimmer = false,
  noise = false,
  className,
  children,
}: {
  variant?: Variant;
  shimmer?: boolean;
  noise?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const v =
    variant === "dark" ? "glass-dark text-paper"
    : variant === "cream" ? "glass-cream text-ink"
    : variant === "gold" ? "glass-gold text-ink"
    : "glass-light text-ink";
  return (
    <div className={cn("relative rounded-2xl p-6", v, shimmer && "glass-shimmer", noise && "noise", className)}>
      {children}
    </div>
  );
}
