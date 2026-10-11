import "server-only";

import { cache } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_ROLE, hasRole } from "@/lib/auth/permissions";
import { auth } from "@/server/auth";

import { DASHBOARD_ROUTES } from "../lib/routes";

/** The visitor's session. Read once per request, however many callers ask. */
const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export type AdminSession = NonNullable<Awaited<ReturnType<typeof getSession>>>;

/** The session of a signed-in administrator, or null for anyone else. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await getSession();
  return session && hasRole(session.user.role, ADMIN_ROLE) ? session : null;
}

/**
 * Gate for the dashboard's pages and queries: returns the administrator's
 * session and sends everyone else away. Signed-out visitors go to the login
 * page, signed-in users without the role back to the site.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();

  if (!session) redirect(`/login?callbackURL=${encodeURIComponent(DASHBOARD_ROUTES.overview)}`);
  if (!hasRole(session.user.role, ADMIN_ROLE)) redirect("/");

  return session;
}
