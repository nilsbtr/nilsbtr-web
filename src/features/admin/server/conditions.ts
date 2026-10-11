import "server-only";

import { type SQL, and, eq, gt, isNull, lte, or, sql } from "drizzle-orm";

import { ADMIN_ROLE } from "@/lib/auth/permissions";
import { invite, user } from "@/server/db/schema";

/*
 * Conditions the dashboard's queries share. The ones that depend on the time
 * take it as an argument, so one request compares everything against the same
 * instant. Dates always go through a column-aware operator, which writes them
 * the way the timestamp columns store them (UTC).
 */

/** Users holding the admin role. The role column may list several roles, separated by commas. */
export const isAdminUser = sql`coalesce(${user.role}, '') ~ ${`(^|,)\\s*${ADMIN_ROLE}\\s*(,|$)`}`;

/** Users whose ban is in force. An expired ban is only cleared when they next sign in. */
export function isBannedUser(now: Date) {
  return and(eq(user.banned, true), or(isNull(user.banExpires), gt(user.banExpires, now))) as SQL;
}

/** Invites that can still be redeemed. */
export function isOpenInvite(now: Date) {
  return and(eq(invite.status, "pending"), gt(invite.expiresAt, now)) as SQL;
}

/** Invites that ran out of time before they were used up. */
export function isExpiredInvite(now: Date) {
  return and(eq(invite.status, "pending"), lte(invite.expiresAt, now)) as SQL;
}

/** Counts the rows of a query that meet a condition. */
export function countWhere(condition: SQL) {
  return sql<number>`count(*) filter (where ${condition})`.mapWith(Number);
}
