"use client";

import { type ComponentProps, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Controller, useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";

import { createInvite } from "../../actions/invites";
import { useAdminAction } from "../../hooks/use-admin-action";
import { applyFieldErrors } from "../../lib/form-errors";
import { describeInviteLimit, getInviteUrl } from "../../lib/labels";
import {
  type CreateInviteInput,
  INVITE_EXPIRY_OPTIONS,
  INVITE_MAX_USES_LIMIT,
  createInviteSchema,
} from "../../schemas";
import { CopyButton } from "../copy-button";
import { SelectField } from "../select-field";

const DEFAULT_VALUES: CreateInviteInput = { maxUses: 1, expiresIn: 604_800 };

type CreatedInvite = CreateInviteInput & { url: string };

function getExpiryLabel(expiresIn: CreateInviteInput["expiresIn"]) {
  return INVITE_EXPIRY_OPTIONS.find((option) => option.value === expiresIn)?.label;
}

/** Second step of the dialog: the new invite's link, ready to be copied and sent. */
function InviteCreated({
  invite,
  onCreateAnother,
}: {
  invite: CreatedInvite;
  onCreateAnother: () => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Invite created</DialogTitle>
        <DialogDescription>
          Send this link to whoever you want to invite. It works{" "}
          {describeInviteLimit(invite.maxUses)} and expires in {getExpiryLabel(invite.expiresIn)}.
        </DialogDescription>
      </DialogHeader>
      <div className="flex gap-2">
        <Input
          readOnly
          aria-label="Invite link"
          value={invite.url}
          onFocus={(event) => event.target.select()}
          className="h-10 font-mono text-xs md:text-xs"
        />
        {/* Takes focus when this step appears, so Enter copies the link. */}
        <CopyButton value={invite.url} label="Copy link" showLabel size="lg" autoFocus />
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onCreateAnother}>
          Create another
        </Button>
        <DialogClose render={<Button variant="outline" />}>Done</DialogClose>
      </DialogFooter>
    </>
  );
}

function CreateInviteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { run, isPending } = useAdminAction(createInvite);
  const [created, setCreated] = useState<CreatedInvite | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateInviteInput>({
    resolver: zodResolver(createInviteSchema),
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values: CreateInviteInput) {
    const result = await run(values);

    if (!result.ok) {
      applyFieldErrors(result, ["maxUses", "expiresIn"], setError);
      return;
    }

    setCreated({ ...values, url: getInviteUrl(result.data.token) });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        // Not while the invite is being created. Once its link is showing, closing always works,
        // even if `isPending` should lag behind (see useAdminAction).
        if (!isPending || created) onOpenChange(nextOpen);
      }}
      onOpenChangeComplete={(isOpen) => {
        if (isOpen) return;
        reset();
        setCreated(null);
      }}
    >
      <DialogContent>
        {created ? (
          <InviteCreated invite={created} onCreateAnother={() => setCreated(null)} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>New invite</DialogTitle>
              <DialogDescription>
                Sign-up is invite-only. An invite is a link that lets its holder create an account.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
              <InputField
                id="invite-max-uses"
                label="Uses"
                description="How many people can sign up with it."
                type="number"
                inputMode="numeric"
                min={1}
                max={INVITE_MAX_USES_LIMIT}
                error={errors.maxUses}
                {...register("maxUses", { valueAsNumber: true })}
              />
              <Controller
                control={control}
                name="expiresIn"
                render={({ field }) => (
                  <SelectField
                    id="invite-expires-in"
                    label="Valid for"
                    description="After that the link stops working, used or not."
                    options={INVITE_EXPIRY_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
              <DialogFooter className="mt-2">
                <DialogClose render={<Button variant="outline" />} disabled={isPending}>
                  Cancel
                </DialogClose>
                <SubmitButton pending={isPending} pendingLabel="Creating…">
                  Create invite
                </SubmitButton>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Button that opens the dialog for creating an invite. */
export function CreateInviteButton(props: Pick<ComponentProps<typeof Button>, "variant" | "size">) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} {...props}>
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
        New invite
      </Button>
      <CreateInviteDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
