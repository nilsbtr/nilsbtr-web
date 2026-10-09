import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { RevealGroup, RevealItem } from "@/components/motion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <PageShell size="md" align="center">
      <RevealGroup>
        <PageHeader eyebrow="404" title="This page doesn't exist">
          <PageHeaderDescription>
            The link may be broken, or the page may have moved.
          </PageHeaderDescription>
        </PageHeader>
        <RevealItem className="mt-8">
          <Button size="lg" nativeButton={false} render={<Link href="/" />}>
            Back to home
          </Button>
        </RevealItem>
      </RevealGroup>
    </PageShell>
  );
}
