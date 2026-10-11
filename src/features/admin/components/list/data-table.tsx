import type { ComponentProps } from "react";

import { Surface } from "@/components/shared/surface";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

/*
 * The dashboard's table look, on top of the plain table primitives: one
 * surface around the table and whatever belongs to it, roomier rows, quiet
 * column headings.
 */

/** The surface a table sits in, together with its footer or empty state. */
export function DataTableFrame({ className, ...props }: ComponentProps<typeof Surface>) {
  return <Surface className={cn("overflow-hidden", className)} {...props} />;
}

export function DataTable({
  label,
  ...props
}: Omit<ComponentProps<typeof Table>, "aria-label"> & {
  /** Names the table for assistive technology. */
  label: string;
}) {
  return <Table aria-label={label} {...props} />;
}

export function DataTableHeaderRow({ className, ...props }: ComponentProps<typeof TableRow>) {
  return <TableRow className={cn("border-border/60 hover:bg-transparent", className)} {...props} />;
}

export function DataTableRow({ className, ...props }: ComponentProps<typeof TableRow>) {
  return <TableRow className={cn("border-border/60 hover:bg-muted/40", className)} {...props} />;
}

export function DataTableHead({ className, ...props }: ComponentProps<typeof TableHead>) {
  return (
    <TableHead
      className={cn(
        "h-11 px-3 text-xs font-medium text-muted-foreground first:pl-5 last:pr-5",
        className
      )}
      {...props}
    />
  );
}

export function DataTableCell({ className, ...props }: ComponentProps<typeof TableCell>) {
  return <TableCell className={cn("px-3 py-3 first:pl-5 last:pr-5", className)} {...props} />;
}
