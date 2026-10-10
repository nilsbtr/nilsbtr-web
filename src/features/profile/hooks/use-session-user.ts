"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { type SessionUser, authClient } from "@/lib/auth/client";

/**
 * The signed-in user, for pages that need one. Returns null until the session
 * is known. Visitors without a session are sent to the login page, which
 * brings them back afterwards.
 */
export function useSessionUser(): SessionUser | null {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const isSignedOut = !isPending && !session;

  useEffect(() => {
    if (isSignedOut) {
      router.replace(`/login?callbackURL=${encodeURIComponent(pathname)}`);
    }
  }, [isSignedOut, pathname, router]);

  return session?.user ?? null;
}
