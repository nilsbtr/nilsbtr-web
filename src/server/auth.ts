import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin, username } from "better-auth/plugins";
import { invite } from "better-invite";
import { and, eq, like, lt, ne } from "drizzle-orm";

import { ADMIN_ROLE, USER_ROLE, ac, hasPermission, hasRole, roles } from "@/lib/auth/permissions";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, isValidUsername } from "@/lib/auth/username";
import { getBaseUrl } from "@/lib/url";

import { db } from "./db";
import * as schema from "./db/schema";

const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret) {
  throw new Error("Missing BETTER_AUTH_SECRET.");
}

async function hasAnyUsers() {
  return Boolean(await db.query.user.findFirst({ columns: { id: true } }));
}

async function isOnlyUser(userId: string) {
  const other = await db.query.user.findFirst({
    columns: { id: true },
    where: (table, { ne }) => ne(table.id, userId),
  });
  return !other;
}

/** Whether another account than the given one holds the admin role. */
async function hasOtherAdmin(userId: string) {
  const candidates = await db
    .select({ role: schema.user.role })
    .from(schema.user)
    .where(and(ne(schema.user.id, userId), like(schema.user.role, `%${ADMIN_ROLE}%`)));

  return candidates.some((candidate) => hasRole(candidate.role, ADMIN_ROLE));
}

function hasInviteTokenCookie(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return false;

  return cookieHeader
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .some((name) => name === "invite_token" || name.endsWith(".invite_token"));
}

export const auth = betterAuth({
  secret: authSecret,
  baseURL: getBaseUrl(),
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true },
  user: {
    // Lets people erase their own account (Art. 17 GDPR). Sessions and sign-in
    // credentials are deleted with it; invite records lose their link to it.
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        if (
          hasRole((user as { role?: string | null }).role, ADMIN_ROLE) &&
          !(await hasOtherAdmin(user.id))
        ) {
          throw new APIError("BAD_REQUEST", {
            message: "You're the only administrator. Make someone else an admin first.",
          });
        }
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (!(await isOnlyUser(user.id))) return;

          await db.update(schema.user).set({ role: ADMIN_ROLE }).where(eq(schema.user.id, user.id));
        },
      },
      update: {
        // The plugin's separate display username is not used; keep it in step with the username.
        before: async (user) => {
          if (typeof user.username !== "string") return;

          return { data: { displayUsername: user.username } };
        },
      },
    },
    session: {
      create: {
        // Sessions hold IP addresses and browser details. Once one has expired
        // it serves no purpose, so expired sessions are purged at every sign-in.
        after: async () => {
          await db.delete(schema.session).where(lt(schema.session.expiresAt, new Date()));
        },
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email" || !ctx.request) return;

      const isInvited = !(await hasAnyUsers()) || hasInviteTokenCookie(ctx.request);

      if (!isInvited) {
        throw new APIError("FORBIDDEN", {
          message: "An invitation is required to sign up.",
        });
      }

      // The plugin treats usernames as optional; here every account has one.
      if (typeof ctx.body?.username !== "string") {
        throw new APIError("BAD_REQUEST", {
          message: "A username is required.",
        });
      }
    }),
  },
  plugins: [
    admin({
      ac,
      roles,
      defaultRole: USER_ROLE,
    }),
    username({
      minUsernameLength: USERNAME_MIN_LENGTH,
      maxUsernameLength: USERNAME_MAX_LENGTH,
      usernameValidator: isValidUsername,
    }),
    invite({
      defaultMaxUses: 1,
      cleanupInvitesAfterMaxUses: true,
      cleanupInvitesOnDecision: true,
      canCreateInvite: ({ invitedUser, inviterUser }) =>
        invitedUser.role === USER_ROLE && hasPermission(inviterUser.role, { invite: ["create"] }),
    }),
  ],
});
