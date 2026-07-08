"use client";

import type { ReactNode } from "react";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * App-wide motion context:
 * - `MotionConfig reducedMotion="user"` honors the OS reduced-motion setting
 *   for every motion component in the tree.
 * - `LazyMotion` code-splits the animation runtime into an async chunk;
 *   `strict` guarantees only the lightweight `m` components are used.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
