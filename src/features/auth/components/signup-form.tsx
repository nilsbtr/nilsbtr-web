"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/shared/input-field";
import { PasswordField } from "@/components/shared/password-field";
import { authClient } from "@/lib/auth/client";

import { useRedirectAuthenticated } from "../hooks/use-redirect-authenticated";
import { type SignupValues, signupSchema } from "../schemas";
import { AuthFormError, AuthShell, AuthSubmitButton, AuthSwitchLink } from "./auth-shell";

export function SignupForm() {
  const router = useRouter();

  const isRedirecting = useRedirectAuthenticated();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  if (isRedirecting) {
    return null;
  }

  async function onSubmit(values: SignupValues) {
    setServerError(null);

    const { error } = await authClient.signUp.email(values);

    if (error) {
      setServerError(error.message ?? "Failed to create account.");
      return;
    }

    router.push("/");
  }

  return (
    <AuthShell
      title="Create an account"
      description="Sign-up is invite-only. You need an invitation to proceed."
      footer={
        <AuthSwitchLink prompt="Already have an account?" href="/login">
          Sign in
        </AuthSwitchLink>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
        {serverError && <AuthFormError>{serverError}</AuthFormError>}
        <InputField
          id="name"
          label="Name"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          error={errors.name}
          {...register("name")}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
          {...register("email")}
        />
        <PasswordField
          id="password"
          label="Password"
          description="At least 8 characters."
          autoComplete="new-password"
          error={errors.password}
          {...register("password")}
        />
        <AuthSubmitButton pending={isSubmitting} pendingLabel="Creating account…">
          Create account
        </AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
