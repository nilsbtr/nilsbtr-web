"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { formatCount, pluralize } from "@/lib/format";

import { PAGE_SIZE, getPageCount } from "../../lib/list-query";
import { useListQuery } from "./list-query";

/**
 * Footer of a list: which rows are on screen, and the way to the other pages
 * when there is more than one.
 */
export function ListPagination({
  total,
  noun,
}: {
  /** How many rows match the query, on all pages. */
  total: number;
  /** What a row is, in the singular: "user". */
  noun: string;
}) {
  const { query, setQuery } = useListQuery<{ page: number }>();

  const pageCount = getPageCount(total);
  const first = (query.page - 1) * PAGE_SIZE + 1;
  const last = Math.min(query.page * PAGE_SIZE, total);

  return (
    <div className="flex min-h-13 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border/60 px-5 py-2.5">
      <p className="text-sm text-muted-foreground">
        {pageCount > 1
          ? `${formatCount(first)}–${formatCount(last)} of ${pluralize(total, noun)}`
          : pluralize(total, noun)}
      </p>
      {pageCount > 1 && (
        <nav aria-label="Pagination" className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={query.page <= 1}
            onClick={() => setQuery({ page: query.page - 1 })}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} data-icon="inline-start" />
            Previous
          </Button>
          <p className="px-2 text-sm text-muted-foreground">
            <span className="sr-only">Page </span>
            {query.page} / {pageCount}
          </p>
          <Button
            variant="ghost"
            size="sm"
            disabled={query.page >= pageCount}
            onClick={() => setQuery({ page: query.page + 1 })}
          >
            Next
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
          </Button>
        </nav>
      )}
    </div>
  );
}
