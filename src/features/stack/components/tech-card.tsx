import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

import type { Tech } from "../types";
import { TechLink } from "./tech-link";
import { TechMarks, TechStatusBadge } from "./tech-marks";

/** Card for core tech: mark, name and a one-line description. */
export function TechCard({ tech, className }: { tech: Tech; className?: string }) {
  return (
    <TechLink
      tech={tech}
      className={cn(
        "group/chip relative flex h-full flex-col gap-3 rounded-xl border border-border/50 bg-card/30 p-5 text-left transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-(--chip-accent) hover:bg-card hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <TechMarks tech={tech} size="md" />
        {tech.href && (
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={1.5}
            className="size-3.5 text-muted-foreground/40 transition-all duration-300 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5 group-hover/chip:text-(--chip-accent)"
          />
        )}
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
