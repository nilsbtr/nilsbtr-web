"use client";

import { type RefObject, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Drives a rule that marks the current link of a navigation list and slides
 * between links on navigation. Attach `listRef` to the list and render a
 * <CurrentLinkIndicator> with `indicatorRef` as its last item.
 *
 * The rule is positioned by measuring the link that carries `aria-current`,
 * and re-measured whenever the list resizes (for example once the web font
 * has loaded).
 *
 * @param inset Horizontal padding of a link, in pixels, so the rule spans the label only.
 */
export function useCurrentLinkIndicator(pathname: string, inset = 0) {
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = () => {
      const current = list.querySelector<HTMLElement>("a[aria-current]");
      if (!current) {
        indicator.style.opacity = "0";
        return;
      }
      const link = current.getBoundingClientRect();
      indicator.style.opacity = "1";
      indicator.style.width = `${link.width - inset * 2}px`;
      indicator.style.translate = `${link.left - list.getBoundingClientRect().left + inset}px`;
    };

    place();
    // Only animate after the first placement, so the rule doesn't slide in from the edge on load.
    const frame = requestAnimationFrame(() => indicator.setAttribute("data-ready", ""));
    const observer = new ResizeObserver(place);
    observer.observe(list);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname, inset]);

  return { listRef, indicatorRef };
}

/** The rule itself. The list it sits in must be `relative`. */
export function CurrentLinkIndicator({
  ref,
  className,
}: {
  ref: RefObject<HTMLSpanElement | null>;
  className?: string;
}) {
  return (
    <li aria-hidden="true" role="presentation" className="contents">
      <span
        ref={ref}
        className={cn(
          "pointer-events-none absolute bottom-1 left-0 h-px bg-brand opacity-0 data-ready:transition-[translate,width,opacity] data-ready:duration-500 motion-reduce:transition-none",
          className
        )}
      />
    </li>
  );
}
