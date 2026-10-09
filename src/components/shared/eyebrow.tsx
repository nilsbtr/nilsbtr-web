import type { ComponentProps } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Small uppercase label that sits above headings and groups. The variants are
 * exported so motion primitives can carry the same styling on their own tag.
 */
const eyebrowVariants = cva("font-medium tracking-caps text-muted-foreground uppercase", {
  variants: {
    size: {
      /** Labels a group within a page. */
      sm: "text-2xs",
      /** Sits above a page title. */
      md: "text-xs",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

function Eyebrow({
  className,
  size,
  ...props
}: ComponentProps<"p"> & VariantProps<typeof eyebrowVariants>) {
  return <p className={cn(eyebrowVariants({ size }), className)} {...props} />;
}

export { Eyebrow, eyebrowVariants };
