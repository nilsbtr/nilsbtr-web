import type { ComponentProps, ReactNode } from "react";

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import { ExternalLink } from "@/components/shared/external-link";
import { Surface } from "@/components/shared/surface";
import { TextLink } from "@/components/shared/text-link";
import { cn } from "@/lib/utils";

import type { LegalLanguage } from "../types";

/*
 * The vocabulary legal texts are written in: paragraphs, lists, highlighted
 * notes and small cards. Each one carries its own type styles, so the texts
 * read as plain markup.
 */

export function P({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-pretty", className)} {...props} />;
}

/** Bulleted list with small brand-colored dots. */
export function List({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("grid gap-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="relative pl-5 text-pretty">
          <span
            aria-hidden="true"
            className="absolute top-[0.7em] left-1 size-1.5 rounded-full bg-brand/70"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

const LINK_CLASS =
  "rounded-sm text-foreground underline decoration-foreground/30 decoration-1 underline-offset-4 transition-all duration-300 hover:text-brand hover:decoration-brand hover:underline-offset-[7px]";

const NEW_TAB_HINTS = { de: "(öffnet in neuem Tab)", en: "(opens in a new tab)" } as const;

/** A prose link: on-site through the router, mail and phone in place, anything else in a new tab. */
export function ProseLink({
  href,
  lang = "en",
  children,
}: {
  href: string;
  /** Language of the surrounding text, for the hint read out on off-site links. */
  lang?: LegalLanguage;
  children: ReactNode;
}) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <TextLink href={href}>{children}</TextLink>;
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={LINK_CLASS}>
        {children}
      </a>
    );
  }

  return (
    <ExternalLink href={href} newTabHint={NEW_TAB_HINTS[lang]} className={LINK_CLASS}>
      {children}
    </ExternalLink>
  );
}

/** A legal reference, set apart so it can be skimmed past or looked for. */
export function Ref({ children }: { children: ReactNode }) {
  return <span className="whitespace-nowrap text-foreground/80">{children}</span>;
}

/** Highlighted note that has to stand apart from the text around it. */
export function Callout({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: IconSvgElement;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-brand/30 bg-brand/5 p-5 sm:p-6",
        className
      )}
    >
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-brand/60" />
      <p className="flex items-center gap-2 font-medium text-foreground">
        {icon && (
          <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-4 shrink-0 text-brand" />
        )}
        {title}
      </p>
      <div className="mt-2 grid gap-3">{children}</div>
    </div>
  );
}

/** Grid of small cards, for facts that are best taken in at a glance. */
export function CardGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid gap-3 sm:grid-cols-2", className)}>{children}</div>;
}

export function InfoCard({
  icon,
  label,
  title,
  children,
}: {
  icon?: IconSvgElement;
  /** Small caption above the title, e.g. the article it rests on. */
  label?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Surface className="flex flex-col gap-2 p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-4" />
          </span>
        )}
        <div className="flex min-w-0 flex-col">
          {label && (
            <span className="font-mono text-2xs tracking-wide text-brand uppercase">{label}</span>
          )}
          <span className="font-medium text-foreground">{title}</span>
        </div>
      </div>
      <div className="text-sm leading-relaxed text-pretty text-muted-foreground">{children}</div>
    </Surface>
  );
}

export type StorageEntry = {
  name: string;
  kind: string;
  purpose: ReactNode;
  duration: ReactNode;
};

/** What the site keeps in the browser: one row per cookie or storage entry. */
export function StorageTable({
  entries,
  labels,
}: {
  entries: StorageEntry[];
  labels: { purpose: string; duration: string };
}) {
  return (
    <Surface className="divide-y divide-border/60">
      {entries.map((entry) => (
        <div key={entry.name} className="grid gap-2 p-4 sm:grid-cols-[13rem_1fr] sm:gap-6 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-start">
            <code className="font-mono text-xs break-all text-foreground">{entry.name}</code>
            <span className="rounded-full border border-border/80 px-2 py-0.5 text-2xs tracking-wide text-muted-foreground uppercase">
              {entry.kind}
            </span>
          </div>
          <dl className="grid gap-1 text-sm leading-relaxed">
            <div>
              <dt className="sr-only">{labels.purpose}</dt>
              <dd className="text-pretty">{entry.purpose}</dd>
            </div>
            <div className="flex gap-1.5 text-xs text-muted-foreground/80">
              <dt>{labels.duration}:</dt>
              <dd>{entry.duration}</dd>
            </div>
          </dl>
        </div>
      ))}
    </Surface>
  );
}

/** Stands in for a detail that hasn't been configured, so the gap can't go unnoticed. */
export function Missing({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-dashed border-destructive/60 px-1.5 py-0.5 font-mono text-xs text-destructive">
      {children}
    </span>
  );
}
