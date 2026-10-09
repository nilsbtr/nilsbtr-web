"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { m } from "motion/react";

import { SPRING } from "@/components/motion";
import { siteConfig } from "@/config/site";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";

/** Fixed top bar: brand, primary navigation and the account menu. */
export function SiteHeader() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <m.nav
      initial={isDashboard ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={SPRING.smooth}
      className="fixed inset-x-0 top-0 z-50 flex h-14 items-center border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6"
    >
      <div className="flex-1">
        <Link
          href="/"
          className="rounded-sm font-cursive text-2xl tracking-wide text-foreground outline-offset-4 transition-colors hover:text-primary"
        >
          {siteConfig.handle}
        </Link>
      </div>

      <MainNav />

      <div className="flex flex-1 items-center justify-end gap-1">
        <MobileNav />
        <UserMenu />
      </div>
    </m.nav>
  );
}
