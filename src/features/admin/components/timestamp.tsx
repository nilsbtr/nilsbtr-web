"use client";

import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDateTime } from "@/lib/format";

/**
 * A point in time, written the short way ("3 hours ago", "Oct 10, 2026"), with
 * the exact date and time on hover. The tooltip is only rendered in the
 * browser, so it is in the viewer's own time zone.
 */
export function Timestamp({
  date,
  className,
  children,
}: {
  date: Date;
  className?: string;
  /** The short form. */
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={<time dateTime={date.toISOString()} className={className} />}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{formatDateTime(date)}</TooltipContent>
    </Tooltip>
  );
}
