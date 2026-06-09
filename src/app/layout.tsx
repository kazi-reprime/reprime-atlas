import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import NavBar from "@/components/shell/NavBar";
import TickerBar from "@/components/shell/TickerBar";
import Footer from "@/components/shell/Footer";
import PageTransition from "@/components/transitions/PageTransition";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400","500","700"] });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "RePrime Atlas — Institutional CRE Intelligence",
    template: "%s — RePrime Atlas",
  },
  description:
    "Live address fan-out across 22 government and market APIs, a 1,932-source catalog, and a data-dense visualization layer for institutional commercial real estate.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://reprime-atlas.vercel.app"),
  openGraph: {
    type: "website",
    title: "RePrime Atlas — Institutional CRE Intelligence",
    description: "One canvas for 22 live government + market feeds and 1,932 curated CRE sources.",
    siteName: "RePrime Atlas",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <TickerBar />
        <NavBar />
        <main><PageTransition>{children}</PageTransition></main>
        <Footer />
      </body>
    </html>
  );
}
