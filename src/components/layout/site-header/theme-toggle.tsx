"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { HEADER_BUTTON_CLASS } from "./header-button";

/**
 * Switches between the light and dark theme. The icon and tooltip are picked
 * with CSS rather than from the resolved theme, so the server render already
 * matches and nothing shifts on hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
