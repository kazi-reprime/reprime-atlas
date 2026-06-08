import { cn } from "@/lib/utils";

export default function SampleBadge({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded border px-1 text-[10px] font-medium uppercase tracking-wider",
        dark ? "border-paper/20 bg-paper/5 text-paper/50" : "border-slate-300 bg-slate-100 text-slate-500",
        className
      )}
    >
      Sample
    </span>
  );
}
