import "server-only";

import { cache } from "react";

import { type SQL, and, asc, count, desc, eq, gt, ilike, max, not, or, sql } from "drizzle-orm";

import { ADMIN_ROLE, USER_ROLE, hasRole } from "@/lib/auth/permissions";
import { db } from "@/server/db";
import { session, user } from "@/server/db/schema";

import { formatIpAddress } from "../lib/ip-address";
import { PAGE_SIZE, type UserListQuery } from "../lib/list-query";
import { describeUserAgent } from "../lib/user-agent";
import type { UserDetail, UserSummary } from "../types";
import { isAdminUser, isBannedUser } from "./conditions";
import { requireAdmin } from "./session";

/** Per user: how many sessions are still valid, and when the latest of them was last used. */
function activeSessionStats(now: Date) {
  return db
    .select({
      userId: session.userId,
      activeSessions: count().as("active_sessions"),
      lastActiveAt: max(session.updatedAt).as("last_active_at"),
    })
    .from(session)
    .where(gt(session.expiresAt, now))
    .groupBy(session.userId)
    .as("session_stats");
}

/** Every user with their session stats; callers narrow, order and page it. */
function selectUsers(now: Date) {
  const stats = activeSessionStats(now);

  const query = db
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      banned: user.banned,
      banReason: user.banReason,
      banExpires: user.banExpires,
      createdAt: user.createdAt,
      activeSessions: stats.activeSessions,
      lastActiveAt: stats.lastActiveAt,
    })
    .from(user)
    .leftJoin(stats, eq(stats.userId, user.id))
    .$dynamic();

  return { query, stats };
}

type UserRow = Awaited<ReturnType<typeof selectUsers>["query"]>[number];

function toUserSummary(row: UserRow, now: Date): UserSummary {
  const isBanned = row.banned === true && (!row.banExpires || row.banExpires > now);

  return {
    id: row.id,
    name: row.name,
    username: row.username,
    email: row.email,
    role: hasRole(row.role, ADMIN_ROLE) ? ADMIN_ROLE : USER_ROLE,
    ban: isBanned ? { reason: row.banReason, expiresAt: row.banExpires } : null,
    createdAt: row.createdAt,
    activeSessions: row.activeSessions ?? 0,
    lastActiveAt: row.lastActiveAt,
  };
}

/** Turns what was typed into the search field into a pattern that matches it literally. */
function toContainsPattern(text: string) {
  return `%${text.replace(/[\\%_]/g, "\\$&")}%`;
}

function buildUserFilter({ q, role, status }: UserListQuery, now: Date) {
  const conditions: (SQL | undefined)[] = [];

  if (q) {
    const pattern = toContainsPattern(q);
    conditions.push(
      or(ilike(user.name, pattern), ilike(user.email, pattern), ilike(user.username, pattern))
    );
  }

  if (role === "admin") conditions.push(isAdminUser);
  if (role === "user") conditions.push(not(isAdminUser));

  if (status === "banned") conditions.push(isBannedUser(now));
  if (status === "active") conditions.push(not(isBannedUser(now)));

  return and(...conditions);
}

/** One page of users matching a list query, and how many match in total. */
export async function listUsers(
  query: UserListQuery
): Promise<{ users: UserSummary[]; total: number }> {
  await requireAdmin();

  const now = new Date();
  const filter = buildUserFilter(query, now);
  const { query: users, stats } = selectUsers(now);

  const sortColumn = {
    name: sql`lower(${user.name})`,
    email: user.email,
    joined: user.createdAt,
    lastActive: stats.lastActiveAt,
  }[query.sort];
  const sortOrder = query.dir === "asc" ? asc(sortColumn) : desc(sortColumn);

  const [rows, total] = await Promise.all([
    users
      .where(filter)
      // Users without a session have no activity to sort by; they go last either way.
      .orderBy(sql`${sortOrder} nulls last`, asc(user.id))
      .limit(PAGE_SIZE)
      .offset((query.page - 1) * PAGE_SIZE),
    db.$count(user, filter),
  ]);

  return { users: rows.map((row) => toUserSummary(row, now)), total };
}

/** The users who joined most recently. */
export async function listRecentUsers(limit: number): Promise<UserSummary[]> {
  await requireAdmin();

  const now = new Date();
  const rows = await selectUsers(now).query.orderBy(desc(user.createdAt)).limit(limit);

  return rows.map((row) => toUserSummary(row, now));
}

/**
 * One user with their valid sessions, or null if there is no such user. Read
 * once per request, since a page asks for it both for its title and its content.
 */
export const getUser = cache(async (userId: string): Promise<UserDetail | null> => {
  const admin = await requireAdmin();

  const now = new Date();
  const [[row], sessions] = await Promise.all([
    selectUsers(now).query.where(eq(user.id, userId)).limit(1),
    // The session token never leaves the server: whoever holds it is signed in as the user.
    db
      .select({
        id: session.id,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      })
      .from(session)
      .where(and(eq(session.userId, userId), gt(session.expiresAt, now)))
      .orderBy(desc(session.updatedAt)),
  ]);

  if (!row) return null;

  return {
    ...toUserSummary(row, now),
    sessions: sessions.map((entry) => {
      const device = describeUserAgent(entry.userAgent);

      return {
        id: entry.id,
        device: device.label,
        isMobile: device.isMobile,
        ipAddress: formatIpAddress(entry.ipAddress),
        createdAt: entry.createdAt,
        lastActiveAt: entry.updatedAt,
        isCurrent: entry.id === admin.session.id,
      };
    }),
  };
});
