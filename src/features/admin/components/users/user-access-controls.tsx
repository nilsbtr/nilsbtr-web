"use client";

import { type ReactNode, useState } from "react";

import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { ADMIN_ROLE, USER_ROLE } from "@/lib/auth/permissions";

import { useLiftBan } from "../../hooks/use-user-actions";
import { describeBanTerm } from "../../lib/labels";
import type { UserSummary } from "../../types";
import { RoleBadge, UserStatusBadge } from "../status";
import { BanUserDialog } from "./ban-user-dialog";
import { ChangeRoleDialog } from "./change-role-dialog";

type AccessDialog = "promote" | "demote" | "ban";

function AccessRow({
  label,
  state,
  description,
  children,
}: {
  label: string;
  /** The current state, as a badge. */
  state: ReactNode;
  description: ReactNode;
  /** The control that changes the state. */
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4">
      <div className="min-w-0 flex-1 basis-48">
        <div className="flex items-center gap-2.5">
          <dt className="text-sm font-medium text-foreground">{label}</dt>
          {state}
        </div>
        <dd className="mt-1 text-sm text-pretty text-muted-foreground">{description}</dd>
      </div>
      {children}
    </div>
  );
}

/**
 * What a user is allowed to do: their role, and whether they can sign in at
 * all. Administrators see their own state here without the controls, since
 * nobody changes their own role or bans themselves.
 */
export function UserAccessControls({ user, isSelf }: { user: UserSummary; isSelf: boolean }) {
  const [dialog, setDialog] = useState<AccessDialog | null>(null);
  const { liftBan, isPending: isLiftingBan } = useLiftBan(user);

  const isAdmin = user.role === ADMIN_ROLE;
  const closeDialog = (open: boolean) => {
    if (!open) setDialog(null);
  };

  return (
    <>
      <dl className="divide-y divide-border/60 border-t border-border/60">
        <AccessRow
          label="Role"
          state={<RoleBadge role={user.role} />}
          description={
            isAdmin
              ? "Can open the dashboard and manage users and invites."
              : "Has a regular account, without access to the dashboard."
          }
        >
          {!isSelf && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDialog(isAdmin ? "demote" : "promote")}
            >
              {isAdmin ? "Remove admin role" : "Make admin"}
            </Button>
          )}
        </AccessRow>
        <AccessRow
          label="Sign-in"
          state={<UserStatusBadge ban={user.ban} />}
          description={
            user.ban ? (
              <>
                Banned {describeBanTerm(user.ban)}.
                {user.ban.reason && <span className="block">Reason: {user.ban.reason}</span>}
              </>
            ) : (
              "Can sign in and use the account."
            )
          }
        >
          {!isSelf &&
            (user.ban ? (
              <Button
                variant="outline"
                size="sm"
                disabled={isLiftingBan}
                aria-busy={isLiftingBan}
                onClick={liftBan}
              >
                {isLiftingBan && <Spinner aria-hidden="true" data-icon="inline-start" />}
                Lift ban
              </Button>
            ) : (
              <Button variant="destructive" size="sm" onClick={() => setDialog("ban")}>
                Ban
              </Button>
            ))}
        </AccessRow>
      </dl>

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
        </>
      )}
    </>
  );
}
