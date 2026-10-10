"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { DashboardSquare01Icon, Logout03Icon, UserCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { UserAvatar } from "@/components/shared/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type SessionUser, authClient } from "@/lib/auth/client";
import { ADMIN_ROLE, hasRole } from "@/lib/auth/permissions";
import { getAvatarSeed } from "@/lib/avatar";
import { cn } from "@/lib/utils";

import { HEADER_BUTTON_CLASS } from "./header-button";

/** The signed-in user's avatar, opening a menu with their account actions. */
export function AccountMenu({ user }: { user: SessionUser }) {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className={cn(HEADER_BUTTON_CLASS, "rounded-full")}
      >
        <UserAvatar size="sm" seed={getAvatarSeed(user)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.username ? `@${user.username}` : user.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLinkItem render={<Link href="/profile" />}>
            <HugeiconsIcon icon={UserCircleIcon} strokeWidth={2} />
            Profile
          </DropdownMenuLinkItem>
          {hasRole(user.role, ADMIN_ROLE) && (
            <DropdownMenuLinkItem render={<Link href="/dashboard" />}>
              <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
              Dashboard
            </DropdownMenuLinkItem>
          )}
          <DropdownMenuItem onClick={signOut}>
            <HugeiconsIcon icon={Logout03Icon} strokeWidth={2} />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
