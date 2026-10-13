import type { ReactNode } from "react";

import Link from "next/link";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { cn } from "@/lib/utils";

import type { LegalLanguage, LegalSection } from "../types";
import { CompactTableOfContents, TableOfContents } from "./table-of-contents";

const LABELS = {
  de: { contents: "Inhalt", updated: "Stand" },
  en: { contents: "Contents", updated: "Last updated" },
} as const satisfies Record<LegalLanguage, { contents: string; updated: string }>;

/** Pages with fewer sections than this are short enough to go without contents. */
const MIN_SECTIONS_FOR_CONTENTS = 4;

/** A link to the same page in the other language. */
export type LanguageAlternate = { lang: LegalLanguage; href: string; label: string };

function LanguageSwitch({
  lang,
  alternate,
}: {
  lang: LegalLanguage;
  alternate: LanguageAlternate;
}) {
  const options = [
    { lang, href: null, label: lang.toUpperCase() },
    { lang: alternate.lang, href: alternate.href, label: alternate.lang.toUpperCase() },
  ].sort((a, b) => (a.lang === "de" ? -1 : b.lang === "de" ? 1 : 0));

  return (
    <div className="inline-flex rounded-full border border-border/60 bg-card/40 p-0.5 text-xs">
      {options.map((option) =>
        option.href ? (
          <Link
            key={option.lang}
            href={option.href}
            hrefLang={option.lang}
            lang={option.lang}
            aria-label={alternate.label}
            className="rounded-full px-3 py-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            {option.label}
          </Link>
        ) : (
          <span
            key={option.lang}
            aria-current="page"
            className="rounded-full bg-foreground px-3 py-1 font-medium text-background"
          >
            {option.label}
          </span>
        )
      )}
    </div>
  );
}

function formatDate(date: Date, lang: LegalLanguage) {
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(date);
}

/**
 * Frame of a legal text: the page header with the date of the current version,
 * then numbered sections beside a contents rail that follows the reader.
 */
export function LegalPage({
  lang,
  eyebrow,
  title,
  description,
  updated,
  alternate,
  notice,
  sections,
}: {
  lang: LegalLanguage;
  eyebrow: string;
  title: string;
  description: ReactNode;
  updated: Date;
  alternate?: LanguageAlternate;
  /** Shown above the sections, e.g. which language version is binding. */
  notice?: ReactNode;
  sections: LegalSection[];
}) {
  const labels = LABELS[lang];
  const items = sections.map(({ id, title }) => ({ id, title }));
  const hasContents = sections.length >= MIN_SECTIONS_FOR_CONTENTS;

  return (
    <PageShell lang={lang} size={hasContents ? "xl" : "lg"}>
      <RevealGroup lead className="max-w-2xl">
        <PageHeader eyebrow={eyebrow} title={title}>
          <PageHeaderDescription>{description}</PageHeaderDescription>
        </PageHeader>
        <RevealItem variant="fade" className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            <span>
              {labels.updated}:{" "}
              <time dateTime={updated.toISOString().slice(0, 10)}>{formatDate(updated, lang)}</time>
            </span>
          </span>
          {alternate && <LanguageSwitch lang={lang} alternate={alternate} />}
        </RevealItem>
      </RevealGroup>

      <div
        className={cn(
          "mt-12 sm:mt-16",
          hasContents && "lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16"
        )}
      >
        {hasContents && (
          <aside className="hidden lg:block">
            <Reveal variant="fade" delay={0.5} className="h-full">
              <TableOfContents items={items} label={labels.contents} />
            </Reveal>
          </aside>
        )}

        <div className="max-w-2xl min-w-0">
          {hasContents && (
            <Reveal variant="fade" delay={0.3} className="mb-10 lg:hidden">
              <CompactTableOfContents items={items} label={labels.contents} />
            </Reveal>
          )}
          {notice && (
            <Reveal variant="fade" delay={0.3} className="mb-10">
              {notice}
            </Reveal>
          )}

          {sections.map((section, index) => {
            const headingId = `${section.id}-heading`;
            return (
              <Reveal
                key={section.id}
                as="section"
                inView
                id={section.id}
                aria-labelledby={headingId}
                className={cn(index > 0 && "mt-12 border-t border-border/60 pt-12")}
              >
                <h2
                  id={headingId}
                  className="flex items-baseline gap-3 font-serif text-xl text-balance text-foreground sm:text-2xl"
                >
                  <span className="font-mono text-xs text-brand tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-5 grid gap-4 text-[0.9375rem] leading-7 text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
                  {section.content}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
