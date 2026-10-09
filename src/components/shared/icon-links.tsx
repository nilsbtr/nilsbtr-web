import type { ReactNode } from "react";

import { RevealGroup, RevealItem, STAGGER } from "@/components/motion";
import { ExternalLink } from "@/components/shared/external-link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/*
 * The icon is 20px, but its hit area is 36px so it is comfortable to tap. The
 * list pulls itself outward by the difference, which keeps the icons aligned
 * with the surrounding text.
 */
const ICON_LINK_CLASS =
  "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground/85 transition-all duration-300 hover:scale-110 hover:text-brand focus-visible:text-brand motion-reduce:transition-none motion-reduce:hover:scale-100";

/**
 * A row of icon-only links that reveal in a tight stagger. Must be rendered
 * inside a RevealGroup, whose trigger it inherits.
 */
export function IconLinkList({
  label,
  className,
  children,
}: {
  /** Accessible name of the list. */
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TooltipProvider delay={250} closeDelay={100}>
      <RevealGroup
        nested
        as="ul"
        stagger={STAGGER.tight}
        aria-label={label}
        className={cn("-m-2 flex flex-wrap items-center gap-x-2", className)}
      >
        {children}
      </RevealGroup>
    </TooltipProvider>
  );
}

/** An icon with a tooltip, linking out when `href` is set. */
export function IconLink({
  label,
  description,
  href,
  children,
}: {
  label: string;
  /** Optional second tooltip line. */
  description?: string;
  href?: string;
  /** The icon. */
  children: ReactNode;
}) {
  const trigger = href ? (
    <ExternalLink href={href} aria-label={label} className={ICON_LINK_CLASS}>
      {children}
    </ExternalLink>
  ) : (
    <span role="img" aria-label={label} className={ICON_LINK_CLASS}>
      {children}
    </span>
  );

  return (
    <RevealItem as="li" variant="scale" className="flex">
      <Tooltip>
        <TooltipTrigger render={trigger} />
        {description ? (
          <TooltipContent sideOffset={4} className="flex-col items-start gap-0.5">
            <span className="font-medium">{label}</span>
            <span className="text-background/70">{description}</span>
          </TooltipContent>
        ) : (
          <TooltipContent sideOffset={4}>{label}</TooltipContent>
        )}
      </Tooltip>
    </RevealItem>
  );
}
