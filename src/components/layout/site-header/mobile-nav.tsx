"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { HEADER_BUTTON_CLASS } from "./header-button";

const ITEM_CLASS = "flex items-center rounded-sm px-2 py-2.5 text-sm";

/**
 * Navigation collapsed behind a button, shown below the `md` breakpoint. It is
 * a popover holding a regular `<nav>` of links rather than a menu, so the links
 * keep their semantics (current page, open in new tab) for assistive technology.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Open navigation menu"
        className={cn(HEADER_BUTTON_CLASS, "md:hidden")}
      >
        <HugeiconsIcon icon={Menu02Icon} strokeWidth={2} className="size-5" />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-48 gap-0 p-1">
        <PopoverTitle className="px-2 py-1.5 text-xs text-muted-foreground">
          Navigation
        </PopoverTitle>
        <div aria-hidden="true" className="-mx-1 my-1 h-px bg-border" />
        <nav aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item) => {
              if (item.disabled) {
                return (
                  <li key={item.label}>
                    <span
                      aria-disabled="true"
                      className={cn(ITEM_CLASS, "justify-between text-muted-foreground/60")}
                    >
                      {item.label}
                      <span className="text-2xs tracking-wide uppercase">Soon</span>
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
                    onClick={() => setOpen(false)}
                    className={cn(
                      ITEM_CLASS,
                      "justify-between outline-offset-0 transition-colors hover:bg-accent hover:text-accent-foreground",
                      isCurrent && "font-medium"
                    )}
                  >
                    {item.label}
                    {isCurrent && (
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
