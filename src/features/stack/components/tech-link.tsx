import type { CSSProperties, ReactNode } from "react";

import { ExternalLink } from "@/components/shared/external-link";

import type { Tech } from "../types";

/**
 * Wrapper shared by the tech chip and card: links to the tech's homepage when
 * it has one, and exposes its brand color as `--chip-accent` for hover styles.
 */
export function TechLink({
  tech,
  as: Tag = "div",
  className,
  children,
}: {
  tech: Tech;
  /** Element used when the tech has no homepage. */
  as?: "div" | "span";
  className?: string;
  children: ReactNode;
}) {
  const style = {
    "--chip-accent": tech.marks?.[0]?.brand ?? "var(--primary)",
  } as CSSProperties;

  if (tech.href) {
    return (
      <ExternalLink href={tech.href} style={style} className={className}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <Tag style={style} className={className}>
      {children}
    </Tag>
  );
}
