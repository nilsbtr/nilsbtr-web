import type { Metadata } from "next";

import { TechChip } from "@/components/tech-chip";
import { TechStackReveal, TechStackSection } from "@/components/tech-stack-sections";
import { TECH_STACK } from "@/config/tech-stack";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "The tech I build with — core stack, familiar toolkit, and what I'm currently exploring.",
  openGraph: {
    title: "Stack · Nils Böttcher",
    description:
      "The tech I build with — core stack, familiar toolkit, and what I'm currently exploring.",
  },
};

export default function StackPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-24 pb-24 sm:pt-32">
      <header className="mb-16 max-w-2xl">
        <p className="animate-in text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase duration-700 fade-in-0">
          Stack
        </p>
        <h1
          className="mt-4 animate-in font-serif text-3xl leading-tight text-foreground duration-700 fade-in-0 slide-in-from-bottom-2 sm:text-4xl"
          style={{ animationDelay: "80ms", animationFillMode: "backwards" }}
        >
          What I build with
        </h1>
        <p
          className="mt-4 max-w-lg animate-in text-sm leading-relaxed text-muted-foreground duration-700 fade-in-0 slide-in-from-bottom-2"
          style={{ animationDelay: "180ms", animationFillMode: "backwards" }}
        >
          Organized by how deep I go with each. Core is what I&apos;m fluent in and build with
          daily; my toolkit is what I know well and reach for when needed; and the last section is
          where I&apos;m actively learning.
        </p>
      </header>

      <TechStackReveal>
        <div className="flex flex-col gap-16">
          {TECH_STACK.map((category, index) => (
            <TechStackSection key={category.id} delay={index * 0.06}>
              <div className="mb-6 flex flex-col gap-1.5">
                <h2 className="font-serif text-xl text-foreground sm:text-2xl">{category.label}</h2>
                <p className="max-w-xl text-sm text-pretty text-muted-foreground">
                  {category.caption}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((tech) => (
                  <TechChip
                    key={tech.id}
                    tech={tech}
                    variant="full"
                    className={
                      category.id === "exploring"
                        ? "border-dashed border-muted-foreground/40"
                        : undefined
                    }
                  />
                ))}
              </div>
            </TechStackSection>
          ))}
        </div>
      </TechStackReveal>
    </div>
  );
}
