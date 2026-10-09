"use client";

import { useRouter } from "next/navigation";

import {
  DashboardSquare01Icon,
  Login03Icon,
  Logout03Icon,
  Moon02Icon,
  Sun03Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/client";
import { ADMIN_ROLE, hasRole } from "@/lib/auth/permissions";
import { getInitials } from "@/lib/format";

/** Offers the opposite of the active theme; the inactive entry is hidden with CSS. */
function ThemeMenuItems() {
  const { setTheme } = useTheme();

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")} className="hidden dark:flex">
        <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} />
        Light Mode
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")} className="flex dark:hidden">
        <HugeiconsIcon icon={Moon02Icon} strokeWidth={2} />
        Dark Mode
      </DropdownMenuItem>
    </>
  );
}

/** Avatar menu with theme switching and the session-dependent account actions. */
export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="size-6 rounded-full" />;
  }

  const user = session?.user;

  async function signOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full">
        <Avatar size="sm">
          {user?.image && <AvatarImage src={user.image} />}
          <AvatarFallback className="text-xs">
            {user?.name ? (
              getInitials(user.name)
            ) : (
              <HugeiconsIcon icon={UserIcon} strokeWidth={1.5} className="size-4" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        {user ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <ThemeMenuItems />
              {hasRole(user.role, ADMIN_ROLE) && (
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
                  Dashboard
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <HugeiconsIcon icon={Logout03Icon} strokeWidth={2} />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ThemeMenuItems />
            <DropdownMenuItem onClick={() => router.push("/login")}>
              <HugeiconsIcon icon={Login03Icon} strokeWidth={2} />
              Login
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
