"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CurrentLinkIndicator,
  useCurrentLinkIndicator,
} from "@/components/layout/current-link-indicator";
import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";

const ITEM_CLASS = "block rounded-md px-3 py-2 text-sm font-medium";

/** Horizontal padding of a nav link, in pixels. The indicator spans the label only. */
const ITEM_INSET = 12;

/** Inline navigation links, shown from the `md` breakpoint up. */
export function MainNav() {
  const pathname = usePathname();
  const { listRef, indicatorRef } = useCurrentLinkIndicator(pathname, ITEM_INSET);

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
        <CurrentLinkIndicator ref={indicatorRef} />
      </ul>
    </nav>
  );
}
