import { LinkArrow } from "@/components/shared/link-arrow";
import { cn } from "@/lib/utils";

import type { Tech } from "../types";
import { TechLink } from "./tech-link";
import { TechMarks, TechStatusBadge } from "./tech-marks";

/** Card for core tech: mark, name and a one-line description. */
export function TechCard({ tech, className }: { tech: Tech; className?: string }) {
  return (
    <TechLink
      tech={tech}
      shape="panel"
      className={cn("flex h-full flex-col gap-3 p-5 text-left", className)}
    >
      <div className="flex items-center justify-between">
        <TechMarks tech={tech} size="md" />
        {tech.href && <LinkArrow className="size-3.5" />}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm leading-none font-medium text-foreground">{tech.name}</h3>
          {tech.badge && <TechStatusBadge label={tech.badge} />}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{tech.description}</p>
      </div>
    </TechLink>
  );
}
