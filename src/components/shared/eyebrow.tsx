import type { ComponentProps } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Small uppercase label that sits above headings and groups. The variants are
 * exported so motion primitives can carry the same styling on their own tag.
 */
const eyebrowVariants = cva("font-medium uppercase", {
  variants: {
    size: {
      sm: "text-[10px] tracking-[0.28em] text-muted-foreground/55",
      md: "text-xs tracking-[0.2em] text-muted-foreground",
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
