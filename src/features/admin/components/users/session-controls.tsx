"use client";

import { toast } from "sonner";

import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";

import { revokeUserSession } from "../../actions/users";
import { useAdminAction } from "../../hooks/use-admin-action";
import { useSignOutEverywhere } from "../../hooks/use-user-actions";
import type { Person, UserSession } from "../../types";

/** Ends one of a user's sessions. */
export function RevokeSessionButton({
  userId,
  session,
}: {
  userId: string;
  session: Pick<UserSession, "id" | "device">;
}) {
  const { run, isPending } = useAdminAction(revokeUserSession);

  async function revoke() {
    const result = await run({ userId, sessionId: session.id });
    if (result.ok) toast.success(`Signed out of ${session.device}.`);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      aria-busy={isPending}
      aria-label={`Sign out of ${session.device}`}
      onClick={revoke}
      className="text-muted-foreground"
    >
      {isPending && <Spinner aria-hidden="true" data-icon="inline-start" />}
      Sign out
    </Button>
  );
}

/** Ends all of a user's sessions at once; on the administrator's own page, all but the one in use. */
export function SignOutEverywhereButton({
  user,
  isSelf,
  disabled,
}: {
  user: Person;
  isSelf: boolean;
  disabled?: boolean;
}) {
  const { signOutEverywhere, isPending } = useSignOutEverywhere(user, isSelf);

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || isPending}
      aria-busy={isPending}
      onClick={signOutEverywhere}
    >
      {isPending && <Spinner aria-hidden="true" data-icon="inline-start" />}
      {isSelf ? "Sign out other sessions" : "Sign out everywhere"}
    </Button>
  );
}
