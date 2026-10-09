"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";

const ITEM_CLASS = "relative block rounded-md px-3 py-2 text-sm font-medium";

/** Inline navigation links, shown from the `md` breakpoint up. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-1">
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
                  // The current page is marked by more than color: a short rule under the label.
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out motion-reduce:after:transition-none",
                  isCurrent
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
