"use client";

import { useEffect } from "react";

import { Alert02Icon } from "@hugeicons/core-free-icons";

import { Surface } from "@/components/shared/surface";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/features/admin/components/empty-state";
import { DashboardPage, DashboardSection } from "@/features/admin/components/shell/dashboard-page";

/** Keeps a failing dashboard page inside the dashboard, with its navigation still in reach. */
export default function DashboardError({
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
    <DashboardPage>
      <DashboardSection>
        <Surface>
          <EmptyState
            icon={Alert02Icon}
            title="This page failed to load"
            description="Something went wrong while loading the data. Trying again usually fixes it."
          >
            <Button onClick={reset}>Try again</Button>
          </EmptyState>
        </Surface>
      </DashboardSection>
    </DashboardPage>
  );
}
