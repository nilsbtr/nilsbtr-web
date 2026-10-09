import type { ReactNode } from "react";

import { RevealItem } from "@/components/motion";
import { eyebrowVariants } from "@/components/shared/eyebrow";
import { cn } from "@/lib/utils";

/** A small label above a row of content. Must be rendered inside a RevealGroup. */
export function LabeledRow({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <RevealItem as="p" variant="fade" className={cn(eyebrowVariants({ size: "sm" }), "mb-4")}>
        {label}
      </RevealItem>
      {children}
    </div>
  );
}
