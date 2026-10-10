import type { ComponentProps } from "react";

import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";

export type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type"> & {
  /** Whether the submission is in flight. */
  pending: boolean;
  /** Replaces the label while pending, e.g. "Saving…". */
  pendingLabel: string;
};

/** Submit button that shows progress while the request is in flight. */
export function SubmitButton({
  pending,
  pendingLabel,
  disabled,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={pending || disabled} aria-busy={pending} {...props}>
      {pending && <Spinner aria-hidden="true" data-icon="inline-start" />}
      {pending ? pendingLabel : children}
    </Button>
  );
}
