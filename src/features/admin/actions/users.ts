"use server";

import { and, eq, ne } from "drizzle-orm";

import { USERNAME_TAKEN_MESSAGE } from "@/lib/auth/username";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { session, user } from "@/server/db/schema";

import {
  type BanUserInput,
  type RevokeUserSessionInput,
  type SetUserPasswordInput,
  type SetUserRoleInput,
  type UpdateUserInput,
  type UserIdInput,
  banUserSchema,
  revokeUserSessionSchema,
  setUserPasswordSchema,
  setUserRoleSchema,
  updateUserSchema,
  userIdSchema,
} from "../schemas";
import { type ActionContext, ActionError, runAdminAction } from "../server/action";
import type { ActionResult } from "../types";

/*
 * Mutations go through the auth library's admin API, which checks the
 * permission for each of them and takes care of the consequences (a ban ends
 * the user's sessions, a removal takes their accounts along). What it leaves
 * open is handled here: it would let administrators demote themselves, and it
 * does not check that a user exists or that a new username is free.
 */

async function assertUserExists(userId: string) {
  const target = await db.query.user.findFirst({
    columns: { id: true },
    where: eq(user.id, userId),
  });

  if (!target) throw new ActionError("That user no longer exists.");
}

/** Signs a user out everywhere. For the administrator's own account, the session in use stays. */
async function endSessions(userId: string, context: ActionContext) {
  if (userId === context.session.user.id) {
    await auth.api.revokeOtherSessions({ headers: context.headers });
    return;
  }

  await auth.api.revokeUserSessions({ body: { userId }, headers: context.headers });
}

export async function setUserRole(input: SetUserRoleInput): Promise<ActionResult> {
  return runAdminAction(setUserRoleSchema, input, async ({ userId, role }, context) => {
    // Nobody can remove their own admin role, so there is always an administrator left.
    if (userId === context.session.user.id) {
      throw new ActionError("You can't change your own role.");
    }
    await assertUserExists(userId);

    await auth.api.setRole({ body: { userId, role }, headers: context.headers });
  });
}

export async function banUser(input: BanUserInput): Promise<ActionResult> {
  return runAdminAction(banUserSchema, input, async ({ userId, reason, duration }, context) => {
    await auth.api.banUser({
      body: {
        userId,
        banReason: reason || undefined,
        banExpiresIn: duration || undefined,
      },
      headers: context.headers,
    });

    // Without a reason the API stores a placeholder text; keep the column empty instead.
    if (!reason) {
      await db.update(user).set({ banReason: null }).where(eq(user.id, userId));
    }
  });
}

export async function unbanUser(input: UserIdInput): Promise<ActionResult> {
  return runAdminAction(userIdSchema, input, async ({ userId }, context) => {
    await assertUserExists(userId);

    await auth.api.unbanUser({ body: { userId }, headers: context.headers });
  });
}

export async function removeUser(input: UserIdInput): Promise<ActionResult> {
  return runAdminAction(userIdSchema, input, async ({ userId }, context) => {
    await auth.api.removeUser({ body: { userId }, headers: context.headers });
  });
}

export async function updateUser(input: UpdateUserInput): Promise<ActionResult> {
  return runAdminAction(updateUserSchema, input, async ({ userId, ...values }, context) => {
    await assertUserExists(userId);

    const email = values.email.toLowerCase();
    const [usernameOwner, emailOwner] = await Promise.all([
      db.query.user.findFirst({
        columns: { id: true },
        where: and(eq(user.username, values.username), ne(user.id, userId)),
      }),
      db.query.user.findFirst({
        columns: { id: true },
        where: and(eq(user.email, email), ne(user.id, userId)),
      }),
    ]);

    if (usernameOwner || emailOwner) {
      throw new ActionError("These details are already in use.", {
        ...(usernameOwner && { username: USERNAME_TAKEN_MESSAGE }),
        ...(emailOwner && { email: "Another account uses that email address." }),
      });
    }

    await auth.api.adminUpdateUser({
      body: { userId, data: { username: values.username, name: values.name, email } },
      headers: context.headers,
    });
  });
}

export async function setUserPassword(input: SetUserPasswordInput): Promise<ActionResult> {
  return runAdminAction(
    setUserPasswordSchema,
    input,
    async ({ userId, newPassword, revokeSessions }, context) => {
      await assertUserExists(userId);

      await auth.api.setUserPassword({ body: { userId, newPassword }, headers: context.headers });

      if (revokeSessions) await endSessions(userId, context);
    }
  );
}

export async function revokeUserSession(input: RevokeUserSessionInput): Promise<ActionResult> {
  return runAdminAction(revokeUserSessionSchema, input, async ({ userId, sessionId }, context) => {
    if (sessionId === context.session.session.id) {
      throw new ActionError("This is the session you are using. Sign out to end it.");
    }

    // The browser only knows the session by its id; the token is looked up here.
    const target = await db.query.session.findFirst({
      columns: { token: true },
      where: and(eq(session.id, sessionId), eq(session.userId, userId)),
    });
    if (!target) throw new ActionError("That session has already ended.");

    await auth.api.revokeUserSession({
      body: { sessionToken: target.token },
      headers: context.headers,
    });
  });
}

export async function revokeUserSessions(input: UserIdInput): Promise<ActionResult> {
  return runAdminAction(userIdSchema, input, async ({ userId }, context) => {
    await endSessions(userId, context);
  });
}
