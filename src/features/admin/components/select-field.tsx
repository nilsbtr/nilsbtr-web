"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** A labelled select with an optional hint: the select counterpart of InputField. */
export function SelectField<Value extends string | number>({
  id,
  label,
  description,
  options,
  value,
  onValueChange,
}: {
  id: string;
  label: string;
  /** Hint shown below the select. */
  description?: string;
  options: readonly { value: Value; label: string }[];
  value: Value;
  onValueChange: (value: Value) => void;
}) {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        items={options}
        value={value}
        onValueChange={(next) => {
          if (next !== null) onValueChange(next);
        }}
      >
        <SelectTrigger
          id={id}
          aria-describedby={descriptionId}
          className="w-full data-[size=default]:h-10"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
    </Field>
  );
}
