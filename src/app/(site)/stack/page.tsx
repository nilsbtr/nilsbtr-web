import type { Metadata } from "next";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { RevealGroup, RevealItem } from "@/components/motion";
import { surfaceVariants } from "@/components/shared/surface";
import { siteConfig } from "@/config/site";
import { CategoryNav } from "@/features/stack/components/category-nav";
import { CategoryRail } from "@/features/stack/components/category-rail";
import { FeaturedTechMarks } from "@/features/stack/components/featured-tech-marks";
import { LEARNING_SECTION_ID, LearningSection } from "@/features/stack/components/learning-section";
import { TechCategorySection } from "@/features/stack/components/tech-category-section";
import { TECH_STACK } from "@/features/stack/data";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "The tech I build with: fullstack TypeScript by default, Go and Python where they fit, and what I'm currently learning.";

export const metadata: Metadata = {
  title: "Stack",
  description: DESCRIPTION,
  openGraph: {
    title: `Stack · ${siteConfig.name}`,
    description: DESCRIPTION,
  },
};

const CATEGORY_NAV_ITEMS = [
  ...TECH_STACK.map(({ id, label }) => ({ id, label })),
  { id: LEARNING_SECTION_ID, label: "Learning" },
];

export default function StackPage() {
  return (
    <PageShell>
      <CategoryRail items={CATEGORY_NAV_ITEMS} />
      <RevealGroup className="mb-16">
        <PageHeader eyebrow="Stack" title="What I build with">
          <PageHeaderDescription>
            I mostly work fullstack in TypeScript with a framework. I use Go for backends when
            performance matters and Python when I need its ecosystem, like AI features and small
            scripts. I learned Java in depth at school and university but don&apos;t use it day to
            day.
          </PageHeaderDescription>
        </PageHeader>
        <RevealItem className={cn(surfaceVariants(), "mt-10 px-6 py-5")}>
          <FeaturedTechMarks label="Featured tech" showTaglines />
        </RevealItem>
        {/* Large screens use the side rail instead. */}
        <RevealItem variant="fade" className="mt-8 lg:hidden">
          <CategoryNav items={CATEGORY_NAV_ITEMS} />
        </RevealItem>
      </RevealGroup>

      <div className="flex flex-col gap-16">
        {TECH_STACK.map((category) => (
          <TechCategorySection key={category.id} category={category} />
        ))}
        <LearningSection />
      </div>
    </PageShell>
  );
}
