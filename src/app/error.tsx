"use client";

import { useEffect } from "react";

import Link from "next/link";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { RevealGroup, RevealItem } from "@/components/motion";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell size="md" align="center">
      <RevealGroup>
        <PageHeader eyebrow="Error" title="Something went wrong">
          <PageHeaderDescription>
            This page failed to load. Trying again usually fixes it.
          </PageHeaderDescription>
        </PageHeader>
        <RevealItem className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/" />}>
            Back to home
          </Button>
        </RevealItem>
      </RevealGroup>
    </PageShell>
  );
}
