"use client";

import { m } from "motion/react";

import { EASE } from "@/components/motion";

/**
 * A ring that expands from the full stop after the name, once, as it lands.
 * The offsets place it over the glyph's dot, which sits low in its box.
 */
export function HeroRipple({ delay }: { delay: number }) {
  return (
    <m.span
      className="pointer-events-none absolute bottom-[0.155em] left-[calc(50%+0.035em)] size-[0.12em] -translate-x-1/2 rounded-full border border-primary motion-reduce:hidden"
      initial={{ scale: 1, opacity: 0 }}
      // Opacity starts at 0 so nothing shows while the animation waits out its delay.
      animate={{ scale: [1, 1, 5], opacity: [0, 0.7, 0] }}
      transition={{ duration: 0.9, ease: EASE.out, times: [0, 0.05, 1], delay }}
    />
  );
}
