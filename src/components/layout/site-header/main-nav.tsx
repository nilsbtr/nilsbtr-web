"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";

/** Inline navigation links, shown from the `md` breakpoint up. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map((item) => {
        if (item.disabled) {
          return (
            <span
              key={item.label}
              role="link"
              aria-disabled="true"
              title="Coming soon"
              className="cursor-not-allowed rounded-md px-3 py-2 text-sm font-medium text-muted-foreground/40 select-none"
            >
              {item.label}
            </span>
          );
        }
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
