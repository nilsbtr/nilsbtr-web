import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { session: null, error: "Not authenticated.", status: 401 as const };
  }

  if (session.user.role !== "admin") {
    return { session: null, error: "Forbidden.", status: 403 as const };
  }

  return { session, error: null, status: 200 as const };
}
