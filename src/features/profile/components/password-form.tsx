"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormError } from "@/components/shared/form-error";
import { PasswordField } from "@/components/shared/password-field";
import { SubmitButton } from "@/components/shared/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type SessionUser, authClient } from "@/lib/auth/client";

import { type PasswordValues, passwordSchema } from "../schemas";
import { SettingsSection } from "./settings-section";

/** Error code the server answers with when the current password is wrong. */
const INVALID_PASSWORD_CODE = "INVALID_PASSWORD";

/** Changes the password, after confirming the current one. */
export function PasswordForm({ user }: { user: SessionUser }) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", revokeOtherSessions: true },
  });

  async function onSubmit(values: PasswordValues) {
    setServerError(null);

    const { error } = await authClient.changePassword(values);

    if (error?.code === INVALID_PASSWORD_CODE) {
      setError(
        "currentPassword",
        { message: "That password is incorrect." },
        { shouldFocus: true }
      );
      return;
    }

    if (error) {
      setServerError(error.message ?? "Failed to update password.");
      return;
    }

    reset();
    toast.success("Password updated.");
  }

  return (
    <SettingsSection
      title="Password"
      description="Confirm your current password to choose a new one."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
        {/* Tells password managers which account the new password belongs to. */}
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={user.username ?? user.email}
          readOnly
          hidden
        />
        {serverError && <FormError>{serverError}</FormError>}
        <PasswordField
          id="current-password"
          label="Current password"
          autoComplete="current-password"
          error={errors.currentPassword}
          {...register("currentPassword")}
        />
        <PasswordField
          id="new-password"
          label="New password"
          description="At least 8 characters."
          autoComplete="new-password"
          error={errors.newPassword}
          {...register("newPassword")}
        />
        <Controller
          control={control}
          name="revokeOtherSessions"
          render={({ field }) => (
            <Label className="mt-1 font-normal">
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              Sign out of all other devices
            </Label>
          )}
        />
        <div className="mt-2 flex justify-end">
          <SubmitButton pending={isSubmitting} pendingLabel="Updating…">
            Update password
          </SubmitButton>
        </div>
      </form>
    </SettingsSection>
  );
}
