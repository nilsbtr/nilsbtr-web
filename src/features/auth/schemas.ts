import { z } from "zod";

import { nameSchema, newPasswordSchema } from "@/lib/auth/schemas";
import { usernameSchema } from "@/lib/auth/username";

export const loginSchema = z.object({
  /** An email address or a username. */
  identifier: z.string().trim().min(1, "Enter your email or username."),
  password: z.string().min(1, "Password is required."),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  username: usernameSchema,
  name: nameSchema,
  email: z.email("Please enter a valid email address."),
  password: newPasswordSchema,
});

export type SignupValues = z.infer<typeof signupSchema>;
