"use client";

import { toast } from "sonner";

import { ADMIN_ROLE, type Role } from "@/lib/auth/permissions";

import { setUserRole } from "../../actions/users";
import { useAdminAction } from "../../hooks/use-admin-action";
import type { Person } from "../../types";
import { ConfirmDialog } from "../confirm-dialog";

/**
 * Confirms giving a user a role: making them an admin, or taking that away
 * again. The role is fixed per dialog rather than read off the user, so the
 * question does not turn into its opposite once the change has gone through.
 */
export function ChangeRoleDialog({
  user,
  role,
  open,
  onOpenChange,
}: {
  user: Person;
  /** The role to give. */
  role: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { run, isPending } = useAdminAction(setUserRole);
  const isPromotion = role === ADMIN_ROLE;

  async function confirm() {
    const result = await run({ userId: user.id, role });
    if (!result.ok) return;

    toast.success(
      isPromotion ? `${user.name} is now an admin.` : `${user.name} is no longer an admin.`
    );
    onOpenChange(false);
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={isPromotion ? `Make ${user.name} an admin?` : `Remove ${user.name}'s admin role?`}
      description={
        isPromotion
          ? "Admins can open this dashboard and manage every user and invite, other admins included."
          : "They keep their account, but can no longer open the dashboard or manage users and invites."
      }
      confirmLabel={isPromotion ? "Make admin" : "Remove admin role"}
      pendingLabel="Saving…"
      isPending={isPending}
      onConfirm={confirm}
    />
  );
}
