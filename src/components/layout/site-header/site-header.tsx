"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { m } from "motion/react";

import { DURATION, EASE } from "@/components/motion";
import { siteConfig } from "@/config/site";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

/** Fixed top bar: brand, primary navigation, theme switch and the account control. */
export function SiteHeader() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <m.header
      data-reveal=""
      initial={isDashboard ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATION.enter, ease: EASE.out }}
      className="fixed inset-x-0 top-0 z-50 flex h-14 items-center border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6"
    >
      <div className="flex-1">
        <Link
          href="/"
          aria-label={`${siteConfig.handle}, home`}
          className="rounded-sm font-cursive text-2xl tracking-wide text-foreground outline-offset-4 transition-colors hover:text-brand"
        >
          {siteConfig.handle}
        </Link>
      </div>

      <MainNav />

      <div className="flex flex-1 items-center justify-end gap-0.5">
        <ThemeToggle />
        <MobileNav />
        <UserMenu />
      </div>
    </m.header>
  );
}
