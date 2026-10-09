import { cn } from "@/lib/utils";

import type { Tech } from "../types";
import { TechLink } from "./tech-link";
import { TechMarks, TechStatusBadge } from "./tech-marks";

/** Compact pill for secondary tech: mark and name only. */
export function TechChip({ tech, className }: { tech: Tech; className?: string }) {
  return (
    <TechLink
      tech={tech}
      shape="pill"
      as="span"
      className={cn(
        "inline-flex h-9 items-center gap-2 px-3.5 text-sm font-medium text-foreground/85",
        className
      )}
    >
      <TechMarks tech={tech} size="sm" />
      <span className="leading-none">{tech.name}</span>
      {tech.badge && <TechStatusBadge label={tech.badge} />}
    </TechLink>
  );
}
