"use client";

import { type ComponentProps, useEffect, useState } from "react";

import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

/** How long the button confirms a copy before it offers the next one. */
const CONFIRMATION_MS = 2000;

/**
 * Copies a text to the clipboard and confirms it in place: the icon turns into
 * a check mark for a moment, and the confirmation is announced to screen readers.
 */
export function CopyButton({
  value,
  label,
  showLabel = false,
  ...props
}: Omit<ComponentProps<typeof Button>, "value" | "onClick" | "children"> & {
  /** The text to copy, or a function that builds it when the button is pressed. */
  value: string | (() => string);
  /** What the button copies: "Copy invite link". */
  label: string;
  /** Show the label next to the icon instead of only naming the button with it. */
  showLabel?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), CONFIRMATION_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(typeof value === "function" ? value() : value);
      setCopied(true);
    } catch {
      toast.error("Couldn't copy to the clipboard.");
    }
  }

  return (
    <>
      <Button aria-label={showLabel ? undefined : label} onClick={copy} {...props}>
        {copied ? (
          <HugeiconsIcon
            icon={Tick02Icon}
            strokeWidth={2}
            data-icon={showLabel ? "inline-start" : undefined}
            className="animate-in text-brand duration-200 zoom-in-50"
          />
        ) : (
          <HugeiconsIcon
            icon={Copy01Icon}
            strokeWidth={2}
            data-icon={showLabel ? "inline-start" : undefined}
          />
        )}
        {showLabel && (copied ? "Copied" : label)}
      </Button>
      <span role="status" className="sr-only">
        {copied ? "Copied to the clipboard." : ""}
      </span>
    </>
  );
}
