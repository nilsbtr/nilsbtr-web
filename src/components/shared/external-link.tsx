import type { ComponentProps } from "react";

/** Anchor for off-site destinations: opens in a new tab without leaking the opener. */
export function ExternalLink(props: Omit<ComponentProps<"a">, "target" | "rel">) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
