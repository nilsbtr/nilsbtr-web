import { SectionHeader } from "@/components/layout/section-header";
import { RevealGroup, RevealItem } from "@/components/motion";
import { DisclosureTrigger } from "@/components/shared/disclosure-trigger";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import type { TechCategory } from "../types";
import { MoreTech } from "./more-tech";
import { TechGrid } from "./tech-grid";

/** One category of the stack: heading, core tech grid and optional extras. */
export function TechCategorySection({ category }: { category: TechCategory }) {
  const headingId = `${category.id}-heading`;

  // A collapsed category mounts its content on open, outside the scroll reveal.
  if (category.collapsed) {
    return (
      <RevealGroup as="section" inView id={category.id} aria-labelledby={headingId}>
        <Collapsible>
          <RevealItem>
            <SectionHeader
              id={headingId}
              title={
                <DisclosureTrigger
                  className="gap-2 text-left"
                  iconClassName="size-4 text-muted-foreground"
                >
                  {category.label}
                </DisclosureTrigger>
              }
              description={category.caption}
            />
          </RevealItem>
          <CollapsibleContent>
            <div className="flex flex-col gap-5 pt-6 pb-1">
              <TechGrid items={category.core} />
              {category.more && <MoreTech category={category.label} groups={category.more} />}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </RevealGroup>
    );
  }

  return (
    <RevealGroup as="section" inView id={category.id} aria-labelledby={headingId}>
      <RevealItem className="mb-6">
        <SectionHeader id={headingId} title={category.label} description={category.caption} />
      </RevealItem>
      <TechGrid items={category.core} animated />
      {category.more && (
        <RevealItem variant="fade" className="mt-5">
          <MoreTech category={category.label} groups={category.more} />
        </RevealItem>
      )}
    </RevealGroup>
  );
}
