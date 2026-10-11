"use server";

import { type SQL, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { USER_ROLE } from "@/lib/auth/permissions";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { invite, inviteUse } from "@/server/db/schema";

import {
  type CreateInviteInput,
  type InviteIdInput,
  createInviteSchema,
  inviteIdSchema,
} from "../schemas";
import { ActionError, runAdminAction } from "../server/action";
import { isExpiredInvite } from "../server/conditions";
import type { ActionResult } from "../types";

/**
 * Deletes the invites matching a condition and returns how many there were.
 *
 * The invite plugin can cancel an invite too, but only for whoever created it,
 * and administrators manage each other's invites here. Deleting the row is
 * what the plugin is set up to do on cancel anyway.
 */
async function deleteInvites(condition: SQL) {
  return db.transaction(async (tx) => {
    // The record of who used an invite refers to it and has to go first.
    await tx
      .delete(inviteUse)
      .where(
        inArray(inviteUse.inviteId, tx.select({ id: invite.id }).from(invite).where(condition))
      );
    const removed = await tx.delete(invite).where(condition).returning({ id: invite.id });

    return removed.length;
  });
}

/** Creates an invite and returns its token, which the invite link is built from. */
export async function createInvite(
  input: CreateInviteInput
): Promise<ActionResult<{ token: string }>> {
  return runAdminAction(createInviteSchema, input, async ({ maxUses, expiresIn }, context) => {
    // An invite always grants the plain user role. Administrators are appointed from the users list.
    const { message: token } = await auth.api.createInvite({
      body: { role: USER_ROLE, maxUses, expiresIn, senderResponse: "token" },
      headers: context.headers,
    });

    return { token };
  });
}

export async function revokeInvite(input: InviteIdInput): Promise<ActionResult> {
  return runAdminAction(inviteIdSchema, input, async ({ inviteId }) => {
    const removed = await deleteInvites(eq(invite.id, inviteId));

    if (removed === 0) throw new ActionError("That invite no longer exists.");
  });
}

/** Removes every invite that ran out of time, and returns how many that were. */
export async function clearExpiredInvites(): Promise<ActionResult<{ count: number }>> {
  return runAdminAction(z.void(), undefined, async () => {
    const count = await deleteInvites(isExpiredInvite(new Date()));

    return { count };
  });
}
