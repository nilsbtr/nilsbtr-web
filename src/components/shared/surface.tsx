import type { ComponentProps } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The site's one container style: an outlined, translucent panel with no
 * resting shadow. Use it for discrete items and grouped controls; leave prose,
 * headings and link lists flat on the page.
 *
 * `interactive` adds the hover lift for surfaces that are links. Its accent
 * color comes from `--surface-accent` and defaults to the primary color.
 */
const surfaceVariants = cva("border border-border/60 bg-card/40", {
  variants: {
    shape: {
      panel: "rounded-xl",
      pill: "rounded-full",
    },
    interactive: {
      true: "transition-[translate,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-(--surface-accent) hover:bg-card motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      false: "",
    },
  },
  compoundVariants: [
    { shape: "panel", interactive: true, className: "hover:shadow-md" },
    { shape: "pill", interactive: true, className: "hover:shadow-sm" },
  ],
  defaultVariants: {
    shape: "panel",
    interactive: false,
  },
});

function Surface({
  className,
  shape,
  interactive,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof surfaceVariants>) {
  return <div className={cn(surfaceVariants({ shape, interactive }), className)} {...props} />;
}

export { Surface, surfaceVariants };
