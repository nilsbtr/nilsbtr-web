import type { ComponentProps } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Outer frame of every page: horizontal gutter, content width and the offset
 * that clears the fixed site header.
 */
const pageShellVariants = cva("mx-auto w-full px-6", {
  variants: {
    size: {
      /** Forms. */
      sm: "max-w-sm",
      /** Prose and short lists. */
      md: "max-w-xl",
      /** Grids and long-form pages. */
      lg: "max-w-4xl",
      /** Tables and other data-dense screens. */
      xl: "max-w-6xl",
    },
    align: {
      /** Long pages start below the header and scroll. */
      start: "pt-24 pb-24 sm:pt-32",
      /** Short pages sit in the vertical center of the viewport. */
      center: "flex min-h-dvh flex-col justify-center pt-24 pb-20",
    },
  },
  defaultVariants: {
    size: "lg",
    align: "start",
  },
});

export function PageShell({
  className,
  size,
  align,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof pageShellVariants>) {
  return <div className={cn(pageShellVariants({ size, align }), className)} {...props} />;
}
