import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { DataTableFrame } from "./list/data-table";

/*
 * Placeholders shown while a dashboard page loads its data. Each one has the
 * outline of the page it stands in for, so the content does not jump when it
 * arrives.
 */

function PageSkeleton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-label={label} className="mt-8 flex flex-col gap-6">
      {children}
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-36 sm:h-9" />
      <Skeleton className="mt-3 h-4 w-full max-w-md" />
    </div>
  );
}

function RowsSkeleton({ rows }: { rows: number }) {
  return (
    <DataTableFrame>
      <div className="divide-y divide-border/60">
        <div className="h-11" />
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center gap-3 px-5 py-3">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="mt-1.5 h-3 w-24" />
            </div>
            <Skeleton className="hidden h-4 w-20 sm:block" />
            <Skeleton className="hidden h-4 w-24 md:block" />
          </div>
        ))}
      </div>
    </DataTableFrame>
  );
}

export function OverviewSkeleton() {
  return (
    <PageSkeleton label="Loading the overview">
      <HeaderSkeleton />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-30 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    </PageSkeleton>
  );
}

/** For the pages that are a list: a header, the list's controls, and its rows. */
export function ListSkeleton({ label }: { label: string }) {
  return (
    <PageSkeleton label={label}>
      <HeaderSkeleton />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-full max-w-sm" />
        <RowsSkeleton rows={8} />
      </div>
    </PageSkeleton>
  );
}

export function UserDetailsSkeleton() {
  return (
    <PageSkeleton label="Loading the user">
      <div>
        <Skeleton className="h-5 w-20" />
        <div className="mt-5 flex items-center gap-5">
          <Skeleton className="size-16 shrink-0 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 sm:h-9" />
            <Skeleton className="mt-2.5 h-4 w-full max-w-xs" />
          </div>
        </div>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-104 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-60 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    </PageSkeleton>
  );
}
