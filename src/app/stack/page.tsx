import type { Metadata } from "next";

import { RevealGroup, RevealItem } from "@/components/motion";
import { TechChip } from "@/components/tech-chip";
import { TECH_STACK } from "@/config/tech-stack";
import { STAGGER } from "@/lib/motion";

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
      <RevealGroup as="header" className="mb-16 max-w-2xl">
        <RevealItem
          as="p"
          variant="fade"
          className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
        >
          Stack
        </RevealItem>
        <RevealItem
          as="h1"
          className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl"
        >
          What I build with
        </RevealItem>
        <RevealItem as="p" className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Organized by how deep I go with each. Core is what I&apos;m fluent in and build with
          daily; my toolkit is what I know well and reach for when needed; and the last section is
          where I&apos;m actively learning.
        </RevealItem>
      </RevealGroup>

      <div className="flex flex-col gap-16">
        {TECH_STACK.map((category) => (
          <RevealGroup key={category.id} as="section" inView>
            <RevealItem className="mb-6 flex flex-col gap-1.5">
              <h2 className="font-serif text-xl text-foreground sm:text-2xl">{category.label}</h2>
              <p className="max-w-xl text-sm text-pretty text-muted-foreground">
                {category.caption}
              </p>
            </RevealItem>
            <RevealGroup
              nested
              stagger={STAGGER.tight}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {category.items.map((tech) => (
                <RevealItem key={tech.id} variant="scale">
                  <TechChip
                    tech={tech}
                    variant="full"
                    className={
                      category.id === "exploring"
                        ? "h-full border-dashed border-muted-foreground/40"
                        : "h-full"
                    }
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </RevealGroup>
        ))}
      </div>
    </div>
  );
}
