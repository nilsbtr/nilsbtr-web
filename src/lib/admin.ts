import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { session: null, error: "Not authenticated." } as const;
  }

  if (session.user.role !== "admin") {
    return { session: null, error: "Forbidden." } as const;
  }

  return { session, error: null } as const;
}
