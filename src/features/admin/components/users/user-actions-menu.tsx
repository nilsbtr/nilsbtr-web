"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Delete02Icon,
  Logout03Icon,
  MoreHorizontalIcon,
  ShieldUserIcon,
  UserBlock01Icon,
  UserCheck01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN_ROLE, USER_ROLE } from "@/lib/auth/permissions";

import { useLiftBan, useSignOutEverywhere } from "../../hooks/use-user-actions";
import { getUserHref } from "../../lib/routes";
import type { UserSummary } from "../../types";
import { BanUserDialog } from "./ban-user-dialog";
import { ChangeRoleDialog } from "./change-role-dialog";
import { RemoveUserDialog } from "./remove-user-dialog";

type UserDialog = "promote" | "demote" | "ban" | "remove";

/**
 * Everything that can be done to a user, from their row in the list. The
 * administrator's own row only links to the details: nobody demotes, bans or
 * deletes themselves from here.
 */
export function UserActionsMenu({ user, isSelf }: { user: UserSummary; isSelf: boolean }) {
  const [dialog, setDialog] = useState<UserDialog | null>(null);
  const { liftBan, isPending: isLiftingBan } = useLiftBan(user);
  const { signOutEverywhere, isPending: isSigningOut } = useSignOutEverywhere(user);

  const isAdmin = user.role === ADMIN_ROLE;
  const isBusy = isLiftingBan || isSigningOut;
  const closeDialog = (open: boolean) => {
    if (!open) setDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.name}`} />}
          disabled={isBusy}
        >
          {isBusy ? (
            <Spinner aria-hidden="true" />
          ) : (
            <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52">
          <DropdownMenuGroup>
            <DropdownMenuLinkItem render={<Link href={getUserHref(user.id)} />}>
              <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
              View details
            </DropdownMenuLinkItem>
          </DropdownMenuGroup>
          {!isSelf && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setDialog(isAdmin ? "demote" : "promote")}>
                  <HugeiconsIcon icon={ShieldUserIcon} strokeWidth={2} />
                  {isAdmin ? "Remove admin role…" : "Make admin…"}
                </DropdownMenuItem>
                {user.ban ? (
                  <DropdownMenuItem onClick={liftBan}>
                    <HugeiconsIcon icon={UserCheck01Icon} strokeWidth={2} />
                    Lift ban
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => setDialog("ban")}>
                    <HugeiconsIcon icon={UserBlock01Icon} strokeWidth={2} />
                    Ban…
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem disabled={user.activeSessions === 0} onClick={signOutEverywhere}>
                  <HugeiconsIcon icon={Logout03Icon} strokeWidth={2} />
                  Sign out everywhere
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={() => setDialog("remove")}>
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                  Delete account…
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {!isSelf && (
        <>
          <ChangeRoleDialog
            user={user}
            role={ADMIN_ROLE}
            open={dialog === "promote"}
            onOpenChange={closeDialog}
          />
          <ChangeRoleDialog
            user={user}
            role={USER_ROLE}
            open={dialog === "demote"}
            onOpenChange={closeDialog}
          />
          <BanUserDialog user={user} open={dialog === "ban"} onOpenChange={closeDialog} />
          <RemoveUserDialog user={user} open={dialog === "remove"} onOpenChange={closeDialog} />
        </>
      )}
    </>
  );
}
