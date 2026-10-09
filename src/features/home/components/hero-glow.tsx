"use client";

import { useEffect } from "react";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { EASE, SPRING } from "@/components/motion";

/** How far the glow drifts from its resting place toward the pointer, in pixels. */
const DRIFT = 70;

/**
 * Soft glow in the primary color behind the hero. It fades in with the page
 * and leans toward the pointer with a slow, heavy follow. Purely decorative;
 * it stays put on touch devices and when reduced motion is requested.
 *
 * Dark theme only: on the light background a glow this faint shows banding.
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
        style={{ x, y }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE.out, delay: 0.2 }}
        className="absolute top-[42%] left-1/2 size-[30rem] -translate-1/2 rounded-full bg-primary/9 blur-[110px]"
      />
    </div>
  );
}
