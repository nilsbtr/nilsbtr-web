import "server-only";

import { count, countDistinct, gt } from "drizzle-orm";

import { db } from "@/server/db";
import { invite, session, user } from "@/server/db/schema";

import type { DashboardStats } from "../types";
import { countWhere, isAdminUser, isBannedUser, isExpiredInvite, isOpenInvite } from "./conditions";
import { requireAdmin } from "./session";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/** The headline numbers of the overview. */
export async function getDashboardStats(): Promise<DashboardStats> {
  await requireAdmin();

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - THIRTY_DAYS_MS);

  const [[users], [sessions], [invites]] = await Promise.all([
    db
      .select({
        total: count(),
        recent: countWhere(gt(user.createdAt, thirtyDaysAgo)),
        admins: countWhere(isAdminUser),
        banned: countWhere(isBannedUser(now)),
      })
      .from(user),
    db
      .select({ signedIn: countDistinct(session.userId) })
      .from(session)
      .where(gt(session.expiresAt, now)),
    db
      .select({
        open: countWhere(isOpenInvite(now)),
        expired: countWhere(isExpiredInvite(now)),
      })
      .from(invite),
  ]);

  return {
    users: users.total,
    newUsers: users.recent,
    admins: users.admins,
    banned: users.banned,
    signedIn: sessions.signedIn,
    openInvites: invites.open,
    expiredInvites: invites.expired,
  };
}
