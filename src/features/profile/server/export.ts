import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { account, invite, inviteUse, session, user } from "@/server/db/schema";

/**
 * Everything stored about a user, in a structured, machine-readable form
 * (Art. 15 and 20 GDPR). Secrets are left out: session tokens and the password
 * hash would only make the file dangerous to keep. Invites list no addresses,
 * as those belong to the people invited.
 */
export async function collectAccountData(userId: string) {
  const [profile] = await db
    .select({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      role: user.role,
      banned: user.banned,
      banReason: user.banReason,
      banExpires: user.banExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .where(eq(user.id, userId));

  if (!profile) return null;

  const [sessions, signInMethods, invitesCreated, invitesUsed] = await Promise.all([
    db
      .select({
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        expiresAt: session.expiresAt,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
        impersonatedBy: session.impersonatedBy,
      })
      .from(session)
      .where(eq(session.userId, userId)),
    db
      .select({
        providerId: account.providerId,
        accountId: account.accountId,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      })
      .from(account)
      .where(eq(account.userId, userId)),
    db
      .select({
        id: invite.id,
        role: invite.role,
        status: invite.status,
        maxUses: invite.maxUses,
        createdAt: invite.createdAt,
        expiresAt: invite.expiresAt,
      })
      .from(invite)
      .where(eq(invite.createdByUserId, userId)),
    db
      .select({ inviteId: inviteUse.inviteId, usedAt: inviteUse.usedAt })
      .from(inviteUse)
      .where(eq(inviteUse.usedByUserId, userId)),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    profile,
    sessions,
    signInMethods: signInMethods.map((method) => ({
      ...method,
      // The password itself is stored only as a one-way hash and is never exported.
      note: method.providerId === "credential" ? "Password stored as a one-way hash." : undefined,
    })),
    invitesCreated,
    invitesUsed,
  };
}
