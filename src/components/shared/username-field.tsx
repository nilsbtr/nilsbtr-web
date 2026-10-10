"use client";

import { type ChangeEvent, useEffect, useState } from "react";

import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Spinner } from "@/components/shared/spinner";
import { authClient } from "@/lib/auth/client";
import {
  USERNAME_HINT,
  USERNAME_MAX_LENGTH,
  USERNAME_TAKEN_MESSAGE,
  isValidUsername,
  sanitizeUsername,
} from "@/lib/auth/username";

import { InputField, type InputFieldProps } from "./input-field";

type Availability = "unknown" | "checking" | "available" | "taken";

/** Pause after the last keystroke before asking the server. */
const CHECK_DELAY_MS = 300;

/**
 * Looks up whether a username is free while it is being typed. It stays
 * "unknown" for names that are not valid yet, for the user's own current name
 * and when the lookup fails; the server has the final say on submit either way.
 */
function useUsernameAvailability(username: string, current?: string | null): Availability {
  const [result, setResult] = useState<{ username: string; available: boolean | null }>();
  const isCheckable = username !== current && isValidUsername(username);

  useEffect(() => {
    if (!isCheckable) return;

    const controller = new AbortController();

    async function check() {
      let available: boolean | null = null;
      try {
        const { data } = await authClient.isUsernameAvailable(
          { username },
          { signal: controller.signal }
        );
        available = data?.available ?? null;
      } catch {
        // Offline, or superseded by newer input.
      }
      if (!controller.signal.aborted) setResult({ username, available });
    }

    const timer = setTimeout(check, CHECK_DELAY_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [username, isCheckable]);

  if (!isCheckable) return "unknown";
  if (result?.username !== username) return "checking";
  if (result.available === null) return "unknown";
  return result.available ? "available" : "taken";
}

function AvailabilityIndicator({ availability }: { availability: Availability }) {
  return (
    <span
      role="status"
      className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center"
    >
      {availability === "checking" && (
        <Spinner aria-hidden="true" className="text-muted-foreground" />
      )}
      {availability === "available" && (
        <>
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            strokeWidth={2}
            className="size-4 animate-in text-brand duration-300 zoom-in-50"
          />
          <span className="sr-only">Username is available.</span>
        </>
      )}
    </span>
  );
}

/**
 * The username input of an account form. It only lets valid characters in,
 * and reports whether the name is still free as it is typed.
 */
export function UsernameField({
  username,
  current,
  error,
  onChange,
  ...props
}: Omit<InputFieldProps, "id" | "label" | "type" | "description" | "trailing"> & {
  /** The field's current text, which the availability lookup follows. */
  username: string;
  /** The username the account already has, which is its to keep. */
  current?: string | null;
}) {
  const availability = useUsernameAvailability(username, current);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const sanitized = sanitizeUsername(input.value);

    if (sanitized !== input.value) {
      // Rewriting the value sends the caret to the end; put it back where it was.
      const fromEnd = input.value.length - (input.selectionStart ?? input.value.length);
      const caret = Math.max(0, sanitized.length - fromEnd);
      input.value = sanitized;
      input.setSelectionRange(caret, caret);
    }

    return onChange?.(event);
  }

  return (
    <InputField
      id="username"
      label="Username"
      type="text"
      placeholder="janedoe"
      autoComplete="username"
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      maxLength={USERNAME_MAX_LENGTH}
      description={USERNAME_HINT}
      error={error ?? (availability === "taken" ? { message: USERNAME_TAKEN_MESSAGE } : undefined)}
      trailing={<AvailabilityIndicator availability={availability} />}
      onChange={handleChange}
      {...props}
    />
  );
}
