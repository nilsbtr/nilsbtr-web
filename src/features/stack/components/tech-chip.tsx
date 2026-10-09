import { cn } from "@/lib/utils";

import type { Tech } from "../types";
import { TechLink } from "./tech-link";
import { TechMarks, TechStatusBadge } from "./tech-marks";

/** Compact pill for secondary tech: mark and name only. */
export function TechChip({ tech, className }: { tech: Tech; className?: string }) {
  return (
    <TechLink
      tech={tech}
      as="span"
      className={cn(
        "group/chip inline-flex h-9 items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 text-sm font-medium text-foreground/85 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-(--chip-accent) hover:bg-card hover:text-foreground hover:shadow-sm",
        className
      )}
    >
      <TechMarks tech={tech} size="sm" />
      <span className="leading-none">{tech.name}</span>
      {tech.badge && <TechStatusBadge label={tech.badge} />}
    </TechLink>
  );
}
