import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/ui/StickyCTA";
import "../globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iammattbowers.com"),
  title: {
    default: "Matt Bowers — Building, tending, and enjoying",
    template: "%s · Matt Bowers",
  },
  description:
    "Building our dream home, tending our space, and enjoying the life we're making in East Tennessee. One short letter, every Sunday.",
  openGraph: {
    type: "website",
    siteName: "Matt Bowers",
    title: "Matt Bowers — Building, tending, and enjoying",
    description:
      "Building our dream home, tending our space, and enjoying the life we're making in East Tennessee. One short letter, every Sunday.",
  },
  twitter: { card: "summary_large_image" },
};

// §5 match mobile browser chrome to the page background
export const viewport: Viewport = {
  themeColor: "#f5f1e8",
};

export default function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCTA />
        <Analytics />
      </body>
    </html>
  );
}
