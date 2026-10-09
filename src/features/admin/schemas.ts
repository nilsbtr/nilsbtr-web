import { z } from "zod";

export const EXPIRY_OPTIONS = [
  { value: 86_400, label: "1 day" },
  { value: 604_800, label: "7 days" },
  { value: 2_592_000, label: "30 days" },
  { value: 0, label: "Never" },
] as const;

export const createInviteSchema = z.object({
  role: z.string().min(1, "Role is required."),
  maxUses: z.number().int().min(1, "Must be at least 1."),
  expiresIn: z.number().int().min(0),
});

export type CreateInviteValues = z.infer<typeof createInviteSchema>;
