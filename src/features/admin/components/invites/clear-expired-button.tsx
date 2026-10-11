"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { pluralize } from "@/lib/format";

import { clearExpiredInvites } from "../../actions/invites";
import { useAdminAction } from "../../hooks/use-admin-action";
import { ConfirmDialog } from "../confirm-dialog";

/**
 * Removes every expired invite at once. Nothing does that by itself, so
 * without it they would pile up in the list.
 */
export function ClearExpiredButton({ count }: { count: number }) {
  const [confirming, setConfirming] = useState(false);
  const { run, isPending } = useAdminAction(clearExpiredInvites);

  async function clear() {
    const result = await run();
    if (!result.ok) return;

    toast.success(`${pluralize(result.data.count, "expired invite")} removed.`);
    setConfirming(false);
  }

  return (
    <>
      <Button variant="ghost" onClick={() => setConfirming(true)} className="text-muted-foreground">
        Clear {count} expired
      </Button>
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={`Remove ${pluralize(count, "expired invite")}?`}
        description="Their links stopped working when they expired, so this only tidies the list. For invites that were used before they ran out, the record of who used them goes too."
        confirmLabel="Remove"
        pendingLabel="Removing…"
        destructive
        isPending={isPending}
        onConfirm={clear}
      />
    </>
  );
}
