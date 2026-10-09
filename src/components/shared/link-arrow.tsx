import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

/**
 * Up-right arrow that marks an outbound link. It nudges outward and takes the
 * accent color while the surrounding `group/link` element is hovered.
 */
export function LinkArrow({ className }: { className?: string }) {
  return (
    <HugeiconsIcon
      icon={ArrowUpRight01Icon}
      strokeWidth={1.5}
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 text-muted-foreground/60 transition-[translate,color] duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-(--surface-accent) motion-reduce:transition-none",
        className
      )}
    />
  );
}
