"use client";

import type { CSSProperties } from "react";

import { m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION, EASE } from "./tokens";
import { LETTER_DURATION, LETTER_STAGGER } from "./write-on-timing";

/*
 * Each letter is uncovered by a clip that sweeps left to right as `--write`
 * goes from 0 to 1. The clip is measured in em rather than as a share of the
 * letter's box, because a narrow slanted glyph (a cursive "l") reaches well
 * outside its own box and a percentage would cut its top off.
 */
const OVERHANG = { top: "0.35em", right: "0.35em", bottom: "0.35em", left: "0.25em" };
const CLIP = `inset(-${OVERHANG.top} calc((1 - var(--write)) * (100% + ${OVERHANG.left} + ${OVERHANG.right}) - ${OVERHANG.right}) -${OVERHANG.bottom} -${OVERHANG.left})`;

/**
 * Reveals display type letter by letter with a left-to-right sweep, as if it
 * were being written. Renders statically when reduced motion is requested.
 */
export function WriteOn({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={cn("inline-block", className)}>{text}</span>;
  }

  return (
    <span className={cn("inline-block whitespace-nowrap", className)}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((letter, index) => {
        const start = delay + index * LETTER_STAGGER;
        return (
          <m.span
            key={index}
            aria-hidden="true"
            data-reveal=""
            className="inline-block"
            style={{ clipPath: CLIP } as CSSProperties}
            initial={{ "--write": 0, opacity: 0 }}
            animate={{ "--write": 1, opacity: 1 }}
            transition={{
              "--write": { duration: LETTER_DURATION, ease: EASE.inOut, delay: start },
              opacity: { duration: DURATION.fast, delay: start },
            }}
          >
            {letter}
          </m.span>
        );
      })}
    </span>
  );
}
