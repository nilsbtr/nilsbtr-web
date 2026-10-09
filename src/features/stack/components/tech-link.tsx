import type { CSSProperties, ReactNode } from "react";

import { ExternalLink } from "@/components/shared/external-link";
import { surfaceVariants } from "@/components/shared/surface";
import { cn } from "@/lib/utils";

import type { Tech } from "../types";

/**
 * Surface shared by the tech chip and card. A tech with a homepage becomes an
 * interactive link whose hover accent is its brand color; one without stays a
 * static element, so nothing looks clickable that isn't.
 */
export function TechLink({
  tech,
  shape,
  as: Tag = "div",
  className,
  children,
}: {
  tech: Tech;
  shape: "panel" | "pill";
  /** Element used when the tech has no homepage. */
  as?: "div" | "span";
  className?: string;
  children: ReactNode;
}) {
  if (tech.href) {
    const brand = tech.marks?.[0]?.brand;
    return (
      <ExternalLink
        href={tech.href}
        style={brand ? ({ "--surface-accent": brand } as CSSProperties) : undefined}
        className={cn("group/link", surfaceVariants({ shape, interactive: true }), className)}
      >
        {children}
      </ExternalLink>
    );
  }

  return <Tag className={cn(surfaceVariants({ shape }), className)}>{children}</Tag>;
}
