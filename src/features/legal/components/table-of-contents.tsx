"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** A section counts as current once its top has passed this far below the header. */
const ACTIVE_OFFSET = 140;

type TocItem = { id: string; title: string };

/** The section being read: the last one whose top has scrolled past the offset. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= ACTIVE_OFFSET) current = id;
      }
      // At the very bottom the last sections may never reach the offset.
      const atEnd = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      setActive(atEnd ? (ids.at(-1) ?? null) : current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

function number(index: number) {
  return String(index + 1).padStart(2, "0");
}

/**
 * Sticky contents for long legal pages on large screens. The section in view
 * is marked, so readers always know where they are in the text.
 */
export function TableOfContents({ items, label }: { items: readonly TocItem[]; label: string }) {
  const [ids] = useState(() => items.map((item) => item.id));
  const active = useActiveSection(ids);

  return (
    <nav aria-label={label} className="sticky top-24">
      <p className="text-2xs font-medium tracking-caps text-muted-foreground uppercase">{label}</p>
      <ol className="mt-4 grid gap-0.5 border-l border-border/60">
        {items.map((item, index) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative -ml-px flex gap-2.5 rounded-r-sm border-l py-1.5 pr-2 pl-4 text-sm leading-snug transition-colors",
                  isActive
                    ? "border-brand text-foreground"
                    : "border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-2xs leading-5 tabular-nums transition-colors",
                    isActive ? "text-brand" : "text-muted-foreground/60"
                  )}
                >
                  {number(index)}
                </span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** The same contents on small screens, folded away until asked for. */
export function CompactTableOfContents({
  items,
  label,
}: {
  items: readonly TocItem[];
  label: string;
}) {
  return (
    <details className="group rounded-xl border border-border/60 bg-card/40">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
        {label}
        <span className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
          {items.length}
          <span
            aria-hidden="true"
            className="inline-block size-2 rotate-45 border-r border-b border-current transition-transform group-open:-rotate-135"
          />
        </span>
      </summary>
      <ol className="grid gap-1 border-t border-border/60 px-5 py-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex gap-2.5 rounded-sm py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-2xs leading-5 text-muted-foreground/60 tabular-nums">
                {number(index)}
              </span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
