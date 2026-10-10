"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormError } from "@/components/shared/form-error";
import { InputField } from "@/components/shared/input-field";
import { PasswordField } from "@/components/shared/password-field";
import { authClient } from "@/lib/auth/client";

import { useRedirectAuthenticated } from "../hooks/use-redirect-authenticated";
import { getSafeCallbackUrl } from "../lib/callback-url";
import { type LoginValues, loginSchema } from "../schemas";
import { AuthShell, AuthSubmitButton, AuthSwitchLink } from "./auth-shell";

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
    defaultValues: { identifier: "", password: "" },
  });

  if (isRedirecting) {
    return null;
  }

  async function onSubmit({ identifier, password }: LoginValues) {
    setServerError(null);

    // Usernames never contain an "@", so it tells the two apart.
    const { error } = identifier.includes("@")
      ? await authClient.signIn.email({ email: identifier, password })
      : await authClient.signIn.username({ username: identifier.toLowerCase(), password });

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
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
        {serverError && <FormError>{serverError}</FormError>}
        <InputField
          id="identifier"
          label="Email or username"
          type="text"
          placeholder="you@example.com"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          error={errors.identifier}
          {...register("identifier")}
        />
        <PasswordField
          id="password"
          label="Password"
          autoComplete="current-password"
          error={errors.password}
          {...register("password")}
        />
        <AuthSubmitButton pending={isSubmitting} pendingLabel="Signing in…">
          Sign in
        </AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
