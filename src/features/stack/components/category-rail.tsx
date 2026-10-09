"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { CategoryNavItem } from "./category-nav";

/** Height of the fixed site header, which covers the top of the viewport. */
const HEADER_OFFSET = 56;

/** Tracks which of the given sections currently intersect the visible part of the viewport. */
function useVisibleSections(ids: readonly string[]) {
  const [visible, setVisible] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((current) => {
          const next = new Set(current);
          for (const entry of entries) {
            if (entry.isIntersecting) next.add(entry.target.id);
            else next.delete(entry.target.id);
          }
          return next;
        });
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px` }
    );

    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [ids]);

  return visible;
}

/**
 * Side rail for the stack page on large screens: one tick per category, with
 * the ticks of the sections currently on screen highlighted. Hovering or
 * focusing a tick reveals its name; activating it jumps to the section.
 */
export function CategoryRail({ items }: { items: readonly CategoryNavItem[] }) {
  const [ids] = useState(() => items.map((item) => item.id));
  const visible = useVisibleSections(ids);

  return (
    <nav
      aria-label="Stack categories"
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul>
        {items.map((item) => {
          const isVisible = visible.has(item.id);
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isVisible ? "location" : undefined}
                className="group/tick relative flex h-6 w-10 items-center rounded-sm"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 rounded-full transition-all duration-300 ease-out group-hover/tick:w-6 group-hover/tick:bg-brand group-focus-visible/tick:w-6 group-focus-visible/tick:bg-brand motion-reduce:transition-none",
                    isVisible ? "w-5 bg-foreground" : "w-3 bg-muted-foreground/40"
                  )}
                />
                <span className="pointer-events-none absolute left-full ml-2 -translate-x-1 rounded-lg bg-popover px-3 py-1.5 text-sm font-medium whitespace-nowrap text-popover-foreground opacity-0 shadow-md ring-1 ring-foreground/10 transition-all duration-200 ease-out group-hover/tick:translate-x-0 group-hover/tick:opacity-100 group-focus-visible/tick:translate-x-0 group-focus-visible/tick:opacity-100 motion-reduce:transition-none">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
