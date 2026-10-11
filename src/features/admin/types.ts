import type { Role } from "@/lib/auth/permissions";

/** What a server action answers with: its result, or why it could not be carried out. */
export type ActionResult<Data = void> =
  | { ok: true; data: Data }
  | {
      ok: false;
      message: string;
      /** Problems with single fields, keyed by field name. */
      fieldErrors?: Record<string, string>;
    };

/** The few fields it takes to show who someone is. */
export type Person = {
  id: string;
  name: string;
  username: string | null;
};

export type Ban = {
  reason: string | null;
  /** When the ban lifts by itself; null if it holds until an administrator lifts it. */
  expiresAt: Date | null;
};

export type UserSummary = Person & {
  email: string;
  role: Role;
  /** Set while a ban is in force. */
  ban: Ban | null;
  createdAt: Date;
  activeSessions: number;
  /** Latest activity of any session that is still valid. */
  lastActiveAt: Date | null;
};

export type UserSession = {
  id: string;
  /** Browser and system, as far as the user agent tells. */
  device: string;
  isMobile: boolean;
  ipAddress: string | null;
  createdAt: Date;
  lastActiveAt: Date;
  /** Whether this is the session the administrator is looking at the page with. */
  isCurrent: boolean;
};

export type UserDetail = UserSummary & {
  sessions: UserSession[];
};

/**
 * Where an invite stands. `active` and `expired` are both stored as pending;
 * which of the two it is depends on the time.
 */
export type InviteState = "active" | "expired" | "used" | "canceled" | "rejected";

export type InviteSummary = {
  id: string;
  /** The secret part of the invite link. The schema allows it to be missing; in practice it never is. */
  token: string | null;
  state: InviteState;
  /** How often it can be redeemed; null for no limit. */
  maxUses: number | null;
  uses: number;
  /** Everyone who has redeemed it so far, latest first. */
  usedBy: Person[];
  expiresAt: Date;
  createdAt: Date | null;
  /** Null once the administrator who created it is gone. */
  createdBy: Person | null;
};

export type DashboardStats = {
  users: number;
  /** Accounts created in the last 30 days. */
  newUsers: number;
  admins: number;
  banned: number;
  /** Users with at least one valid session. */
  signedIn: number;
  openInvites: number;
  expiredInvites: number;
};
