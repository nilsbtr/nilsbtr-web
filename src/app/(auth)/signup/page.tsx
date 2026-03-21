"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { type SignupValues, signupSchema } from "@/lib/validations";

function getCodeFromFragment(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (!hash.startsWith("#code=")) return null;
  return decodeURIComponent(hash.slice("#code=".length)) || null;
}

async function checkSignupAccess(
  code: string | null,
): Promise<{ valid: boolean; bootstrap?: boolean; error?: string }> {
  const res = await fetch("/api/invites/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: code ?? "" }),
  });
  return res.json();
}

function SignupForm() {
  const router = useRouter();
  const [code] = useState(getCodeFromFragment);

  const [serverError, setServerError] = useState<string | null>(null);

  const { data: codeCheck, isLoading: isCheckingCode } = useQuery({
    queryKey: ["signup-access", code],
    queryFn: () => checkSignupAccess(code),
    retry: false,
  });

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const isBootstrap = codeCheck?.bootstrap === true;

  async function onSubmit(values: SignupValues) {
    if (!codeCheck?.valid) return;
    setServerError(null);

    const { error } = await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      code ? { headers: { "x-invite-code": code } } : undefined
    );

    if (error) {
      setServerError(error.message ?? "Failed to create account.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  if (isCheckingCode) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verifying invite...</CardTitle>
          <CardDescription>Please wait while we validate your invite code.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!codeCheck?.valid) {
    const title = code ? "Invalid invite" : "Invite required";
    const description = code
      ? (codeCheck?.error ?? "This invite link is invalid or has expired.")
      : "This site is invite-only. You need a valid invite link to sign up.";

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          {isBootstrap ? "Set up your owner account." : "You have been invited to join."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="signup-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="signup-name"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="signup-confirm">Confirm password</FieldLabel>
                  <Input
                    {...field}
                    id="signup-confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        {serverError && <p className="w-full text-sm text-destructive">{serverError}</p>}
        <Button
          type="submit"
          form="signup-form"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SignupPage() {
  return <SignupForm />;
}
