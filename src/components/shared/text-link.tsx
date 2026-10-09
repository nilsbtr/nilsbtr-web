import type { ComponentProps } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

/** Inline prose link whose underline settles lower on hover. */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "rounded-sm text-foreground underline decoration-foreground/30 decoration-1 underline-offset-4 transition-all duration-300 ease-out hover:text-primary hover:decoration-primary hover:underline-offset-[7px]",
        className
      )}
      {...props}
    />
  );
}
