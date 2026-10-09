import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Heading for a section within a page: serif title with an optional caption. */
export function SectionHeader({
  title,
  description,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <h2 className="font-serif text-xl text-foreground sm:text-2xl">{title}</h2>
      {description && (
        <p className="max-w-xl text-sm text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
