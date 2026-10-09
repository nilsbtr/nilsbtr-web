"use client";

import type { MouseEvent } from "react";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { HEADER_BUTTON_CLASS } from "./header-button";

const REVEAL_DURATION = 600;
const REVEAL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Resolves once the theme class on <html> has changed, or shortly after if it never does. */
function themeApplied() {
  return new Promise<void>((resolve) => {
    const done = () => {
      observer.disconnect();
      clearTimeout(timeout);
      resolve();
    };
    const observer = new MutationObserver(done);
    const timeout = setTimeout(done, 250);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  });
}

/**
 * Switches between the light and dark theme. Where the browser supports view
 * transitions, the new theme spreads out in a circle from the button; elsewhere,
 * and when reduced motion is requested, it switches instantly.
 *
 * The icon and tooltip are picked with CSS rather than from the resolved theme,
 * so the server render already matches and nothing shifts on hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    const canAnimate =
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canAnimate) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      const applied = themeApplied();
      setTheme(next);
      return applied;
    });

    void transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: REVEAL_DURATION,
          easing: REVEAL_EASING,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label="Toggle color theme"
            onClick={toggle}
            className={HEADER_BUTTON_CLASS}
          />
        }
      >
        <HugeiconsIcon icon={Sun03Icon} strokeWidth={1.5} className="hidden size-5 dark:block" />
        <HugeiconsIcon icon={Moon02Icon} strokeWidth={1.5} className="size-5 dark:hidden" />
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>
        <span className="hidden dark:inline">Switch to light theme</span>
        <span className="dark:hidden">Switch to dark theme</span>
      </TooltipContent>
    </Tooltip>
  );
}
