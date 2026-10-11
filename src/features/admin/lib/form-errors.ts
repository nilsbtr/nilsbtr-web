import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

import type { ActionResult } from "../types";

type ActionFailure = Extract<ActionResult<unknown>, { ok: false }>;

/**
 * Puts the field problems of a failed action next to the form's fields, and
 * moves focus to the first of them. A problem with something the form has no
 * field for is reported in a toast, so it never goes unnoticed.
 */
export function applyFieldErrors<Values extends FieldValues>(
  failure: ActionFailure,
  fields: readonly Path<Values>[],
  setError: UseFormSetError<Values>
) {
  if (!failure.fieldErrors) return;

  const affected = fields.filter((field) => failure.fieldErrors?.[field]);

  affected.forEach((field, index) => {
    setError(field, { message: failure.fieldErrors?.[field] }, { shouldFocus: index === 0 });
  });

  if (affected.length === 0) toast.error(failure.message);
}
