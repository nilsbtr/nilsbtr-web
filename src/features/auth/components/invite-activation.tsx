"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { authClient } from "@/lib/auth/client";

import { AuthCard } from "./auth-card";

type Status = "activating" | "success" | "error";

const TITLES: Record<Status, string> = {
  activating: "Activating invite...",
  success: "Invite activated",
  error: "Invite failed",
};

/** Redeems an invite token on mount, then forwards the visitor to sign-up. */
export function InviteActivation({ token }: { token: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("activating");
  const [message, setMessage] = useState("");
  const activated = useRef(false);

  useEffect(() => {
    if (activated.current) return;
    activated.current = true;

    async function activate() {
      const { data, error } = await authClient.invite.activate({ token });

      if (error) {
        setStatus("error");
        setMessage(error.message ?? "This invite is invalid or has expired.");
        return;
      }

      setStatus("success");

      if (data?.action === "upgrade") {
        setMessage("Your role has been upgraded.");
        setTimeout(() => router.push(data.redirectTo ?? "/"), 1500);
      } else {
        router.push("/signup");
      }
    }

    activate();
  }, [token, router]);

  const descriptions: Record<Status, string> = {
    activating: "Please wait while we verify your invitation.",
    success: message || "Redirecting you to sign up...",
    error: message,
  };

  return (
    <AuthCard title={TITLES[status]} description={descriptions[status]}>
      {status === "error" && (
        <>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The invite link may have expired or already been used. Please contact the person who
              invited you for a new link.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" render={<Link href="/" />}>
              Back to home
            </Button>
          </CardFooter>
        </>
      )}
      {status === "activating" && (
        <CardContent>
          <div className="flex justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
          </div>
        </CardContent>
      )}
    </AuthCard>
  );
}
