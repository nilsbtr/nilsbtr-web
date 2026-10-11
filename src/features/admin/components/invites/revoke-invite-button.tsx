"use client";

import { useState } from "react";

import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { revokeInvite } from "../../actions/invites";
import { useAdminAction } from "../../hooks/use-admin-action";
import { ConfirmDialog } from "../confirm-dialog";

/**
 * Removes an invite. Revoking one that still works asks first, since its link
 * may already be on its way to someone; clearing away a dead one does not.
 */
export function RevokeInviteButton({
  inviteId,
  isActive,
}: {
  inviteId: string;
  /** Whether the invite can still be redeemed. */
  isActive: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const { run, isPending } = useAdminAction(revokeInvite);

  const label = isActive ? "Revoke invite" : "Delete invite";

  async function revoke() {
    const result = await run({ inviteId });
    if (!result.ok) return;

    toast.success(isActive ? "Invite revoked." : "Invite deleted.");
    setConfirming(false);
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={label}
              disabled={isPending}
              onClick={isActive ? () => setConfirming(true) : revoke}
              className="text-muted-foreground hover:text-destructive"
            />
          }
        >
          {isPending && !confirming ? (
            <Spinner aria-hidden="true" />
          ) : (
            <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
          )}
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>

      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title="Revoke this invite?"
        description="Its link stops working at once. Anyone who has already signed up with it keeps their account."
        confirmLabel="Revoke invite"
        pendingLabel="Revoking…"
        destructive
        isPending={isPending}
        onConfirm={revoke}
      />
    </>
  );
}
