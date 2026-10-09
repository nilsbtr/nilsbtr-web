/**
 * Keeps scroll-triggered content from jumping the queue on page load.
 *
 * A page opens with a lead sequence (its header). Sections further down reveal
 * when they scroll into view, but on a tall screen the first of them is in
 * view immediately and would otherwise animate at the same time as the header,
 * or before it. The lead sequence reports how long it runs; anything that
 * enters the viewport during that window waits for the remainder.
 */
let leadEndsAt = 0;

export const introClock = {
  /** Called by a page's lead sequence when it starts. */
  hold(seconds: number) {
    leadEndsAt = performance.now() + seconds * 1000;
  },
  /** Seconds until the lead sequence has played; 0 once it is over. */
  remaining() {
    return Math.max(0, (leadEndsAt - performance.now()) / 1000);
  },
};
