import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";

// Account screens are not meant to be found through search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell size="sm" align="center">
      {children}
    </PageShell>
  );
}
