import { z } from "zod";

/** Field rules shared by the sign-up and profile forms. */

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(50, "Name must be at most 50 characters.");

export const newPasswordSchema = z.string().min(8, "Password must be at least 8 characters.");
