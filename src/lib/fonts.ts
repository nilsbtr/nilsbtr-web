import { Caveat, JetBrains_Mono, Merriweather, Outfit } from "next/font/google";

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

/** Class names that expose every site font as a CSS variable. */
export const fontVariables = [fontSans, fontCursive, fontSerif, fontMono]
  .map((font) => font.variable)
  .join(" ");
