"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/terminal", label: "Terminal" },
  { href: "/globe", label: "Globe" },
  { href: "/flow", label: "Flow" },
  { href: "/markets", label: "Markets" },
  { href: "/signals", label: "Signals" },
  { href: "/metros", label: "Metros" },
  { href: "/properties", label: "Properties" },
  { href: "/risk", label: "Risk" },
  { href: "/explore", label: "Explore" },
  { href: "/sources", label: "Sources" },
  { href: "/atlas", label: "Atlas" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-display text-xl font-bold tracking-tight text-ink">RePrime</span>
          <span className="font-display text-xl font-medium text-orange">Atlas</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${active ? "text-ink font-medium" : "text-slate-700 hover:text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-paper transition hover:bg-navy"
          >
            Request access
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {[...NAV, { href: "/contact", label: "Request access" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
