import type { IconSvgElement } from "@hugeicons/react";

export type TechMark = {
  icon: IconSvgElement;
  /** Hover accent of the tech's surface; falls back to the site's brand color. */
  brand?: string;
  label: string;
};

export type Tech = {
  id: string;
  name: string;
  marks: TechMark[];
  description: string;
  /** Short note shown as the tooltip when the tech is featured as an icon. */
  tagline?: string;
  /** Small status label rendered next to the name, e.g. "waiting for stable". */
  badge?: string;
  href?: string;
};

export type TechGroup = {
  label?: string;
  items: readonly Tech[];
};

export type TechCategory = {
  id: string;
  label: string;
  caption?: string;
  /** Always visible. */
  core: readonly Tech[];
  /** Hidden behind "show more". */
  more?: readonly TechGroup[];
  /** Start with the whole category collapsed. */
  collapsed?: boolean;
};
