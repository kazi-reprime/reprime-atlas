import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold">RePrime</span>
              <span className="font-display text-lg font-medium bg-gradient-to-r from-orange via-copper to-gold bg-clip-text text-transparent">Terminal</span>
            </div>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500">Institutional CRE intelligence. 22 live sources, 1,155-source catalog, one canvas.</p>
            <p className="mt-3 text-[11px] text-slate-500">Reads from <a href="https://github.com/kazi-reprime/reprime-data-platform" className="underline decoration-slate-300 underline-offset-2 hover:text-orange">RePrime Data Platform</a>.</p>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Terminal</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link href="/terminal#t=overview"  className="hover:text-orange">Overview</Link></li>
              <li><Link href="/terminal#t=markets"   className="hover:text-orange">Markets</Link></li>
              <li><Link href="/terminal#t=liquidity" className="hover:text-orange">Liquidity</Link></li>
              <li><Link href="/terminal#t=risk"      className="hover:text-orange">Risk</Link></li>
              <li><Link href="/terminal#t=sectors"   className="hover:text-orange">Sectors</Link></li>
              <li><Link href="/terminal#t=pulse"     className="hover:text-orange">Pulse</Link></li>
              <li><Link href="/terminal#t=signals"   className="hover:text-orange">Signals</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Visualize</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link href="/visualize#globe"      className="hover:text-orange">Capital-flow globe</Link></li>
              <li><Link href="/visualize#flow"       className="hover:text-orange">Flow field</Link></li>
              <li><Link href="/visualize#metros"     className="hover:text-orange">Metro skyline</Link></li>
              <li><Link href="/visualize#properties" className="hover:text-orange">Properties</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Info</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link href="/info#about"     className="hover:text-orange">About</Link></li>
              <li><Link href="/info#team"      className="hover:text-orange">Team</Link></li>
              <li><Link href="/info#partners"  className="hover:text-orange">Partners</Link></li>
              <li><Link href="/info#sources"   className="hover:text-orange">Sources</Link></li>
              <li><Link href="/info#explorer"  className="hover:text-orange">Address explorer</Link></li>
              <li><Link href="/info#faq"       className="hover:text-orange">FAQ</Link></li>
              <li><Link href="/info#contact"   className="hover:text-orange">Request access</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-[11px] text-slate-500">© 2026 RePrime Group · v2.0.0 — Terminal Consolidated · MIT licensed</div>
      </div>
    </footer>
  );
}
