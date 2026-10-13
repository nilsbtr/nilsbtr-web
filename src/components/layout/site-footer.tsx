import Link from "next/link";

import { LEGAL_NAV_ITEMS } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import { PrivacySettingsButton } from "./privacy-settings-button";

const LINK_CLASS = "rounded-sm transition-colors hover:text-foreground";

/** Quiet closing line of every page, with the legal pages one click away. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-6 py-6 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={LINK_CLASS}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <PrivacySettingsButton className={LINK_CLASS} />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
