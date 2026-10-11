import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { Tech } from "../types";

/** Marks of a tech, drawn as Hugeicons or custom icons in the same style. */
export function TechMarks({ tech, size }: { tech: Tech; size: "sm" | "md" }) {
  return (
    <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
      {tech.marks.map((mark) => (
        <HugeiconsIcon
          key={mark.label}
          icon={mark.icon}
          strokeWidth={1.5}
          className={cn(
            size === "md" ? "size-[1.125rem]" : "size-4",
            "text-foreground/80 transition-colors duration-300"
          )}
        />
      ))}
    </span>
  );
}

/** Small status label next to a tech name, e.g. "waiting for stable". */
export function TechStatusBadge({ label }: { label: string }) {
  return (
    <Badge variant="outline" className="h-4.5 px-1.5 text-2xs text-muted-foreground">
      {label}
    </Badge>
  );
}
