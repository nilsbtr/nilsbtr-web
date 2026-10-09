import { RevealGroup, RevealItem, STAGGER } from "@/components/motion";

import type { Tech } from "../types";
import { TechCard } from "./tech-card";

const GRID_CLASS = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";

/**
 * Responsive grid of tech cards. With `animated`, the cards stagger in as part
 * of the surrounding RevealGroup; leave it off for content that mounts later
 * (e.g. inside a collapsible panel).
 */
export function TechGrid({
  items,
  animated = false,
  cardClassName,
}: {
  items: readonly Tech[];
  animated?: boolean;
  cardClassName?: string;
}) {
  if (!animated) {
    return (
      <ul className={GRID_CLASS}>
        {items.map((tech) => (
          <li key={tech.id}>
            <TechCard tech={tech} className={cardClassName} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <RevealGroup nested as="ul" stagger={STAGGER.tight} className={GRID_CLASS}>
      {items.map((tech) => (
        <RevealItem as="li" key={tech.id} variant="scale">
          <TechCard tech={tech} className={cardClassName} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
