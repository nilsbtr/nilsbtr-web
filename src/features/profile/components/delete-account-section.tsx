"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormError } from "@/components/shared/form-error";
import { PasswordField } from "@/components/shared/password-field";
import { SubmitButton } from "@/components/shared/submit-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { type SessionUser, authClient } from "@/lib/auth/client";

import { type DeleteAccountValues, deleteAccountSchema } from "../schemas";
import { SettingsSection } from "./settings-section";

/** Error code the server answers with when the password is wrong. */
const INVALID_PASSWORD_CODE = "INVALID_PASSWORD";

/** Asks for the password once more, then erases the account for good. */
function DeleteAccountDialog({
  user,
  open,
  onOpenChange,
}: {
  user: SessionUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit({ password }: DeleteAccountValues) {
    setServerError(null);

    // The session is dropped by hand below, once the page has moved on, so the
    // profile page doesn't send the now signed-out visitor to the login screen.
    const { error } = await authClient.deleteUser({
      password,
      fetchOptions: { disableSignal: true },
    });

    if (error?.code === INVALID_PASSWORD_CODE) {
      setError("password", { message: "That password is incorrect." }, { shouldFocus: true });
      return;
    }

    if (error) {
      setServerError(error.message ?? "Failed to delete your account.");
      return;
    }

    toast.success("Your account has been deleted.");
    router.replace("/");
    authClient.$store.notify("$sessionSignal");
    router.refresh();
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) return;
        if (!nextOpen) {
          reset();
          setServerError(null);
        }
        onOpenChange(nextOpen);
      }}
    >
      <AlertDialogContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              Your profile, sessions and sign-in details are erased right away and can&apos;t be
              recovered. Enter your password to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4">
            {/* Tells password managers which account the password belongs to. */}
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
              id="delete-account-password"
              label="Password"
              autoComplete="current-password"
              error={errors.password}
              {...register("password")}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <SubmitButton variant="destructive" pending={isSubmitting} pendingLabel="Deleting…">
              Delete account
            </SubmitButton>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** The way out: erases the account and everything tied to it (Art. 17 GDPR). */
export function DeleteAccountSection({ user }: { user: SessionUser }) {
  const [open, setOpen] = useState(false);

  return (
    <SettingsSection
      title="Delete account"
      description="Permanently erase your account and everything stored with it. This can't be undone."
    >
      <div className="flex justify-end">
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete account
        </Button>
      </div>
      <DeleteAccountDialog user={user} open={open} onOpenChange={setOpen} />
    </SettingsSection>
  );
}
