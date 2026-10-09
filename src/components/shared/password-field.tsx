"use client";

import { useState } from "react";

import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { InputField, type InputFieldProps } from "./input-field";

/** Password input with a toggle to reveal what was typed. */
export function PasswordField(props: Omit<InputFieldProps, "type" | "trailing">) {
  const [visible, setVisible] = useState(false);

  return (
    <InputField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          aria-label="Show password"
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          <HugeiconsIcon
            icon={visible ? ViewOffSlashIcon : ViewIcon}
            strokeWidth={1.5}
            className="size-4"
          />
        </button>
      }
    />
  );
}
