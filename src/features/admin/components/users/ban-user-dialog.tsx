"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { InputField } from "@/components/shared/input-field";
import { SubmitButton } from "@/components/shared/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { banUser } from "../../actions/users";
import { useAdminAction } from "../../hooks/use-admin-action";
import { BAN_DURATION_OPTIONS, BAN_REASON_MAX_LENGTH, banUserSchema } from "../../schemas";
import type { Person } from "../../types";
import { SelectField } from "../select-field";

const banFormSchema = banUserSchema.omit({ userId: true });

type BanFormValues = z.infer<typeof banFormSchema>;

/** Asks for how long and why, then bans a user, which also signs them out. */
export function BanUserDialog({
  user,
  open,
  onOpenChange,
}: {
  user: Person;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { run, isPending } = useAdminAction(banUser);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BanFormValues>({
    resolver: zodResolver(banFormSchema),
    defaultValues: { reason: "", duration: 0 },
  });

  async function onSubmit(values: BanFormValues) {
    const result = await run({ userId: user.id, ...values });
    if (!result.ok) return;

    toast.success(`${user.name} has been banned.`);
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) onOpenChange(nextOpen);
      }}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban {user.name}?</DialogTitle>
          <DialogDescription>
            They are signed out everywhere and can&apos;t sign in again while the ban holds. Their
            account stays as it is.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
          <Controller
            control={control}
            name="duration"
            render={({ field }) => (
              <SelectField
                id="ban-duration"
                label="Duration"
                options={BAN_DURATION_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <InputField
            id="ban-reason"
            label="Reason"
            description="Optional. Only administrators see it."
            placeholder="Spam"
            autoComplete="off"
            maxLength={BAN_REASON_MAX_LENGTH}
            error={errors.reason}
            {...register("reason")}
          />
          <DialogFooter className="mt-2">
            <DialogClose render={<Button variant="outline" />} disabled={isPending}>
              Cancel
            </DialogClose>
            <SubmitButton variant="destructive" pending={isPending} pendingLabel="Banning…">
              Ban user
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
