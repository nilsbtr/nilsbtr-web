"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { m } from "motion/react";
import type { TargetAndTransition, Transition, Variants } from "motion/react";

import { DURATION, SPRING, STAGGER, VIEWPORT_ONCE } from "./tokens";

const MOTION_TAGS = {
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

type MotionTag = keyof typeof MOTION_TAGS;

type RevealPreset = {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
  transition: Transition;
};

const PRESETS = {
  /** Rise with a blur-to-sharp settle — the default for text blocks. */
  rise: {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: SPRING.smooth,
  },
  /** Plain fade for labels and low-emphasis chrome. */
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: DURATION.base, ease: "easeOut" },
  },
  /** Lift with scale for cards and framed surfaces. */
  scale: {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    transition: SPRING.smooth,
  },
  /** Springy pop from nothing — reserved for tiny accents. */
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
  return (
    <Tag
      initial="hidden"
      variants={buildVariants(variant, delay)}
      {...(inView ? { whileInView: "visible", viewport: VIEWPORT_ONCE } : { animate: "visible" })}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Orchestrates the entrance of its <RevealItem> descendants with a stagger,
 * so choreography lives in one place instead of hand-tuned per-item delays.
 *
 * Set `nested` on groups placed inside another RevealGroup: they then inherit
 * the parent's trigger and only contribute their own (usually tighter) stagger.
 */
export function RevealGroup({
  children,
  stagger = STAGGER.base,
  delay = 0,
  inView = false,
  nested = false,
  as = "div",
  ...rest
}: RevealBaseProps & {
  stagger?: number;
  delay?: number;
  inView?: boolean;
  nested?: boolean;
}) {
  const Tag = MOTION_TAGS[as];
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  if (nested) {
    return (
      <Tag variants={variants} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      initial="hidden"
      variants={variants}
      {...(inView ? { whileInView: "visible", viewport: VIEWPORT_ONCE } : { animate: "visible" })}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** A staggered participant of the nearest RevealGroup. */
export function RevealItem({
  children,
  variant = "rise",
  as = "div",
  ...rest
}: RevealBaseProps & { variant?: RevealVariant }) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag variants={buildVariants(variant)} {...rest}>
      {children}
    </Tag>
  );
}
