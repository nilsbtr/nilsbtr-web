import type { ComponentProps } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type InputFieldProps = ComponentProps<typeof Input> & {
  id: string;
  label: string;
  /** Validation error for this field, e.g. from react-hook-form. */
  error?: { message?: string };
};

/** A labelled input with its validation message: the standard form row. */
export function InputField({ id, label, error, ...props }: InputFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} aria-invalid={!!error} {...props} />
      <FieldError errors={[error]} />
    </Field>
  );
}
