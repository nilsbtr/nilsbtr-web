"use client";

import { toast } from "sonner";

import { removeUser } from "../../actions/users";
import { useAdminAction } from "../../hooks/use-admin-action";
import type { Person } from "../../types";
import { ConfirmDialog } from "../confirm-dialog";

/** Confirms deleting a user's account for good. */
export function RemoveUserDialog({
  user,
  open,
  onOpenChange,
  onRemoved,
}: {
  user: Person;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called once the account is gone, e.g. to leave a page that no longer exists. */
  onRemoved?: () => void;
}) {
  const { run, isPending } = useAdminAction(removeUser);

  async function confirm() {
    const result = await run({ userId: user.id });
    if (!result.ok) return;

    toast.success(`${user.name}'s account has been deleted.`);
    onOpenChange(false);
    onRemoved?.();
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Delete ${user.name}'s account?`}
      description="This deletes the account and everything that belongs to it, and signs them out everywhere. It can't be undone."
      confirmLabel="Delete account"
      pendingLabel="Deleting…"
      destructive
      isPending={isPending}
      onConfirm={confirm}
    />
  );
}
