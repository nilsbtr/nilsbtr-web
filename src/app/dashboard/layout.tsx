import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { DashboardShell } from "@/features/admin/components/shell/dashboard-shell";
import { requireAdmin } from "@/features/admin/server/session";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s · Dashboard · ${siteConfig.name}`,
  },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Keeps everyone but administrators out before anything is rendered. A layout is not
  // re-run on every navigation below it, so each query checks the session again itself.
  await requireAdmin();

  return <DashboardShell>{children}</DashboardShell>;
}
