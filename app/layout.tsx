import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
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
    <html lang="de" className={`${inter.variable}`} suppressHydrationWarning>
      {/* <body className="bg-gradient-to-t from-background to-accent backdrop-blur-lg h-screen"> */}
      <body className="bg-background h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="text-content p-3 lg:pl-36 lg:pr-36">
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
