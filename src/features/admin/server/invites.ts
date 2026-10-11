import "server-only";

import { type SQL, asc, count, desc, eq, inArray, sql } from "drizzle-orm";

import { db } from "@/server/db";
import { invite, inviteUse, user } from "@/server/db/schema";

import { type InviteListQuery, PAGE_SIZE } from "../lib/list-query";
import type { InviteState, InviteSummary, Person } from "../types";
import { isExpiredInvite, isOpenInvite } from "./conditions";
import { requireAdmin } from "./session";

/** Every invite with its creator and how often it has been redeemed; callers narrow and page it. */
function selectInvites() {
  const uses = db
    .select({ inviteId: inviteUse.inviteId, uses: count().as("uses") })
    .from(inviteUse)
    .groupBy(inviteUse.inviteId)
    .as("invite_uses");

  return db
    .select({
      id: invite.id,
      token: invite.token,
      status: invite.status,
      maxUses: invite.maxUses,
      infinityMaxUses: invite.infinityMaxUses,
      expiresAt: invite.expiresAt,
      createdAt: invite.createdAt,
      uses: uses.uses,
      createdBy: { id: user.id, name: user.name, username: user.username },
    })
    .from(invite)
    .leftJoin(uses, eq(uses.inviteId, invite.id))
    .leftJoin(user, eq(user.id, invite.createdByUserId))
    .$dynamic();
}

type InviteRow = Awaited<ReturnType<typeof selectInvites>>[number];

function getInviteState(row: InviteRow, now: Date): InviteState {
  if (row.status !== "pending") return row.status;
  return row.expiresAt > now ? "active" : "expired";
}

/** Who has redeemed each of the given invites, latest first. */
async function listRedeemers(inviteIds: string[]) {
  const redeemers = new Map<string, Person[]>();
  if (inviteIds.length === 0) return redeemers;

  const rows = await db
    .select({
      inviteId: inviteUse.inviteId,
      id: user.id,
      name: user.name,
      username: user.username,
    })
    .from(inviteUse)
    .innerJoin(user, eq(user.id, inviteUse.usedByUserId))
    .where(inArray(inviteUse.inviteId, inviteIds))
    .orderBy(desc(inviteUse.usedAt));

  for (const { inviteId, ...person } of rows) {
    redeemers.set(inviteId, [...(redeemers.get(inviteId) ?? []), person]);
  }

  return redeemers;
}

async function toInviteSummaries(rows: InviteRow[], now: Date): Promise<InviteSummary[]> {
  const redeemers = await listRedeemers(rows.map((row) => row.id));

  return rows.map((row) => ({
    id: row.id,
    token: row.token,
    state: getInviteState(row, now),
    maxUses: row.infinityMaxUses ? null : row.maxUses,
    uses: row.uses ?? 0,
    usedBy: redeemers.get(row.id) ?? [],
    expiresAt: row.expiresAt,
    createdAt: row.createdAt,
    createdBy: row.createdBy,
  }));
}

function buildInviteFilter(state: InviteListQuery["state"], now: Date): SQL | undefined {
  if (state === "active") return isOpenInvite(now);
  if (state === "expired") return isExpiredInvite(now);
  return undefined;
}

/**
 * One page of invites matching a list query, newest first, and how many match
 * in total. Unlike the invite plugin's own list, this covers the invites of
 * every administrator.
 */
export async function listInvites(
  query: InviteListQuery
): Promise<{ invites: InviteSummary[]; total: number }> {
  await requireAdmin();

  const now = new Date();
  const filter = buildInviteFilter(query.state, now);

  const [rows, total] = await Promise.all([
    selectInvites()
      .where(filter)
      .orderBy(sql`${desc(invite.createdAt)} nulls last`, asc(invite.id))
      .limit(PAGE_SIZE)
      .offset((query.page - 1) * PAGE_SIZE),
    db.$count(invite, filter),
  ]);

  return { invites: await toInviteSummaries(rows, now), total };
}

/** The open invites that run out soonest. */
export async function listOpenInvites(limit: number): Promise<InviteSummary[]> {
  await requireAdmin();

  const now = new Date();
  const rows = await selectInvites()
    .where(isOpenInvite(now))
    .orderBy(asc(invite.expiresAt))
    .limit(limit);

  return toInviteSummaries(rows, now);
}

/** How many invites ran out of time and are still lying around. */
export async function countExpiredInvites(): Promise<number> {
  await requireAdmin();

  return db.$count(invite, isExpiredInvite(new Date()));
}
