/*
 * Timing of the WriteOn effect. Kept outside the client component so server
 * components can use it to sequence what follows the writing.
 */

/** Seconds between the start of one letter and the next. */
export const LETTER_STAGGER = 0.11;

/** Seconds one letter takes to appear. */
export const LETTER_DURATION = 0.5;

/** How long a WriteOn of the given text runs. */
export function writeOnDuration(text: string) {
  return (Array.from(text).length - 1) * LETTER_STAGGER + LETTER_DURATION;
}
