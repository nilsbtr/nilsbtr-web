import type { Metadata } from "next";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { RevealItem } from "@/components/motion";
import { siteConfig } from "@/config/site";
import { FeaturedTechMarks } from "@/features/stack/components/featured-tech-marks";
import { LearningSection } from "@/features/stack/components/learning-section";
import { TechCategorySection } from "@/features/stack/components/tech-category-section";
import { TECH_STACK } from "@/features/stack/data";

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

export default function StackPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-24 pb-24 sm:pt-32">
      <PageHeader eyebrow="Stack" title="What I build with" className="mb-16">
        <PageHeaderDescription>
          I mostly work fullstack in TypeScript with a framework. I use Go for backends when
          performance matters and Python when I need its ecosystem, like AI features and small
          scripts. I learned Java in depth at school and university but don&apos;t use it day to
          day.
        </PageHeaderDescription>
        <RevealItem className="mt-10 rounded-xl border border-border/50 bg-card/30 px-6 py-5">
          <FeaturedTechMarks label="Featured tech" showTaglines className="gap-y-4" />
        </RevealItem>
      </PageHeader>

      <div className="flex flex-col gap-16">
        {TECH_STACK.map((category) => (
          <TechCategorySection key={category.id} category={category} />
        ))}
        <LearningSection />
      </div>
    </div>
  );
}
