"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

type Status = "activating" | "success" | "error";

export default function InviteActivationPage() {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
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

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 pt-14">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {status === "activating" && "Activating invite..."}
            {status === "success" && "Invite activated"}
            {status === "error" && "Invite failed"}
          </CardTitle>
          <CardDescription>
            {status === "activating" && "Please wait while we verify your invitation."}
            {status === "success" && (message || "Redirecting you to sign up...")}
            {status === "error" && message}
          </CardDescription>
        </CardHeader>
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
      </Card>
    </div>
  );
}
