"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { USER_ROLE } from "@/lib/permissions";
import { getBaseUrl } from "@/lib/utils";
import {
  type CreateInviteValues,
  EXPIRY_OPTIONS,
  createInviteSchema,
} from "@/lib/validations/auth";

import { AVAILABLE_ROLES, getRoleLabel } from "../types";

function getExpiryLabel(value: number) {
  return EXPIRY_OPTIONS.find((o) => o.value === value)?.label ?? `${value}s`;
}

export function CreateInviteDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateInviteValues>({
    resolver: zodResolver(createInviteSchema),
    defaultValues: { role: USER_ROLE, maxUses: 1, expiresIn: 604_800 },
  });

  async function onSubmit(values: CreateInviteValues) {
    const { data, error } = await authClient.invite.create({
      role: values.role,
      maxUses: values.maxUses,
      ...(values.expiresIn > 0 ? { expiresIn: values.expiresIn } : {}),
      senderResponse: "token",
    });

    if (error) {
      toast.error(error.message ?? "Failed to create invite.");
      return;
    }

    if (data?.message) {
      const url = `${getBaseUrl()}/invite/${data.message}`;
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Invite created and link copied to clipboard.");
      } catch {
        toast.success("Invite created. Copy the link from the table.");
      }
    } else {
      toast.success("Invite created.");
    }

    reset();
    onOpenChange(false);
    onCreated();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create invitation</DialogTitle>
          <DialogDescription>Generate an invite link for a new user.</DialogDescription>
        </DialogHeader>
        <form id="create-invite-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <Field data-invalid={!!errors.role}>
            <FieldLabel>Role</FieldLabel>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    if (v) field.onChange(v);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <span>{getRoleLabel(field.value)}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.role]} />
          </Field>
          <Field data-invalid={!!errors.maxUses}>
            <FieldLabel htmlFor="invite-max-uses">Max uses</FieldLabel>
            <Input
              id="invite-max-uses"
              type="number"
              min={1}
              aria-invalid={!!errors.maxUses}
              {...register("maxUses", { valueAsNumber: true })}
            />
            <FieldError errors={[errors.maxUses]} />
          </Field>
          <Field data-invalid={!!errors.expiresIn}>
            <FieldLabel>Expires in</FieldLabel>
            <Controller
              control={control}
              name="expiresIn"
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => {
                    if (v) field.onChange(Number(v));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <span>{getExpiryLabel(field.value)}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {EXPIRY_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={String(o.value)}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.expiresIn]} />
          </Field>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="create-invite-form" disabled={isSubmitting}>
            {isSubmitting && (
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
                data-icon="inline-start"
              />
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
