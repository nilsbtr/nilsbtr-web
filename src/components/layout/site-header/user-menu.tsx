"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth/client";

import { HEADER_BUTTON_CLASS } from "./header-button";

function UserMenuSkeleton() {
  return (
    <div className="flex size-9 items-center justify-center">
      <Skeleton className="size-6 rounded-full" />
    </div>
  );
}

// Loaded on demand: most visitors are signed out and never need the menu or
// the avatar generator behind it.
const AccountMenu = dynamic(() => import("./account-menu").then((mod) => mod.AccountMenu), {
  ssr: false,
  loading: UserMenuSkeleton,
});

/**
 * Account control at the end of the header. Signed-out visitors get a direct
 * link to the login page; signed-in users get a menu with their account actions.
 */
export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <UserMenuSkeleton />;
  }

  if (session?.user) {
    return <AccountMenu user={session.user} />;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={<Link href="/login" aria-label="Sign in" className={HEADER_BUTTON_CLASS} />}
      >
        <Avatar size="sm">
          <AvatarFallback>
            <HugeiconsIcon icon={UserIcon} strokeWidth={1.5} className="size-4" />
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>Sign in</TooltipContent>
    </Tooltip>
  );
}
