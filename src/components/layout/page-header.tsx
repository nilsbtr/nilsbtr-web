import type { ReactNode } from "react";

import { RevealItem } from "@/components/motion";
import { eyebrowVariants } from "@/components/shared/eyebrow";
import { cn } from "@/lib/utils";

/**
 * Page-level heading: eyebrow, serif title, then any supporting content.
 * Must be rendered inside a RevealGroup; each part joins its stagger, so the
 * page decides how the header and the content below it are sequenced.
 */
export function PageHeader({
  eyebrow,
  title,
  className,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={className}>
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
    </header>
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
