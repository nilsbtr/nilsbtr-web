import type { ComponentProps, ReactNode } from "react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type InputFieldProps = ComponentProps<typeof Input> & {
  id: string;
  label: string;
  /** Hint shown below the input, e.g. a format requirement. */
  description?: string;
  /** Validation error for this field, e.g. from react-hook-form. */
  error?: { message?: string };
  /** Control rendered inside the trailing edge of the input. */
  trailing?: ReactNode;
};

/**
 * A labelled input with its hint and validation message: the standard form
 * row. The hint and error are tied to the input, so assistive technology reads
 * them along with the label.
 */
export function InputField({
  id,
  label,
  description,
  error,
  trailing,
  className,
  ...props
}: InputFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const input = (
    <Input
      id={id}
      aria-invalid={!!error}
      aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
      className={cn("h-10", trailing && "pr-10", className)}
      {...props}
    />
  );

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {trailing ? (
        <div className="relative">
          {input}
          {trailing}
        </div>
      ) : (
        input
      )}
      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
      <FieldError id={errorId} errors={[error]} />
    </Field>
  );
}
