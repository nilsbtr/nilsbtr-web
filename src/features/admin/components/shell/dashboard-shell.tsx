import type { ReactNode } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/motion";
import { Eyebrow } from "@/components/shared/eyebrow";
import { TooltipProvider } from "@/components/ui/tooltip";

import { DashboardNav } from "./dashboard-nav";

/**
 * Frame around every dashboard page: the section navigation, and a page that
 * is wider and starts higher than the public ones, since it holds tables
 * rather than prose.
 */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    // Tables are full of tooltips; a short delay keeps them from flickering under a passing pointer.
    <TooltipProvider delay={300} closeDelay={100}>
      <PageShell size="xl" className="pt-20 sm:pt-24">
        <Reveal variant="fade">
          <Eyebrow>Dashboard</Eyebrow>
          <div className="mt-2">
            <DashboardNav />
          </div>
        </Reveal>
        {children}
      </PageShell>
    </TooltipProvider>
  );
}
