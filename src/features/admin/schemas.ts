import { z } from "zod";

import { ADMIN_ROLE, USER_ROLE } from "@/lib/auth/permissions";
import { nameSchema, newPasswordSchema } from "@/lib/auth/schemas";
import { usernameSchema } from "@/lib/auth/username";

/*
 * Input of the dashboard's server actions. The forms validate against the same
 * schemas, so what the browser accepts is exactly what the server accepts.
 */

const idSchema = z.string().min(1).max(64);

export const userIdSchema = z.object({ userId: idSchema });

export type UserIdInput = z.infer<typeof userIdSchema>;

export const setUserRoleSchema = z.object({
  userId: idSchema,
  role: z.enum([USER_ROLE, ADMIN_ROLE]),
});

export type SetUserRoleInput = z.infer<typeof setUserRoleSchema>;

/** How long a ban can run, in seconds. 0 keeps it in place until it is lifted by hand. */
export const BAN_DURATION_OPTIONS = [
  { value: 86_400, label: "1 day" },
  { value: 604_800, label: "7 days" },
  { value: 2_592_000, label: "30 days" },
  { value: 0, label: "Until lifted" },
] as const;

export const BAN_REASON_MAX_LENGTH = 200;

export const banUserSchema = z.object({
  userId: idSchema,
  reason: z
    .string()
    .trim()
    .max(BAN_REASON_MAX_LENGTH, `Keep the reason under ${BAN_REASON_MAX_LENGTH} characters.`),
  duration: z.literal(BAN_DURATION_OPTIONS.map((option) => option.value)),
});

export type BanUserInput = z.infer<typeof banUserSchema>;

export const updateUserSchema = z.object({
  userId: idSchema,
  username: usernameSchema,
  name: nameSchema,
  email: z.email("Please enter a valid email address."),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const setUserPasswordSchema = z.object({
  userId: idSchema,
  newPassword: newPasswordSchema,
  /** Sign the user out everywhere, so only the new password gets them back in. */
  revokeSessions: z.boolean(),
});

export type SetUserPasswordInput = z.infer<typeof setUserPasswordSchema>;

export const revokeUserSessionSchema = z.object({
  userId: idSchema,
  sessionId: idSchema,
});

export type RevokeUserSessionInput = z.infer<typeof revokeUserSessionSchema>;

/** How long an invite stays valid, in seconds. */
export const INVITE_EXPIRY_OPTIONS = [
  { value: 86_400, label: "1 day" },
  { value: 604_800, label: "7 days" },
  { value: 2_592_000, label: "30 days" },
] as const;

export const INVITE_MAX_USES_LIMIT = 100;

export const createInviteSchema = z.object({
  maxUses: z
    .number("Enter how often the invite can be used.")
    .int("Enter a whole number.")
    .min(1, "An invite has to work at least once.")
    .max(INVITE_MAX_USES_LIMIT, `An invite can be used ${INVITE_MAX_USES_LIMIT} times at most.`),
  expiresIn: z.literal(INVITE_EXPIRY_OPTIONS.map((option) => option.value)),
});

export type CreateInviteInput = z.infer<typeof createInviteSchema>;

export const inviteIdSchema = z.object({ inviteId: idSchema });

export type InviteIdInput = z.infer<typeof inviteIdSchema>;
