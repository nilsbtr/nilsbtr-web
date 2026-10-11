"use client";

import { cn } from "@/lib/utils";

import type { ListQuery } from "../../lib/list-query";
import { useListQuery } from "./list-query";

/**
 * Narrows the surrounding list by one field of its query, with every choice
 * visible at once. For a list's main filter with a handful of options.
 */
export function SegmentedFilter({
  name,
  label,
  options,
}: {
  /** The field of the query this filter sets. */
  name: string;
  /** Accessible name of the group: "Filter by state". */
  label: string;
  options: readonly { value: string; label: string }[];
}) {
  const { query, setQuery } = useListQuery<ListQuery>();

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-lg border border-border/60 bg-muted/40 p-0.5"
    >
      {options.map((option) => {
        const isSelected = query[name] === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setQuery({ [name]: option.value })}
            className={cn(
              "h-8 rounded-md px-3 text-sm font-medium transition-colors",
              isSelected
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
