import { DisclosureTrigger } from "@/components/shared/disclosure-trigger";
import { eyebrowVariants } from "@/components/shared/eyebrow";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import type { TechGroup } from "../types";
import { TechChip } from "./tech-chip";

/** Secondary tech of a category, tucked behind a "show more" toggle. */
export function MoreTech({ groups }: { groups: readonly TechGroup[] }) {
  const count = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <Collapsible>
      <DisclosureTrigger className="text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground">
        <span className="group-data-panel-open/trigger:hidden">Show {count} more</span>
        <span className="hidden group-data-panel-open/trigger:inline">Show less</span>
      </DisclosureTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-5 pt-5 pb-1">
          {groups.map((group, index) => (
            <div key={group.label ?? index}>
              {group.label && (
                <p className={cn(eyebrowVariants({ size: "sm" }), "mb-3")}>{group.label}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <TechChip key={tech.id} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
