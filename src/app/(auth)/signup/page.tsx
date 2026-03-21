"use client";

import { Suspense, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

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

async function checkInviteCode(code: string): Promise<{ valid: boolean; error?: string }> {
  const res = await fetch("/api/admin/invites/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  return res.json();
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [serverError, setServerError] = useState<string | null>(null);

  const { data: codeCheck, isLoading: isCheckingCode } = useQuery({
    queryKey: ["invite-validate", code],
    queryFn: () => checkInviteCode(code!),
    enabled: !!code,
    retry: false,
  });

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignupValues) {
    if (!code || !codeCheck?.valid) return;
    setServerError(null);

    const { error } = await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        headers: { "x-invite-code": code },
      }
    );

    if (error) {
      setServerError(error.message ?? "Failed to create account.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  if (!code) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Invite required</CardTitle>
          <CardDescription>
            This site is invite-only. You need a valid invite link to sign up.
          </CardDescription>
        </CardHeader>
      </Card>
    );
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
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Invalid invite</CardTitle>
          <CardDescription>
            {codeCheck?.error ?? "This invite link is invalid or has expired."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>You have been invited to join.</CardDescription>
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
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
