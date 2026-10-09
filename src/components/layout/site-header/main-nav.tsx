"use client";

import { useLayoutEffect, useRef } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";

const ITEM_CLASS = "block rounded-md px-3 py-2 text-sm font-medium";

/** Horizontal padding of a nav link, in pixels. The indicator spans the label only. */
const ITEM_INSET = 12;

/** Inline navigation links, shown from the `md` breakpoint up. */
export function MainNav() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  /*
   * One rule marks the current page and slides between links on navigation.
   * It is positioned by measuring the current link, and re-measured whenever
   * the list resizes (for example once the web font has loaded).
   */
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = () => {
      const current = list.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!current) {
        indicator.style.opacity = "0";
        return;
      }
      const link = current.getBoundingClientRect();
      indicator.style.opacity = "1";
      indicator.style.width = `${link.width - ITEM_INSET * 2}px`;
      indicator.style.translate = `${link.left - list.getBoundingClientRect().left + ITEM_INSET}px`;
    };

    place();
    // Only animate after the first placement, so the rule doesn't slide in from the edge on load.
    const frame = requestAnimationFrame(() => indicator.setAttribute("data-ready", ""));
    const observer = new ResizeObserver(place);
    observer.observe(list);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul ref={listRef} className="relative flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          if (item.disabled) {
            return (
              <li key={item.label}>
                <span
                  aria-disabled="true"
                  className={cn(ITEM_CLASS, "cursor-default text-muted-foreground/60 select-none")}
                >
                  {item.label}
                  <span className="ml-1.5 align-middle text-2xs tracking-wide uppercase">Soon</span>
                </span>
              </li>
            );
          }

          const isCurrent = pathname === item.href;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  ITEM_CLASS,
                  "transition-colors",
                  isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li aria-hidden="true" role="presentation" className="contents">
          <span
            ref={indicatorRef}
            className="pointer-events-none absolute bottom-1 left-0 h-px bg-brand opacity-0 data-ready:transition-[translate,width,opacity] data-ready:duration-500 motion-reduce:transition-none"
          />
        </li>
      </ul>
    </nav>
  );
}
