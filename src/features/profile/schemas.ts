import { z } from "zod";

import { nameSchema, newPasswordSchema } from "@/lib/auth/schemas";
import { usernameSchema } from "@/lib/auth/username";

export const profileSchema = z.object({
  username: usernameSchema,
  name: nameSchema,
});

export type ProfileValues = z.infer<typeof profileSchema>;

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password."),
  newPassword: newPasswordSchema,
  revokeOtherSessions: z.boolean(),
});

export type PasswordValues = z.infer<typeof passwordSchema>;
