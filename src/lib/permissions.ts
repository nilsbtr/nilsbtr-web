import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements, userAc } from "better-auth/plugins/admin/access";

export const USER_ROLE = "user" as const;
export const ADMIN_ROLE = "admin" as const;

export const statement = {
  ...defaultStatements,
  invite: ["create"],
} as const;

export const ac = createAccessControl(statement);

const user = ac.newRole({
  ...userAc.statements,
  invite: [],
});

const admin = ac.newRole({
  ...adminAc.statements,
  invite: ["create"],
});

export const roles = {
  [USER_ROLE]: user,
  [ADMIN_ROLE]: admin,
};

export type PermissionMap = {
  [K in keyof typeof statement]?: (typeof statement)[K][number][];
};

export function hasPermission(roleNames: string | null | undefined, permissions: PermissionMap) {
  if (!roleNames) return false;

  return roleNames.split(",").some((name) => {
    const role = roles[name.trim() as keyof typeof roles];
    return role?.authorize(permissions).success ?? false;
  });
}
