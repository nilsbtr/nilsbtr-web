"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import { m, useReducedMotion } from "motion/react";
import type { TargetAndTransition, Transition, Variants } from "motion/react";

import { introClock } from "./intro-clock";
import { DURATION, EASE, SPRING, STAGGER, VIEWPORT_ONCE } from "./tokens";

export const MOTION_TAGS = {
  div: m.div,
  section: m.section,
  header: m.header,
  span: m.span,
  p: m.p,
  h1: m.h1,
  h2: m.h2,
  ul: m.ul,
  li: m.li,
} as const;

export type MotionTag = keyof typeof MOTION_TAGS;

type RevealPreset = {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
  transition: Transition;
};

const ENTER: Transition = { duration: DURATION.enter, ease: EASE.out };

const PRESETS = {
  /** Rise with a blur-to-sharp settle. The default for text blocks. */
  rise: {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: ENTER,
  },
  /** Plain fade for labels and low-emphasis chrome. */
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: ENTER,
  },
  /** Lift with scale for cards and framed surfaces. */
  scale: {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
    transition: ENTER,
  },
  /** Springy pop from nothing. Reserved for tiny accents. */
  pop: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    transition: SPRING.bouncy,
  },
} satisfies Record<string, RevealPreset>;

export type RevealVariant = keyof typeof PRESETS;

/**
 * `delay` is only merged in when set: items inside a RevealGroup must leave
 * `transition.delay` undefined so the parent's stagger orchestration applies.
 */
function buildVariants(variant: RevealVariant, delay = 0): Variants {
  const preset = PRESETS[variant];
  return {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: delay ? { ...preset.transition, delay } : preset.transition,
    },
  };
}

/**
 * Lets a group know how many beats its sequence has, so a lead group can tell
 * the intro clock how long it runs.
 */
type BeatRegistry = { register: () => () => void };

const BeatRegistryContext = createContext<BeatRegistry | null>(null);

/** Counts the calling element as one beat of the nearest RevealGroup. */
export function useBeat() {
  const registry = useContext(BeatRegistryContext);
  useEffect(() => registry?.register(), [registry]);
}

type RevealBaseProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "style" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  children: ReactNode;
  as?: MotionTag;
};

/**
 * Self-contained entrance for a single element. Animates on mount, or on
 * first scroll into view when `inView` is set.
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  inView = false,
  as = "div",
  ...rest
}: RevealBaseProps & {
  variant?: RevealVariant;
  delay?: number;
  inView?: boolean;
}) {
  const Tag = MOTION_TAGS[as];
  const prefersReducedMotion = useReducedMotion();

  return (
    <Tag
      data-reveal=""
      initial="hidden"
      variants={buildVariants(variant, prefersReducedMotion ? 0 : delay)}
      {...(inView ? { whileInView: "visible", viewport: VIEWPORT_ONCE } : { animate: "visible" })}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Plays its <RevealItem> descendants as one sequence, one beat apart, so the
 * choreography lives in one place instead of in hand-tuned per-item delays.
 *
 * - `nested`: for groups inside another RevealGroup. They inherit the parent's
 *   trigger and only contribute their own (usually tighter) cadence.
 * - `inView`: start when scrolled into view instead of on mount.
 * - `lead`: marks the sequence that opens a page. Scroll-triggered groups that
 *   are already in view on load wait until it has played.
 *
 * When reduced motion is requested there is no sequence: every item fades in
 * at once, with no delays to sit through.
 */
export function RevealGroup({
  children,
  stagger: staggerProp = STAGGER.base,
  delay: delayProp = 0,
  inView = false,
  nested = false,
  lead = false,
  as = "div",
  ...rest
}: RevealBaseProps & {
  stagger?: number;
  delay?: number;
  inView?: boolean;
  nested?: boolean;
  lead?: boolean;
}) {
  const Tag = MOTION_TAGS[as];

  const prefersReducedMotion = useReducedMotion();
  const stagger = prefersReducedMotion ? 0 : staggerProp;
  const delay = prefersReducedMotion ? 0 : delayProp;

  // A nested group is itself one beat of its parent.
  useBeat();

  const beats = useRef(0);
  const registry = useMemo<BeatRegistry>(
    () => ({
      register() {
        beats.current += 1;
        return () => {
          beats.current -= 1;
        };
      },
    }),
    []
  );

  useEffect(() => {
    if (lead) introClock.hold(delay + beats.current * stagger);
  }, [lead, delay, stagger]);

  // Scroll-triggered groups learn their start delay when they enter the viewport.
  const [enterDelay, setEnterDelay] = useState<number | null>(null);

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay + (enterDelay ?? 0) },
    },
  };

  const content = (
    <BeatRegistryContext.Provider value={registry}>{children}</BeatRegistryContext.Provider>
  );

  if (nested) {
    return (
      <Tag variants={variants} {...rest}>
        {content}
      </Tag>
    );
  }

  if (inView) {
    return (
      <Tag
        initial="hidden"
        animate={enterDelay === null ? "hidden" : "visible"}
        variants={variants}
        viewport={VIEWPORT_ONCE}
        onViewportEnter={() => setEnterDelay((current) => current ?? introClock.remaining())}
        {...rest}
      >
        {content}
      </Tag>
    );
  }

  return (
    <Tag initial="hidden" animate="visible" variants={variants} {...rest}>
      {content}
    </Tag>
  );
}

/** One beat of the nearest RevealGroup. */
export function RevealItem({
  children,
  variant = "rise",
  as = "div",
  ...rest
}: RevealBaseProps & { variant?: RevealVariant }) {
  const Tag = MOTION_TAGS[as];

  useBeat();

  return (
    <Tag data-reveal="" variants={buildVariants(variant)} {...rest}>
      {/* Groups nested inside an item follow the item, so they are not beats of the outer group. */}
      <BeatRegistryContext.Provider value={null}>{children}</BeatRegistryContext.Provider>
    </Tag>
  );
}
