"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CurrentLinkIndicator,
  useCurrentLinkIndicator,
} from "@/components/layout/current-link-indicator";
import { cn } from "@/lib/utils";

import { DASHBOARD_ROUTES } from "../../lib/routes";

const SECTIONS = [
  { href: DASHBOARD_ROUTES.overview, label: "Overview" },
  { href: DASHBOARD_ROUTES.users, label: "Users" },
  { href: DASHBOARD_ROUTES.invites, label: "Invites" },
] as const;

/** Horizontal padding of a link, in pixels. The indicator spans the label only. */
const ITEM_INSET = 12;

/** Whether a path lies below a section, like a single user below "Users". */
function isWithin(pathname: string, href: string) {
  return href !== DASHBOARD_ROUTES.overview && pathname.startsWith(`${href}/`);
}

/** The dashboard's sections, with a rule under the one that is open. */
export function DashboardNav() {
  const pathname = usePathname();
  const { listRef, indicatorRef } = useCurrentLinkIndicator(pathname, ITEM_INSET);

  return (
    <nav aria-label="Dashboard" className="border-b border-border/60">
      {/* Pulled outward by the link padding, so the first label lines up with the page. */}
      <ul ref={listRef} className="relative -mx-3 flex">
        {SECTIONS.map((section) => {
          const isPage = pathname === section.href;
          const isCurrent = isPage || isWithin(pathname, section.href);

          return (
            <li key={section.href}>
              <Link
                href={section.href}
                aria-current={isPage ? "page" : isCurrent ? "true" : undefined}
                className={cn(
                  "block rounded-md px-3 py-3 text-sm font-medium transition-colors",
                  isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section.label}
              </Link>
            </li>
          );
        })}
        <CurrentLinkIndicator ref={indicatorRef} className="-bottom-px data-ready:duration-300" />
      </ul>
    </nav>
  );
}
