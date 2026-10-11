import type { ReactNode } from "react";

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import { cn } from "@/lib/utils";

/** What a list or panel shows when it has nothing to show, and what to do about it. */
export function EmptyState({
  icon,
  title,
  description,
  className,
  children,
}: {
  icon: IconSvgElement;
  title: string;
  description: string;
  className?: string;
  /** The way out: a button or link. */
  children?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-14 text-center", className)}>
      <div
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground"
      >
        <HugeiconsIcon icon={icon} strokeWidth={1.5} className="size-5" />
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-pretty text-muted-foreground">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
