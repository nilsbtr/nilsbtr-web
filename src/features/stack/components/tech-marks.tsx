import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { Tech } from "../types";

type MarkSize = "sm" | "md";

function Monogram({ initials, size }: { initials: string; size: MarkSize }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[5px] bg-foreground/8 font-mono font-semibold tracking-wider text-foreground/70 ring-1 ring-foreground/10 ring-inset",
        size === "sm" ? "size-5 text-[0.55rem]" : "size-6 text-[0.6rem]"
      )}
    >
      {initials}
    </span>
  );
}

/** Brand marks of a tech, falling back to a monogram when it has no icon. */
export function TechMarks({ tech, size }: { tech: Tech; size: MarkSize }) {
  if (tech.marks && tech.marks.length > 0) {
    return (
      <span className="flex shrink-0 items-center gap-1.5">
        {tech.marks.map((mark) => (
          <mark.Component
            key={mark.label}
            title={mark.label}
            className={cn(
              size === "md" ? "size-[1.125rem]" : "size-4",
              "text-foreground/80 transition-colors duration-300"
            )}
          />
        ))}
      </span>
    );
  }
  if (tech.initials) {
    return <Monogram initials={tech.initials} size={size} />;
  }
  return null;
}

/** Small status label next to a tech name, e.g. "waiting for stable". */
export function TechStatusBadge({ label }: { label: string }) {
  return (
    <Badge variant="outline" className="h-4.5 px-1.5 text-[0.625rem] text-muted-foreground">
      {label}
    </Badge>
  );
}
