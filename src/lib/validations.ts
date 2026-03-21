import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().max(254).email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required.").max(128),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be at most 100 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be at most 128 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupValues = z.infer<typeof signupSchema>;

export const createInviteSchema = z.object({
  maxUses: z.number().int().min(1).max(1000),
  expiresInHours: z.number().int().min(1).max(720),
});

export type CreateInviteValues = z.infer<typeof createInviteSchema>;
