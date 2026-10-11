import type { ComponentProps, ReactNode } from "react";

import { RevealGroup, RevealItem, STAGGER } from "@/components/motion";
import { cn } from "@/lib/utils";

/*
 * Scaffolding of a dashboard page. Its blocks arrive with the "settle" reveal
 * in a tight stagger: the same motion language as the public pages, cut down
 * to what a working screen can afford. Nothing blurs, no headline is taken
 * apart word by word, and the whole page is in place in about half a second.
 */

/** Body of a dashboard page. Its header and sections must be direct beats of it. */
export function DashboardPage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <RevealGroup stagger={STAGGER.tight} className={cn("mt-8 flex flex-col gap-6", className)}>
      {children}
    </RevealGroup>
  );
}

/** Title of a dashboard page, with an optional description and the page's main actions. */
export function DashboardPageHeader({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  /** The page's main actions, shown beside the title. */
  children?: ReactNode;
}) {
  return (
    <RevealItem
      as="header"
      variant="settle"
      className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4"
    >
      <div className="min-w-0">
        <h1 className="font-serif text-2xl text-foreground sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>}
    </RevealItem>
  );
}

/** One block of a dashboard page. */
export function DashboardSection(props: Omit<ComponentProps<typeof RevealItem>, "variant">) {
  return <RevealItem variant="settle" {...props} />;
}
