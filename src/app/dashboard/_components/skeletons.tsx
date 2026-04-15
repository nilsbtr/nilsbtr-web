import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows, cols }: { rows: number; cols: number }) {
  return (
    <div className="mt-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="mx-auto min-h-dvh max-w-4xl px-4 pt-20 pb-12 sm:px-6">
      <Skeleton className="mb-2 h-7 w-32" />
      <Skeleton className="mb-6 h-4 w-64" />
      <Skeleton className="h-9 w-48" />
      <TableSkeleton rows={4} cols={5} />
    </div>
  );
}
