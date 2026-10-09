"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/shared/input-field";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

import { useRedirectAuthenticated } from "../hooks/use-redirect-authenticated";
import { getSafeCallbackUrl } from "../lib/callback-url";
import { type LoginValues, loginSchema } from "../schemas";
import { AuthFormError, AuthShell, AuthSwitchLink } from "./auth-shell";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = getSafeCallbackUrl(searchParams.get("callbackURL"));

  const isRedirecting = useRedirectAuthenticated(callbackURL);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  if (isRedirecting) {
    return null;
  }

  async function onSubmit(values: LoginValues) {
    setServerError(null);

    const { error } = await authClient.signIn.email(values);

    if (error) {
      setServerError(error.message ?? "Failed to sign in.");
      return;
    }

    router.push(callbackURL);
  }

  return (
    <AuthShell
      title="Sign in"
      description="Enter your credentials to continue."
      footer={
        <AuthSwitchLink prompt="Don't have an account?" href="/signup">
          Sign up
        </AuthSwitchLink>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {serverError && <AuthFormError>{serverError}</AuthFormError>}
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
          {...register("email")}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password}
          {...register("password")}
        />
        <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
