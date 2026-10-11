"use client";

import { toast } from "sonner";

import { revokeUserSessions, unbanUser } from "../actions/users";
import type { Person } from "../types";
import { useAdminAction } from "./use-admin-action";

/*
 * The user actions that run at once, without a dialog in between. Both the
 * users list and a user's page offer them.
 */

/** Lifts a user's ban. */
export function useLiftBan(user: Person) {
  const { run, isPending } = useAdminAction(unbanUser);

  async function liftBan() {
    const result = await run({ userId: user.id });
    if (result.ok) toast.success(`${user.name} can sign in again.`);
  }

  return { liftBan, isPending };
}

/**
 * Ends all of a user's sessions. For the administrator's own account that
 * leaves the session they are using, which `isSelf` makes the confirmation say.
 */
export function useSignOutEverywhere(user: Person, isSelf = false) {
  const { run, isPending } = useAdminAction(revokeUserSessions);

  async function signOutEverywhere() {
    const result = await run({ userId: user.id });
    if (!result.ok) return;

    toast.success(
      isSelf
        ? "Your other sessions have been signed out."
        : `${user.name} has been signed out everywhere.`
    );
  }

  return { signOutEverywhere, isPending };
}
