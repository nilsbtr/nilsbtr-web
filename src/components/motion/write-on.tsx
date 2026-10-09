"use client";

import type { ReactNode } from "react";

import { m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION, EASE_OUT_EXPO } from "./tokens";

/*
 * Negative top/bottom insets keep ascenders and descenders of display
 * typefaces inside the clip; the left inset stays slightly negative so
 * leading flourishes of cursive glyphs are never cut off.
 */
const CLIP_HIDDEN = "inset(-25% 110% -25% -10%)";
const CLIP_VISIBLE = "inset(-25% -10% -25% -10%)";

/**
 * Reveals text with a left-to-right clip sweep, as if being written or
 * uncovered — designed for hero-level display type. Renders statically
 * when the user prefers reduced motion.
 */
export function WriteOn({
  children,
  delay = 0,
  duration = DURATION.slow,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <m.span
      className={cn("inline-block", className)}
      initial={{ clipPath: CLIP_HIDDEN }}
      animate={{ clipPath: CLIP_VISIBLE }}
      transition={{ duration, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </m.span>
  );
}
