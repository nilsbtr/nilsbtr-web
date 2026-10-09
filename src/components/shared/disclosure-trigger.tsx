import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

/** Collapsible trigger with a chevron that flips while the panel is open. */
export function DisclosureTrigger({
  className,
  iconClassName,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & { iconClassName?: string }) {
  return (
    <CollapsibleTrigger
      className={cn(
        "group/trigger inline-flex items-center gap-1.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/60",
        className
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon
        icon={ArrowDown01Icon}
        strokeWidth={1.5}
        className={cn(
          "size-3.5 transition-transform duration-300 group-data-panel-open/trigger:rotate-180 motion-reduce:transition-none",
          iconClassName
        )}
      />
    </CollapsibleTrigger>
  );
}
