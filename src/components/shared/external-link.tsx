import type { ComponentProps } from "react";

const NEW_TAB_HINT = "(opens in a new tab)";

/**
 * Anchor for off-site destinations: opens in a new tab without leaking the
 * opener, and tells screen reader users that it does.
 */
export function ExternalLink({
  children,
  "aria-label": ariaLabel,
  newTabHint = NEW_TAB_HINT,
  ...props
}: Omit<ComponentProps<"a">, "target" | "rel"> & {
  /** The hint in the language of the surrounding text. */
  newTabHint?: string;
}) {
  return (
    <a
      {...props}
      aria-label={ariaLabel ? `${ariaLabel} ${newTabHint}` : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {!ariaLabel && <span className="sr-only"> {newTabHint}</span>}
    </a>
  );
}
