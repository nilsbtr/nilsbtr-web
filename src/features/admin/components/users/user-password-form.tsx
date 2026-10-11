"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { PasswordField } from "@/components/shared/password-field";
import { SubmitButton } from "@/components/shared/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { setUserPassword } from "../../actions/users";
import { useAdminAction } from "../../hooks/use-admin-action";
import { applyFieldErrors } from "../../lib/form-errors";
import { setUserPasswordSchema } from "../../schemas";
import type { UserSummary } from "../../types";

const passwordFormSchema = setUserPasswordSchema.omit({ userId: true });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

/**
 * Gives a user a new password. There is no "forgot password" email on this
 * site, so this is how someone who is locked out gets back in.
 */
export function UserPasswordForm({
  user,
}: {
  user: Pick<UserSummary, "id" | "name" | "username" | "email">;
}) {
  const { run, isPending } = useAdminAction(setUserPassword);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { newPassword: "", revokeSessions: true },
  });

  async function onSubmit(values: PasswordFormValues) {
    const result = await run({ userId: user.id, ...values });

    if (!result.ok) {
      applyFieldErrors(result, ["newPassword"], setError);
      return;
    }

    reset();
    toast.success(`${user.name} has a new password.`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      {/* Tells password managers the password is this user's, not the administrator's. */}
      <input
        type="text"
        name="username"
        autoComplete="username"
        value={user.username ?? user.email}
        readOnly
        hidden
      />
      <PasswordField
        id="new-password"
        label="New password"
        description="At least 8 characters. Pass it on to them yourself."
        autoComplete="new-password"
        error={errors.newPassword}
        {...register("newPassword")}
      />
      <Controller
        control={control}
        name="revokeSessions"
        render={({ field }) => (
          <Label className="font-normal">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            Sign them out everywhere
          </Label>
        )}
      />
      <div className="mt-2 flex justify-end">
        <SubmitButton variant="outline" pending={isPending} pendingLabel="Saving…">
          Set password
        </SubmitButton>
      </div>
    </form>
  );
}
