import type { ReactNode } from "react";

import Link from "next/link";

import { Reveal } from "@/components/motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Shared frame of every auth screen: a card with a title and description. */
export function AuthCard({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal variant="scale" className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {children}
      </Card>
    </Reveal>
  );
}

/** Message shown above the fields when the server rejects a submission. */
export function AuthFormError({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{children}</p>
  );
}

/** Footer line pointing to the other auth screen, e.g. "Already have an account? Sign in". */
export function AuthSwitchLink({
  prompt,
  href,
  children,
}: {
  prompt: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {prompt}{" "}
      <Link href={href} className="text-foreground underline underline-offset-3">
        {children}
      </Link>
    </p>
  );
}
