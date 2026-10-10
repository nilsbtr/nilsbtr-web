"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { FormError } from "@/components/shared/form-error";
import { IdentityPreview } from "@/components/shared/identity-preview";
import { InputField } from "@/components/shared/input-field";
import { PasswordField } from "@/components/shared/password-field";
import { UsernameField } from "@/components/shared/username-field";
import { authClient } from "@/lib/auth/client";
import { USERNAME_TAKEN_CODE, USERNAME_TAKEN_MESSAGE } from "@/lib/auth/username";

import { useRedirectAuthenticated } from "../hooks/use-redirect-authenticated";
import { type SignupValues, signupSchema } from "../schemas";
import { AuthShell, AuthSubmitButton, AuthSwitchLink } from "./auth-shell";

export function SignupForm() {
  const router = useRouter();

  const isRedirecting = useRedirectAuthenticated();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", name: "", email: "", password: "" },
  });
  const [username, name] = useWatch({ control, name: ["username", "name"] });

  if (isRedirecting) {
    return null;
  }

  async function onSubmit(values: SignupValues) {
    setServerError(null);

    const { error } = await authClient.signUp.email(values);

    if (error?.code === USERNAME_TAKEN_CODE) {
      setError("username", { message: USERNAME_TAKEN_MESSAGE }, { shouldFocus: true });
      return;
    }

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
        <IdentityPreview username={username} name={name} />
        {serverError && <FormError>{serverError}</FormError>}
        <UsernameField username={username} error={errors.username} {...register("username")} />
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
