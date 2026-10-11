/** Where the dashboard's pages live. */
export const DASHBOARD_ROUTES = {
  overview: "/dashboard",
  users: "/dashboard/users",
  invites: "/dashboard/invites",
} as const;

/** The page of a single user. */
export function getUserHref(userId: string) {
  return `${DASHBOARD_ROUTES.users}/${userId}`;
}
