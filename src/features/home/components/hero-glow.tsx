"use client";

import { useEffect } from "react";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { EASE, SPRING } from "@/components/motion";

/** How far the glow drifts from its resting place toward the pointer, in pixels. */
const DRIFT = 70;

/** Share of the primary color at the centre of the glow, in percent. */
const PEAK = 8;

/*
 * The falloff follows (1 - r²)², which is flat at the centre and at the rim, so
 * the glow has no visible edge. Many stops keep the straight segments between
 * them too short to show as rings. It is drawn as a gradient rather than with
 * a blur filter: a large blurred layer is rasterised at low resolution and
 * looks pixelated once it moves.
 */
const STOPS = 32;
const GLOW = `radial-gradient(closest-side, ${Array.from({ length: STOPS + 1 }, (_, index) => {
  const radius = index / STOPS;
  const strength = PEAK * (1 - radius ** 2) ** 2;
  return `color-mix(in oklch, var(--primary) ${strength.toFixed(3)}%, transparent) ${(radius * 100).toFixed(1)}%`;
}).join(", ")})`;

/*
 * Fine monochrome grain laid over the glow. A gradient this faint only spans
 * about fifteen brightness levels, which an 8-bit display shows as rings; the
 * grain dithers them away.
 */
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>";
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;
const GRAIN_MASK = "radial-gradient(closest-side, black 20%, transparent)";

/**
 * Soft glow in the primary color behind the hero. It fades in with the page
 * and leans toward the pointer with a slow, heavy follow. Purely decorative;
 * it stays put on touch devices and when reduced motion is requested.
 *
 * Dark theme only: the tan reads as warm light on the dark background but
 * only muddies the light one.
 */
export function HeroGlow() {
  const prefersReducedMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, SPRING.drift);
  const y = useSpring(targetY, SPRING.drift);

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      targetX.set((event.clientX / window.innerWidth - 0.5) * 2 * DRIFT);
      targetY.set((event.clientY / window.innerHeight - 0.5) * 2 * DRIFT);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [prefersReducedMotion, targetX, targetY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block"
    >
      <m.div
        style={{ x, y, backgroundImage: GLOW }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE.out, delay: 0.2 }}
        className="absolute top-[42%] left-1/2 size-[64rem] -translate-1/2"
      >
        <div
          className="absolute inset-0 opacity-6"
          style={{ backgroundImage: GRAIN, maskImage: GRAIN_MASK }}
        />
      </m.div>
    </div>
  );
}
