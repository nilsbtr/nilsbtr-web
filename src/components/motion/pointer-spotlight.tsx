"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to whichever `[data-spotlight]` element is under
 * it, as the CSS variables `--spot-x` and `--spot-y`. Interactive surfaces use
 * them to light up around the cursor. One listener serves the whole page.
 */
export function PointerSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let latest: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!(latest?.target instanceof Element)) return;
      const surface = latest.target.closest<HTMLElement>("[data-spotlight]");
      if (!surface) return;
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--spot-x", `${latest.clientX - rect.left}px`);
      surface.style.setProperty("--spot-y", `${latest.clientY - rect.top}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      latest = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
