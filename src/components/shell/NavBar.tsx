"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/",          label: "Atlas"     },
  { href: "/terminal",  label: "Terminal"  },
  { href: "/visualize", label: "Visualize" },
  { href: "/info",      label: "Info"      },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 glass-light backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-display text-xl font-bold tracking-tight text-ink">RePrime</span>
          <span className="font-display text-xl font-medium bg-gradient-to-r from-orange via-copper to-gold bg-clip-text text-transparent">Atlas</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(item => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} className={`text-sm transition ${active ? "text-ink font-medium" : "text-slate-700 hover:text-ink"}`}>{item.label}</Link>;
          })}
          <Link href="/info#contact" className="rounded-full bg-gradient-to-r from-orange to-copper px-4 py-1.5 text-xs font-medium text-paper transition hover:from-copper hover:to-orange">Request access</Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {[...NAV, { href: "/info#contact", label: "Request access" }].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-ink">{item.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
