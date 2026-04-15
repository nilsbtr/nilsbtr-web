import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin } from "better-auth/plugins";
import { invite } from "better-invite";
import { eq } from "drizzle-orm";

import * as schema from "./auth-schema";
import { db } from "./db";
import { ADMIN_ROLE, USER_ROLE, ac, hasPermission, roles } from "./permissions";
import { getBaseUrl } from "./utils";

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
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (!(await isOnlyUser(user.id))) return;

          await db.update(schema.user).set({ role: ADMIN_ROLE }).where(eq(schema.user.id, user.id));
        },
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email" || !ctx.request) return;

      if (!(await hasAnyUsers())) return;

      if (hasInviteTokenCookie(ctx.request)) return;

      throw new APIError("FORBIDDEN", {
        message: "An invitation is required to sign up.",
      });
    }),
  },
  plugins: [
    admin({
      ac,
      roles,
      defaultRole: USER_ROLE,
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
