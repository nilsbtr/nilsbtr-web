import { type ReactNode, useId } from "react";

import { Surface } from "@/components/shared/surface";
import { cn } from "@/lib/utils";

/**
 * A titled surface: the dashboard's container for a short list or a group of
 * controls. The body brings its own padding, so lists can run edge to edge.
 */
export function Panel({
  title,
  description,
  action,
  className,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  /** A control that belongs to the whole panel, shown beside the title. */
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const headingId = useId();

  return (
    <Surface
      role="region"
      aria-labelledby={headingId}
      className={cn("flex flex-col overflow-hidden", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 px-5 pt-5 pb-4 last:pb-5">
        <div className="min-w-0">
          <h2 id={headingId} className="font-medium text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-pretty text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </Surface>
  );
}

/** Padded body of a panel, for content that is not a list. */
export function PanelBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}
