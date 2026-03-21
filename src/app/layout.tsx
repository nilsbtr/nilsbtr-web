import type { Metadata, Viewport } from "next";
import { Caveat, JetBrains_Mono, Merriweather, Outfit } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontCursive = Caveat({
  subsets: ["latin"],
  variable: "--font-cursive",
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1917" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nils Böttcher",
    template: "%s · Nils Böttcher",
  },
  description:
    "Personal website of Nils Böttcher — developer & creator. Find my projects, social links, and more.",
  keywords: ["Nils Böttcher", "nilsbtr", "developer", "personal website", "portfolio"],
  authors: [{ name: "Nils Böttcher", url: siteUrl }],
  creator: "Nils Böttcher",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nils Böttcher",
    title: "Nils Böttcher",
    description:
      "Personal website of Nils Böttcher — developer & creator. Find my projects, social links, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nils Böttcher",
    description:
      "Personal website of Nils Böttcher — developer & creator. Find my projects, social links, and more.",
    creator: "@digitalstave",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nils Böttcher",
              alternateName: "nilsbtr",
              url: siteUrl,
              sameAs: [
                "https://github.com/nilsbtr",
                "https://instagram.com/nilsbttr",
                "https://twitter.com/digitalstave",
                "https://bsky.app/profile/nilsbtr.bsky.social",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontCursive.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Providers>
            <TooltipProvider>
              <Navbar />
              <main>{children}</main>
            </TooltipProvider>
          </Providers>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
