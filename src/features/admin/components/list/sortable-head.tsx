"use client";

import type { ReactNode } from "react";

import { ArrowDown01Icon, ArrowUp01Icon, ArrowUpDownIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

import { DataTableHead } from "./data-table";
import { useListQuery } from "./list-query";

type SortDirection = "asc" | "desc";

type SortQuery = { sort: string; dir: SortDirection; page: number };

/**
 * Column heading that sorts the list by its column. The first click sorts in
 * the direction that suits the data (names A to Z, dates newest first); the
 * next one reverses it.
 */
export function SortableHead({
  sortKey,
  defaultDirection = "asc",
  className,
  children,
}: {
  sortKey: string;
  defaultDirection?: SortDirection;
  className?: string;
  children: ReactNode;
}) {
  const { query, setQuery } = useListQuery<SortQuery>();

  const direction = query.sort === sortKey ? query.dir : null;
  const nextDirection = direction ? (direction === "asc" ? "desc" : "asc") : defaultDirection;
  const icon = direction
    ? direction === "asc"
      ? ArrowUp01Icon
      : ArrowDown01Icon
    : ArrowUpDownIcon;

  return (
    <DataTableHead
      aria-sort={direction ? (direction === "asc" ? "ascending" : "descending") : undefined}
      className={className}
    >
      <button
        type="button"
        onClick={() => setQuery({ sort: sortKey, dir: nextDirection })}
        className={cn(
          "-mx-2 inline-flex h-8 items-center gap-1 rounded-md px-2 transition-colors hover:text-foreground",
          direction && "text-foreground"
        )}
      >
        {children}
        <HugeiconsIcon
          icon={icon}
          strokeWidth={2}
          aria-hidden="true"
          className={cn("size-3.5", !direction && "opacity-50")}
        />
      </button>
    </DataTableHead>
  );
}
