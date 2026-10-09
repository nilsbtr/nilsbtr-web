import type { ComponentProps } from "react";

const NEW_TAB_HINT = "(opens in a new tab)";

/**
 * Anchor for off-site destinations: opens in a new tab without leaking the
 * opener, and tells screen reader users that it does.
 */
export function ExternalLink({
  children,
  "aria-label": ariaLabel,
  ...props
}: Omit<ComponentProps<"a">, "target" | "rel">) {
  return (
    <a
      {...props}
      aria-label={ariaLabel ? `${ariaLabel} ${NEW_TAB_HINT}` : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {!ariaLabel && <span className="sr-only"> {NEW_TAB_HINT}</span>}
    </a>
  );
}
