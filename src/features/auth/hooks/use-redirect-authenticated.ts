"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/client";

/**
 * Sends visitors who are already signed in away from an auth page.
 * Returns true while the redirect is underway, so the page can render nothing.
 */
export function useRedirectAuthenticated(destination = "/") {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = Boolean(session) && !isPending;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(destination);
    }
  }, [isAuthenticated, destination, router]);

  return isAuthenticated;
}
