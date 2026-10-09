"use client";

import { usePathname, useRouter } from "next/navigation";

import { Menu02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";

/** Navigation collapsed into a menu, shown below the `md` breakpoint. */
export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground md:hidden">
        <HugeiconsIcon icon={Menu02Icon} strokeWidth={2} className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {NAV_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.label}
              disabled={item.disabled}
              onClick={item.disabled ? undefined : () => router.push(item.href)}
              className={cn(pathname === item.href && "text-foreground")}
            >
              {item.label}
              {item.disabled && (
                <span className="ml-auto text-2xs tracking-wide text-muted-foreground uppercase">
                  Soon
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
