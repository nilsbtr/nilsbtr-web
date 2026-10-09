"use client";

import { Fragment } from "react";

import { m } from "motion/react";
import type { Variants } from "motion/react";

import { MOTION_TAGS, type MotionTag, useBeat } from "./reveal";
import { DURATION, EASE, STAGGER } from "./tokens";

const LINE: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.word } },
};

const WORD: Variants = {
  hidden: { y: "125%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: DURATION.enter, ease: EASE.out } },
};

/**
 * Headline whose words rise into place one after another from behind a mask.
 * One beat of the nearest RevealGroup. Assistive technology gets the text as a
 * single label rather than word by word.
 */
export function RevealWords({
  children: text,
  as = "h1",
  className,
}: {
  children: string;
  as?: MotionTag;
  className?: string;
}) {
  const Tag = MOTION_TAGS[as];
  const words = text.split(" ");

  useBeat();

  return (
    <Tag aria-label={text} variants={LINE} className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          {/* The clip leaves room for descenders, so only the rising word is cut off. */}
          <span
            aria-hidden="true"
            className="inline-block [clip-path:inset(-0.1em_-0.1em_-0.25em_-0.1em)]"
          >
            <m.span data-reveal="" variants={WORD} className="inline-block">
              {word}
            </m.span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
