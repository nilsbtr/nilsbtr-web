import "server-only";

import { createHash, randomBytes } from "crypto";
import { eq, sql } from "drizzle-orm";

import { invitation } from "./auth-schema";
import { db } from "./db";

export function generateInviteToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashInviteCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

export async function validateInviteCode(code: string) {
  const hash = hashInviteCode(code);

  const invite = await db
    .select()
    .from(invitation)
    .where(eq(invitation.codeHash, hash))
    .limit(1)
    .then((rows) => rows[0]);

  if (!invite) return { valid: false, error: "Invalid invite code." } as const;
  if (invite.expiresAt < new Date())
    return { valid: false, error: "This invite has expired." } as const;
  if (invite.useCount >= invite.maxUses)
    return { valid: false, error: "This invite has been fully used." } as const;

  return { valid: true, invite } as const;
}

export async function consumeInviteCode(code: string) {
  const hash = hashInviteCode(code);

  await db
    .update(invitation)
    .set({ useCount: sql`${invitation.useCount} + 1` })
    .where(eq(invitation.codeHash, hash));
}
