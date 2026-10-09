"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { DashboardSquare01Icon, Logout03Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth/client";
import { ADMIN_ROLE, hasRole } from "@/lib/auth/permissions";
import { getInitials } from "@/lib/format";
import { cn } from "@/lib/utils";

import { HEADER_BUTTON_CLASS } from "./header-button";

/**
 * Account control at the end of the header. Signed-out visitors get a direct
 * link to the login page; signed-in users get a menu with their account actions.
 */
export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex size-9 items-center justify-center">
        <Skeleton className="size-6 rounded-full" />
      </div>
    );
  }

  const user = session?.user;

  if (!user) {
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
        <Avatar size="sm">
          {user.image && <AvatarImage src={user.image} alt="" />}
          <AvatarFallback className="text-xs">
            {user.name ? (
              getInitials(user.name)
            ) : (
              <HugeiconsIcon icon={UserIcon} strokeWidth={1.5} className="size-4" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
