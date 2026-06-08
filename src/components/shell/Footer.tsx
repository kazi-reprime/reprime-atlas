import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold">RePrime</span>
              <span className="font-display text-lg font-medium text-orange">Atlas</span>
            </div>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500">
              Institutional commercial real estate intelligence. 22 live sources, 1,932-source
              catalog, one canvas.
            </p>
            <p className="mt-3 text-[11px] text-slate-500">
              Reads from the{" "}
              <a
                href="https://github.com/kazi-reprime/reprime-data-platform"
                className="underline decoration-slate-300 underline-offset-2 hover:text-orange"
              >
                RePrime Data Platform
              </a>
              .
            </p>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Surfaces</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link href="/globe" className="hover:text-orange">Capital-flow globe</Link></li>
              <li><Link href="/markets" className="hover:text-orange">Markets heatmap</Link></li>
              <li><Link href="/signals" className="hover:text-orange">Source signals</Link></li>
              <li><Link href="/metros" className="hover:text-orange">Metro skyline</Link></li>
              <li><Link href="/properties" className="hover:text-orange">Properties</Link></li>
              <li><Link href="/risk" className="hover:text-orange">Risk surfaces</Link></li>
              <li><Link href="/terminal" className="hover:text-orange">Terminal</Link></li>
              <li><Link href="/dashboard" className="hover:text-orange">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Platform</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link href="/sources" className="hover:text-orange">Source catalog</Link></li>
              <li><Link href="/explore" className="hover:text-orange">Address explorer</Link></li>
              <li><Link href="/team" className="hover:text-orange">Team</Link></li>
              <li><Link href="/partners" className="hover:text-orange">Partners</Link></li>
              <li><Link href="/faq" className="hover:text-orange">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-orange">About</Link></li>
              <li><Link href="/contact" className="hover:text-orange">Request access</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Legal</div>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
              <li>© 2026 RePrime Group</li>
              <li>MIT licensed</li>
              <li>v1.0.0 — Atlas</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
