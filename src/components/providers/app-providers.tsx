import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { MotionProvider } from "@/components/motion";
import { TooltipProvider } from "@/components/ui/tooltip";

/** Every app-wide context, in one place, so the root layout stays declarative. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
