"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { InputField } from "@/components/shared/input-field";
import { SubmitButton } from "@/components/shared/submit-button";
import { UsernameField } from "@/components/shared/username-field";

import { updateUser } from "../../actions/users";
import { useAdminAction } from "../../hooks/use-admin-action";
import { applyFieldErrors } from "../../lib/form-errors";
import { updateUserSchema } from "../../schemas";
import type { UserSummary } from "../../types";

const profileFormSchema = updateUserSchema.omit({ userId: true });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

/** Edits who a user is: their username, name and email address. */
export function UserProfileForm({
  user,
}: {
  user: Pick<UserSummary, "id" | "username" | "name" | "email">;
}) {
  const { run, isPending } = useAdminAction(updateUser);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { username: user.username ?? "", name: user.name, email: user.email },
  });
  const username = useWatch({ control, name: "username" });

  async function onSubmit(values: ProfileFormValues) {
    const result = await run({ userId: user.id, ...values });

    if (!result.ok) {
      applyFieldErrors(result, ["username", "name", "email"], setError);
      return;
    }

    // What was saved is the new baseline; emails are stored in lower case.
    reset({ ...values, email: values.email.toLowerCase() });
    toast.success("Profile updated.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
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
        autoComplete="off"
        error={errors.name}
        {...register("name")}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        autoComplete="off"
        error={errors.email}
        {...register("email")}
      />
      <div className="mt-2 flex justify-end">
        <SubmitButton pending={isPending} pendingLabel="Saving…" disabled={!isDirty}>
          Save changes
        </SubmitButton>
      </div>
    </form>
  );
}
