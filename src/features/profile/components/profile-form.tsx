"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { FormError } from "@/components/shared/form-error";
import { IdentityPreview } from "@/components/shared/identity-preview";
import { InputField } from "@/components/shared/input-field";
import { SubmitButton } from "@/components/shared/submit-button";
import { UsernameField } from "@/components/shared/username-field";
import { type SessionUser, authClient } from "@/lib/auth/client";
import { USERNAME_TAKEN_CODE, USERNAME_TAKEN_MESSAGE } from "@/lib/auth/username";

import { type ProfileValues, profileSchema } from "../schemas";
import { SettingsSection } from "./settings-section";

/** Edits how the user appears: their username, and with it their avatar, and their name. */
export function ProfileForm({ user }: { user: SessionUser }) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: user.username ?? "", name: user.name },
  });
  const [username, name] = useWatch({ control, name: ["username", "name"] });

  async function onSubmit(values: ProfileValues) {
    setServerError(null);

    const { error } = await authClient.updateUser(values);

    if (error?.code === USERNAME_TAKEN_CODE) {
      setError("username", { message: USERNAME_TAKEN_MESSAGE }, { shouldFocus: true });
      return;
    }

    if (error) {
      setServerError(error.message ?? "Failed to update profile.");
      return;
    }

    reset(values);
    toast.success("Profile updated.");
  }

  return (
    <SettingsSection
      title="Identity"
      description="Your username is your handle on the site, and your avatar is drawn from it."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
        <IdentityPreview username={username} name={name} />
        {serverError && <FormError>{serverError}</FormError>}
        <UsernameField
          username={username}
          current={user.username}
          error={errors.username}
          {...register("username")}
        />
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
          description="Your email address can't be changed here."
          value={user.email}
          readOnly
          disabled
        />
        <div className="mt-2 flex justify-end">
          <SubmitButton pending={isSubmitting} pendingLabel="Saving…" disabled={!isDirty}>
            Save changes
          </SubmitButton>
        </div>
      </form>
    </SettingsSection>
  );
}
