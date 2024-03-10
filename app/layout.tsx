import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

const opsans = Open_Sans({ subsets: ["latin"], variable: "--font-opsans" });

export const metadata: Metadata = {
  title: "Nils Boettcher",
  description: "A personal space by nilsbtr.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="de"
      className={`${nunito.variable} ${opsans.variable}`}
      suppressHydrationWarning
    >
      {/* <body className="bg-gradient-to-t from-background to-accent backdrop-blur-lg h-screen"> */}
      <body className="h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="p-3 lg:pl-36 lg:pr-36">
            <Navbar />
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
