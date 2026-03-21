import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin } from "better-auth/plugins";
import { eq, sql } from "drizzle-orm";

import * as schema from "./auth-schema";
import { db } from "./db";
import { consumeInviteCode, validateInviteCode } from "./invite";
import { getAuthUrl } from "./site-url";

const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret) {
  throw new Error("Missing BETTER_AUTH_SECRET.");
}

export const auth = betterAuth({
  secret: authSecret,
  baseURL: getAuthUrl(),
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true },
  plugins: [admin()],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;

      const userCount = await db
        .select({ id: schema.user.id })
        .from(schema.user)
        .limit(1)
        .then((rows) => rows.length);

      if (userCount === 0) return;

      const inviteCode = ctx.headers?.get("x-invite-code");
      if (!inviteCode) {
        throw new APIError("FORBIDDEN", {
          message: "An invite code is required to sign up.",
        });
      }

      const result = await validateInviteCode(inviteCode);
      if (!result.valid) {
        throw new APIError("FORBIDDEN", { message: result.error });
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (!ctx.path.startsWith("/sign-up")) return;

      const newSession = ctx.context.newSession;
      if (!newSession) return;

      const hasAdmin = await db
        .select({ id: schema.user.id })
        .from(schema.user)
        .where(eq(schema.user.role, "admin"))
        .limit(1)
        .then((rows) => rows.length > 0);

      if (!hasAdmin) {
        await db
          .update(schema.user)
          .set({ role: "admin" })
          .where(
            sql`${schema.user.id} = ${newSession.user.id} AND NOT EXISTS (SELECT 1 FROM "user" WHERE "role" = 'admin')`,
          );
        return;
      }

      const inviteCode = ctx.headers?.get("x-invite-code");
      if (inviteCode) {
        await consumeInviteCode(inviteCode);
      }
    }),
  },
});
