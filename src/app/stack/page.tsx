import type { Metadata } from "next";

import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { RevealGroup, RevealItem } from "@/components/motion";
import { TechChip } from "@/components/tech-chip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FEATURED, LEARNING, TECH_STACK } from "@/config/tech-stack";
import { STAGGER } from "@/lib/motion";
import type { Tech, TechCategory, TechGroup } from "@/types/tech";

const DESCRIPTION =
  "The tech I build with: fullstack TypeScript by default, Go and Python where they fit, and what I'm currently learning.";

export const metadata: Metadata = {
  title: "Stack",
  description: DESCRIPTION,
  openGraph: {
    title: "Stack · Nils Böttcher",
    description: DESCRIPTION,
  },
};

const GRID_CLASS = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";

const GROUP_LABEL_CLASS =
  "mb-3 text-[10px] font-medium tracking-[0.28em] text-muted-foreground/55 uppercase";

const FEATURED_MARK_CLASS =
  "inline-flex items-center justify-center text-muted-foreground/85 transition-all duration-300 ease-out hover:scale-110 hover:text-primary focus-visible:rounded-sm focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/60 motion-reduce:transition-none motion-reduce:hover:scale-100";

const TOGGLE_CLASS =
  "group/trigger inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/60";

const CHEVRON_CLASS =
  "transition-transform duration-300 group-data-panel-open/trigger:rotate-180 motion-reduce:transition-none";

function FeaturedBanner() {
  return (
    <TooltipProvider delay={250} closeDelay={100}>
      <RevealGroup
        nested
        as="ul"
        stagger={STAGGER.tight}
        aria-label="Featured tech"
        className="flex flex-wrap items-center gap-x-6 gap-y-4"
      >
        {FEATURED.map((tech) => {
          const mark = tech.marks?.[0];
          if (!mark) return null;
          const Mark = mark.Component;
          return (
            <RevealItem as="li" key={tech.id} variant="scale" className="flex">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tech.name}
                      className={FEATURED_MARK_CLASS}
                    >
                      <Mark aria-hidden="true" className="size-5" title={tech.name} />
                    </a>
                  }
                />
                <TooltipContent sideOffset={8} className="flex-col items-start gap-0.5">
                  <span className="font-medium">{tech.name}</span>
                  {tech.tagline && <span className="text-background/70">{tech.tagline}</span>}
                </TooltipContent>
              </Tooltip>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </TooltipProvider>
  );
}

function MoreGroups({ groups }: { groups: readonly TechGroup[] }) {
  const count = groups.reduce((total, group) => total + group.items.length, 0);
  return (
    <Collapsible>
      <CollapsibleTrigger className={TOGGLE_CLASS}>
        <span className="group-data-panel-open/trigger:hidden">Show {count} more</span>
        <span className="hidden group-data-panel-open/trigger:inline">Show less</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={1.5}
          className={`size-3.5 ${CHEVRON_CLASS}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-5 pt-5 pb-1">
          {groups.map((group, index) => (
            <div key={group.label ?? index}>
              {group.label && <p className={GROUP_LABEL_CLASS}>{group.label}</p>}
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

function CategoryHeading({ category }: { category: TechCategory }) {
  return (
    <>
      <h2 className="font-serif text-xl text-foreground sm:text-2xl">
        {category.collapsed ? (
          <CollapsibleTrigger className="group/trigger inline-flex items-center gap-2 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/60">
            {category.label}
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={1.5}
              className={`size-4 text-muted-foreground ${CHEVRON_CLASS}`}
            />
          </CollapsibleTrigger>
        ) : (
          category.label
        )}
      </h2>
      {category.caption && (
        <p className="max-w-xl text-sm text-pretty text-muted-foreground">{category.caption}</p>
      )}
    </>
  );
}

function CoreGrid({ items }: { items: readonly Tech[] }) {
  return (
    <RevealGroup nested stagger={STAGGER.tight} className={GRID_CLASS}>
      {items.map((tech) => (
        <RevealItem key={tech.id} variant="scale">
          <TechChip tech={tech} variant="full" className="h-full" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function CategorySection({ category }: { category: TechCategory }) {
  // A collapsed category mounts its content on open, outside the scroll reveal.
  if (category.collapsed) {
    return (
      <RevealGroup as="section" inView>
        <Collapsible>
          <RevealItem className="flex flex-col gap-1.5">
            <CategoryHeading category={category} />
          </RevealItem>
          <CollapsibleContent>
            <div className="flex flex-col gap-5 pt-6 pb-1">
              <div className={GRID_CLASS}>
                {category.core.map((tech) => (
                  <TechChip key={tech.id} tech={tech} variant="full" className="h-full" />
                ))}
              </div>
              {category.more && <MoreGroups groups={category.more} />}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </RevealGroup>
    );
  }

  return (
    <RevealGroup as="section" inView>
      <RevealItem className="mb-6 flex flex-col gap-1.5">
        <CategoryHeading category={category} />
      </RevealItem>
      <CoreGrid items={category.core} />
      {category.more && (
        <RevealItem variant="fade" className="mt-5">
          <MoreGroups groups={category.more} />
        </RevealItem>
      )}
    </RevealGroup>
  );
}

export default function StackPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-24 pb-24 sm:pt-32">
      <RevealGroup as="header" className="mb-16">
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
          I mostly work fullstack in TypeScript with a framework. I use Go for backends when
          performance matters and Python when I need its ecosystem, like AI features and small
          scripts. I learned Java in depth at school and university but don&apos;t use it day to
          day.
        </RevealItem>
        <RevealItem className="mt-10 rounded-xl border border-border/50 bg-card/30 px-6 py-5">
          <FeaturedBanner />
        </RevealItem>
      </RevealGroup>

      <div className="flex flex-col gap-16">
        {TECH_STACK.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}

        <RevealGroup as="section" inView className="border-t border-border/50 pt-16">
          <RevealItem className="mb-6 flex flex-col gap-1.5">
            <h2 className="font-serif text-xl text-foreground sm:text-2xl">Currently Learning</h2>
            <p className="max-w-xl text-sm text-pretty text-muted-foreground">
              Things I&apos;m actively picking up right now.
            </p>
          </RevealItem>
          <RevealGroup nested stagger={STAGGER.tight} className={GRID_CLASS}>
            {LEARNING.map((tech) => (
              <RevealItem key={tech.id} variant="scale">
                <TechChip
                  tech={tech}
                  variant="full"
                  className="h-full border-dashed border-muted-foreground/40"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </RevealGroup>
      </div>
    </div>
  );
}
