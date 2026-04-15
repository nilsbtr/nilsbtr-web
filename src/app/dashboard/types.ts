import { ADMIN_ROLE, USER_ROLE } from "@/lib/permissions";

export const AVAILABLE_ROLES = [
  { value: USER_ROLE, label: "User" },
  { value: ADMIN_ROLE, label: "Admin" },
] as const;

export function getRoleLabel(value: string) {
  return AVAILABLE_ROLES.find((r) => r.value === value)?.label ?? value;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  createdAt: Date;
  image: string | null;
};

export type Invite = {
  id: string;
  token: string | null;
  role: string;
  status: "pending" | "rejected" | "canceled" | "used";
  maxUses: number;
  createdAt: Date | null;
  expiresAt: Date;
};
