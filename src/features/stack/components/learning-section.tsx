import { SectionHeader } from "@/components/layout/section-header";
import { RevealGroup, RevealItem } from "@/components/motion";

import { LEARNING } from "../data";
import { TechGrid } from "./tech-grid";

/** Id of the section, for in-page links. */
export const LEARNING_SECTION_ID = "learning";

/** Closing section of the stack page: tech that is still being picked up. */
export function LearningSection() {
  const headingId = `${LEARNING_SECTION_ID}-heading`;

  return (
    <RevealGroup
      as="section"
      inView
      id={LEARNING_SECTION_ID}
      aria-labelledby={headingId}
      className="border-t border-border/60 pt-16"
    >
      <RevealItem className="mb-6">
        <SectionHeader
          id={headingId}
          title="Currently Learning"
          description="Things I'm actively picking up right now."
        />
      </RevealItem>
      <TechGrid
        items={LEARNING}
        animated
        cardClassName="border-dashed border-muted-foreground/40"
      />
    </RevealGroup>
  );
}
