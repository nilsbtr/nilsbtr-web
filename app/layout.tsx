import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nils Boettcher",
  description: "A personal space by nilsbtr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable}`}>
      <body className="bg-gradient-to-t from-background to-accent backdrop-blur-lg h-screen">
        <main className="text-content p-3">
          <Navbar />
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
