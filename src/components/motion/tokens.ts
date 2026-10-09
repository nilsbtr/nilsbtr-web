import type { Transition } from "motion/react";

/**
 * Motion design tokens — the single source of truth for the site's animation
 * language. Every reveal, stagger, and hover choreography derives from these
 * values so motion feels identical across pages.
 */

/** Site-wide easing curve for tween-based motion ("ease-out-expo"). */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Spring presets — physical motion instead of scripted tweens. */
export const SPRING = {
  /** Default entrance spring: settles quickly with a soft landing. */
  smooth: { type: "spring", stiffness: 170, damping: 26, mass: 0.9 },
  /** Pronounced overshoot for small accent elements. */
  bouncy: { type: "spring", stiffness: 480, damping: 16, mass: 0.7 },
} as const satisfies Record<string, Transition>;

/** Tween durations in seconds. */
export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

/** Stagger cadence between sibling reveals, in seconds. */
export const STAGGER = {
  /** Page-level choreography between content blocks. */
  base: 0.14,
  /** Dense collections (icon rows, card grids). */
  tight: 0.05,
} as const;

/** Default viewport config for scroll-triggered reveals: fire once, slightly before fully in view. */
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -10% 0px" } as const;
