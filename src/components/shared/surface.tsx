import type { ComponentProps } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The site's one container style: an outlined, translucent panel with no
 * resting shadow. Use it for discrete items and grouped controls; leave prose,
 * headings and link lists flat on the page.
 *
 * `interactive` adds the hover lift for surfaces that are links. Its accent
 * color comes from `--surface-accent` and defaults to the brand color. Set
 * `data-spotlight` on the element to have the pointer light it up.
 */
const surfaceVariants = cva("border border-border/60 bg-card/40", {
  variants: {
    shape: {
      panel: "rounded-xl",
      pill: "rounded-full",
    },
    interactive: {
      true: [
        "relative isolate transition-[translate,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-(--surface-accent) hover:bg-card motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        // A soft light in the accent color follows the pointer; see PointerSpotlight.
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[radial-gradient(14rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_oklch,var(--surface-accent)_14%,transparent),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
      ],
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
