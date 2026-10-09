import { DisclosureTrigger } from "@/components/shared/disclosure-trigger";
import { eyebrowVariants } from "@/components/shared/eyebrow";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import type { TechGroup } from "../types";
import { TechChip } from "./tech-chip";

/** Secondary tech of a category, tucked behind a "show more" toggle. */
export function MoreTech({
  category,
  groups,
}: {
  /** Name of the category, added to the toggle's accessible name. */
  category: string;
  groups: readonly TechGroup[];
}) {
  const count = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <Collapsible>
      <DisclosureTrigger className="text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground">
        <span className="group-data-panel-open/trigger:hidden">Show {count} more</span>
        <span className="hidden group-data-panel-open/trigger:inline">Show less</span>
        <span className="sr-only">in {category}</span>
      </DisclosureTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-5 pt-5 pb-1">
          {groups.map((group, index) => (
            <div key={group.label ?? index}>
              {group.label && (
                <p className={cn(eyebrowVariants({ size: "sm" }), "mb-3")}>{group.label}</p>
              )}
              <ul aria-label={group.label ?? `More ${category}`} className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li key={tech.id} className="flex">
                    <TechChip tech={tech} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
