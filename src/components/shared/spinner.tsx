import type { ComponentProps } from "react";

import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

/**
 * Indeterminate loading indicator. It announces itself as "Loading"; pass
 * `aria-hidden` when adjacent text already describes what is happening.
 */
export function Spinner({
  className,
  ...props
}: Omit<ComponentProps<typeof HugeiconsIcon>, "icon">) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}
