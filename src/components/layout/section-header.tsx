import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Heading for a section within a page: serif title with an optional caption. */
export function SectionHeader({
  id,
  title,
  description,
  className,
}: {
  /** Id of the heading, so the section can be labelled by it. */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <h2 id={id} className="font-serif text-xl text-foreground sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
