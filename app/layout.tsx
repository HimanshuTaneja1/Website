import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

import { buildMetadata, personSchema, serviceSchema } from "@/lib/seo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingBookCTA } from "@/components/FloatingBookCTA";
import { CommandMenu } from "@/components/CommandMenu";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#06070b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <Script
          id="ld-service"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema()) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black"
        >
          Skip to content
        </a>
        <NoiseOverlay />
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <CommandMenu />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <FloatingBookCTA />
        <Analytics />
      </body>
    </html>
  );
}
