import { ADMIN_ROLE, type Role, USER_ROLE } from "@/lib/auth/permissions";
import { formatDate, pluralize } from "@/lib/format";
import { getBaseUrl } from "@/lib/url";

import type { Ban, InviteState, InviteSummary } from "../types";

/*
 * How the dashboard words things. Kept in one place so the lists, the detail
 * pages and the dialogs say the same thing the same way.
 */

export const ROLE_LABELS: Record<Role, string> = {
  [USER_ROLE]: "User",
  [ADMIN_ROLE]: "Admin",
};

export const INVITE_STATE_LABELS: Record<InviteState, string> = {
  active: "Active",
  expired: "Expired",
  used: "Used up",
  canceled: "Revoked",
  rejected: "Declined",
};

/** How long a ban holds: "until Oct 20, 2026" or "until it is lifted". */
export function describeBanTerm(ban: Ban) {
  return ban.expiresAt ? `until ${formatDate(ban.expiresAt)}` : "until it is lifted";
}

/** How much of an invite has been used: "1 of 5" or, without a limit, "3 so far". */
export function describeInviteUses({ uses, maxUses }: Pick<InviteSummary, "uses" | "maxUses">) {
  return maxUses === null ? `${uses} so far` : `${uses} of ${maxUses}`;
}

/** How often an invite works: "once" or "5 times". */
export function describeInviteLimit(maxUses: number) {
  return maxUses === 1 ? "once" : pluralize(maxUses, "time");
}

/** The link that redeems an invite. Absolute, so it can be sent to someone. */
export function getInviteUrl(token: string) {
  return `${getBaseUrl()}/invite/${token}`;
}

/** The start of a token: enough to tell invites apart, without spelling the secret out. */
export function getTokenPreview(token: string) {
  return `${token.slice(0, 8)}…`;
}
