import type { Transition } from "motion/react";

/**
 * Motion design tokens: the single source of truth for the site's animation
 * language. Entrances, staggers and interactive motion all derive from these
 * values, so motion feels the same on every page.
 *
 * The CSS side (hover and state transitions) mirrors `EASE.out` and
 * `DURATION.fast` as the default transition in globals.css.
 */

type CubicBezier = [number, number, number, number];

/** Easing curves for tween-based motion. */
export const EASE = {
  /** Decelerates hard ("expo out"). The default for anything entering. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric. For things that travel, like a pen stroke. */
  inOut: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, CubicBezier>;

/** Durations in seconds. */
export const DURATION = {
  /** Feedback: hover, press, focus. */
  fast: 0.2,
  /** UI changing state: indicators, toggles. */
  base: 0.4,
  /** Content entering the page. */
  enter: 0.7,
} as const;

/** Delay between consecutive beats of a sequence, in seconds. */
export const STAGGER = {
  /** Between the blocks of a page. */
  base: 0.09,
  /** Within a dense collection (icon rows, card grids). */
  tight: 0.04,
  /** Between the words of a headline. */
  word: 0.05,
} as const;

/** Springs, for motion that follows input or should feel physical. */
export const SPRING = {
  /** Pronounced overshoot for small accent elements. */
  bouncy: { type: "spring", stiffness: 480, damping: 16, mass: 0.7 },
  /** Slow, heavy follow for ambient elements trailing the pointer. */
  drift: { type: "spring", stiffness: 40, damping: 20, mass: 1 },
} as const satisfies Record<string, Transition>;

/** Viewport config for scroll-triggered reveals: fire once, slightly before fully in view. */
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -10% 0px" } as const;
