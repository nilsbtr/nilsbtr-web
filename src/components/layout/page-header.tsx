import type { ReactNode } from "react";

import { RevealGroup, RevealItem } from "@/components/motion";
import { eyebrowVariants } from "@/components/shared/eyebrow";
import { cn } from "@/lib/utils";

/**
 * Page-level heading: eyebrow, serif title, then any supporting content.
 * Children are revealed in sequence, so wrap them in RevealItem (or use
 * PageHeaderDescription) to take part in the stagger.
 */
export function PageHeader({
  eyebrow,
  title,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <RevealGroup as="header" className={className}>
      <RevealItem as="p" variant="fade" className={eyebrowVariants()}>
        {eyebrow}
      </RevealItem>
      <RevealItem
        as="h1"
        className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl"
      >
        {title}
      </RevealItem>
      {children}
    </RevealGroup>
  );
}

export function PageHeaderDescription({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <RevealItem
      as="p"
      className={cn("mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground", className)}
    >
      {children}
    </RevealItem>
  );
}
